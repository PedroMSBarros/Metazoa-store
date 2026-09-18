// Script de migração: postimg.cc -> Cloudinary (com retry automático)
// Roda UMA VEZ no seu computador. Nao faz parte do build do Vite.
//
// Antes de rodar:
//   npm install cloudinary
//
// Configure essas variaveis de ambiente antes de rodar (uma linha de cada vez no PowerShell):
//   $env:CLOUDINARY_CLOUD_NAME="..."
//   $env:CLOUDINARY_API_KEY="..."
//   $env:CLOUDINARY_API_SECRET="..."
//   $env:VITE_SUPABASE_URL="..."
//   $env:SUPABASE_SERVICE_ROLE_KEY="..."
//
// Como rodar:
//   node migrar-imagens-cloudinary.js

import { createClient } from '@supabase/supabase-js'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const MAX_TENTATIVAS = 3
const PAUSA_ENTRE_ITENS_MS = 500

function esperar(ms) {
  return new Promise(r => setTimeout(r, ms))
}

async function enviarComRetry(url, opcoes) {
  let ultimoErro
  for (let tentativa = 1; tentativa <= MAX_TENTATIVAS; tentativa++) {
    try {
      return await cloudinary.uploader.upload(url, opcoes)
    } catch (e) {
      ultimoErro = e
      if (tentativa < MAX_TENTATIVAS) {
        const pausa = tentativa * 2000
        console.log(`   tentativa ${tentativa} falhou (${e.message}), tentando de novo em ${pausa / 1000}s...`)
        await esperar(pausa)
      }
    }
  }
  throw ultimoErro
}

async function migrarTabela(tabela) {
  const { data: itens, error } = await supabase
    .from(tabela)
    .select('id, nome, imagem_url')
    .not('imagem_url', 'is', null)

  if (error) throw error

  console.log(`\n=== ${tabela}: ${itens.length} itens com imagem ===\n`)

  let sucesso = 0
  let falha = 0
  let puladas = 0
  const falhas = []

  for (const item of itens) {
    if (item.imagem_url.includes('cloudinary.com')) {
      puladas++
      continue
    }

    try {
      const resultado = await enviarComRetry(item.imagem_url, {
        folder: `metazoa/${tabela}`,
        public_id: item.id,
        overwrite: true,
        resource_type: 'image',
      })

      const { error: erroUpdate } = await supabase
        .from(tabela)
        .update({ imagem_url: resultado.secure_url })
        .eq('id', item.id)

      if (erroUpdate) throw erroUpdate

      console.log(`OK   ${item.nome}`)
      sucesso++
    } catch (e) {
      console.error(`FALHOU  ${item.nome} (${item.imagem_url})\n   -> ${e.message}`)
      falhas.push({ nome: item.nome, url: item.imagem_url, erro: e.message })
      falha++
    }

    await esperar(PAUSA_ENTRE_ITENS_MS)
  }

  console.log(`\n${tabela}: ${sucesso} migradas | ${falha} falharam | ${puladas} ja estavam prontas`)

  if (falhas.length > 0) {
    console.log(`\nItens que falharam em ${tabela} (revisar manualmente depois):`)
    falhas.forEach(f => console.log(`  - ${f.nome}: ${f.erro}`))
  }

  return falhas
}

async function main() {
  const falhasPeixes = await migrarTabela('peixes')
  const falhasProdutos = await migrarTabela('produtos')

  const totalFalhas = falhasPeixes.length + falhasProdutos.length
  console.log('\n=================================')
  console.log('Migracao concluida!')
  if (totalFalhas > 0) {
    console.log(`${totalFalhas} itens falharam mesmo apos ${MAX_TENTATIVAS} tentativas cada.`)
    console.log('Rode o script de novo — ele pula o que ja deu certo e tenta so o que falta.')
  }
}

main().catch(e => {
  console.error('Erro fatal:', e)
  process.exit(1)
})
