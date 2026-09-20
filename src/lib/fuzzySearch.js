import Fuse from 'fuse.js'

// Remove acentos e normaliza caixa
export function normalizar(texto) {
  if (!texto) return ''
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

// Busca em duas camadas:
// 1) Substring exato normalizado (nome, nome cientifico, categoria) - o mais confiavel,
//    cobre a grande maioria das buscas sem nenhum risco de "parecido demais"
// 2) Fuzzy MUITO restrito, so em nome e nome cientifico - pega so variacoes minimas de
//    grafia (ex: beta/betta), nunca palavras vagamente parecidas
export function buscarFuzzy(itens, termo) {
  const termoNormalizado = normalizar(termo)
  if (!termoNormalizado) return itens

  const itensNormalizados = itens.map(item => ({
    ...item,
    _nomeNorm: normalizar(item.nome),
    _cientificoNorm: normalizar(item.nome_cientifico),
    _categoriaNorm: normalizar(item.categoria),
  }))

  // Camada 1: substring exato
  const porSubstring = itensNormalizados.filter(item =>
    item._nomeNorm.includes(termoNormalizado) ||
    item._cientificoNorm.includes(termoNormalizado) ||
    item._categoriaNorm.includes(termoNormalizado)
  )

  // Camada 2: fuzzy apertado (so tolera 1-2 letras de diferenca, perto do inicio)
  const fuse = new Fuse(itensNormalizados, {
    keys: [
      { name: '_nomeNorm', weight: 0.7 },
      { name: '_cientificoNorm', weight: 0.3 },
    ],
    threshold: 0.25,
    distance: 30,
    minMatchCharLength: 3,
  })
  const porFuzzy = fuse.search(termoNormalizado).map(r => r.item)

  // Une os dois conjuntos sem duplicar, priorizando os matches por substring
  const vistos = new Set(porSubstring.map(i => i._tipo + i.id))
  const combinado = [...porSubstring]
  for (const item of porFuzzy) {
    const chave = item._tipo + item.id
    if (!vistos.has(chave)) {
      combinado.push(item)
      vistos.add(chave)
    }
  }

  return combinado
}
