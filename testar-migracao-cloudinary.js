// TESTE de migração: postimg.cc -> Cloudinary (so 2 itens, para validar antes de rodar tudo)
// Roda UMA VEZ no seu computador. Nao faz parte do build do Vite.
//
// Antes de rodar:
//   npm install cloudinary
//
// Configure essas variaveis de ambiente antes de rodar:
//   CLOUDINARY_CLOUD_NAME
//   CLOUDINARY_API_KEY
//   CLOUDINARY_API_SECRET
//   VITE_SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY
//
// Como rodar:
//   node testar-migracao-cloudinary.js

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

const LIMITE_TESTE = 1 // quantos itens de CADA tabela migrar no teste

async function testarTabela(tabela) {
  console.log(`\n=== Testando ${tabela} ===\n`)

  const { data: itens, error } = await supabase
    .from(tabela)
    .select('id, nome, imagem_url')
    .not('imagem_url', 'is', null)
    .not('imagem_url', 'ilike', '%cloudinary.com%')
    .limit(LIMITE_TESTE)

  if (error) {
    console.error(`Erro ao buscar ${tabela}:`, error.message)
    return
  }

  if (itens.length === 0) {
    console.log(`Nenhum item pendente em ${tabela} (ou ja migrado).`)
    return
  }

  for (const item of itens) {
    console.log(`Item: ${item.nome}`)
    console.log(`URL original: ${item.imagem_url}`)

    try {
      console.log('Enviando pro Cloudinary (isso pode levar alguns segundos)...')

      const resultado = await cloudinary.uploader.upload(item.imagem_url, {
        folder: `metazoa/${tabela}`,
        public_id: item.id,
        overwrite: true,
        resource_type: 'image',
      })

      console.log(`SUCESSO! Nova URL: ${resultado.secure_url}`)

      const { error: erroUpdate } = await supabase
        .from(tabela)
        .update({ imagem_url: resultado.secure_url })
        .eq('id', item.id)

      if (erroUpdate) {
        console.error(`Upload funcionou, mas falhou ao atualizar o Supabase:`, erroUpdate.message)
      } else {
        console.log(`Banco de dados atualizado com sucesso!`)
        console.log(`\n>>> Confira no site: o item "${item.nome}" deve continuar mostrando a foto normalmente. <<<`)
      }
    } catch (e) {
      console.error(`FALHOU: ${e.message}`)
      console.error(`\nIsso pode significar que o postimg.cc bloqueou o Cloudinary tambem.`)
      console.error(`Se isso aconteceu, me avisa que a gente parte pro plano B (upload manual de arquivo local).`)
    }
  }
}

async function main() {
  await testarTabela('peixes')
  await testarTabela('produtos')
  console.log('\nTeste concluido. Confere o resultado acima antes de rodar a migracao completa!')
}

main().catch(e => {
  console.error('Erro fatal:', e)
  process.exit(1)
})
