import Fuse from 'fuse.js'

// Remove acentos e normaliza caixa — usado antes da busca fuzzy entrar em ação
export function normalizar(texto) {
  if (!texto) return ''
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

// Busca fuzzy real: tolera pequenas diferenças de grafia (beta/betta, troca de letra, etc)
// alem de ignorar acentos. Usada tanto no dropdown do Header quanto no Catalogo,
// garantindo que os dois retornem exatamente os mesmos resultados.
export function buscarFuzzy(itens, termo, opcoes = {}) {
  const termoNormalizado = normalizar(termo)
  if (!termoNormalizado) return itens

  const itensNormalizados = itens.map(item => ({
    ...item,
    _nomeNorm: normalizar(item.nome),
    _cientificoNorm: normalizar(item.nome_cientifico),
    _categoriaNorm: normalizar(item.categoria),
    _descricaoNorm: normalizar(item.descricao),
  }))

  const fuse = new Fuse(itensNormalizados, {
    keys: [
      { name: '_nomeNorm', weight: 0.6 },
      { name: '_cientificoNorm', weight: 0.25 },
      { name: '_categoriaNorm', weight: 0.1 },
      { name: '_descricaoNorm', weight: 0.05 },
    ],
    threshold: opcoes.threshold ?? 0.4,
    ignoreLocation: true,
    minMatchCharLength: 2,
  })

  return fuse.search(termoNormalizado).map(r => r.item)
}
