// Sobe as fotos da pasta ./fotos-wtrotter para o Cloudinary (metazoa/produtos)
// e grava as URLs em urls-wtrotter.json. NAO mexe no Supabase.
// Roda no seu computador, na raiz do projeto. Pula fotos que ja subiram.
//
// Variaveis (mesmas do migrar-imagens-cloudinary.js), no PowerShell:
//   $env:CLOUDINARY_CLOUD_NAME="..."
//   $env:CLOUDINARY_API_KEY="..."
//   $env:CLOUDINARY_API_SECRET="..."
// Como rodar:
//   node subir-fotos-wtrotter.js

import fs from 'node:fs'
import path from 'node:path'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const PASTA = './fotos-wtrotter'
const SAIDA = './urls-wtrotter.json'
const MAX_TENTATIVAS = 3
const esperar = ms => new Promise(r => setTimeout(r, ms))

const urls = fs.existsSync(SAIDA) ? JSON.parse(fs.readFileSync(SAIDA, 'utf8')) : {}
const arquivos = fs.readdirSync(PASTA).filter(f => /\.(png|jpe?g|webp)$/i.test(f)).sort()
console.log(`${arquivos.length} fotos na pasta, ${Object.keys(urls).length} ja enviadas\n`)

let ok = 0, puladas = 0, falhas = 0
for (const arq of arquivos) {
  if (urls[arq]) { puladas++; continue }
  const nome = path.parse(arq).name
  let enviado = false
  for (let t = 1; t <= MAX_TENTATIVAS && !enviado; t++) {
    try {
      const r = await cloudinary.uploader.upload(path.join(PASTA, arq), {
        folder: 'metazoa/produtos',
        public_id: `wtrotter-${nome}`,
        overwrite: true,
        resource_type: 'image',
      })
      urls[arq] = r.secure_url
      fs.writeFileSync(SAIDA, JSON.stringify(urls, null, 2))
      console.log(`OK      ${arq}`)
      ok++; enviado = true
    } catch (e) {
      console.log(`tentativa ${t} falhou em ${arq}: ${e.message}`)
      if (t < MAX_TENTATIVAS) await esperar(t * 2000)
    }
  }
  if (!enviado) { console.error(`FALHOU  ${arq}`); falhas++ }
  await esperar(300)
}
console.log(`\n${ok} enviadas | ${puladas} puladas | ${falhas} falharam`)
console.log(`URLs em ${SAIDA}`)
