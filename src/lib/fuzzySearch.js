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

const PALAVRAS_IGNORADAS = new Set(['de', 'da', 'do', 'das', 'dos', 'e', 'com', 'para', 'p', 'o', 'a'])

// Distancia de edicao (Levenshtein) para palavras curtas
function distancia(a, b) {
  if (Math.abs(a.length - b.length) > 2) return 99
  const linha = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    let anterior = linha[0]
    linha[0] = i
    for (let j = 1; j <= b.length; j++) {
      const atual = linha[j]
      linha[j] = Math.min(linha[j] + 1, linha[j - 1] + 1, anterior + (a[i - 1] === b[j - 1] ? 0 : 1))
      anterior = atual
    }
  }
  return linha[b.length]
}

function palavras(texto) {
  return texto.split(/[^a-z0-9]+/).filter(Boolean)
}

// Uma palavra da busca "bate" com o item se aparecer dentro de alguma palavra dele
// (ex: "koi" em "koi") ou se for so 1 letra diferente (ex: "beta" e "betta").
// Em palavras curtas (4 letras) so aceita letra a mais ou a menos, nunca trocada,
// para "beta" nao bater com "bela" ou "meta".
function palavraBate(token, palavrasItem) {
  return palavrasItem.some(p =>
    p.includes(token) ||
    (token.length >= 4 && (token.length >= 5 || p.length !== token.length) && distancia(token, p) <= 1)
  )
}

// Busca em tres camadas:
// 1) Substring exato normalizado (nome, nome cientifico, categoria) - o mais confiavel,
//    cobre a grande maioria das buscas sem nenhum risco de "parecido demais"
// 2) Por palavras, em qualquer ordem: todas as palavras digitadas precisam aparecer no item
//    (ex: "beta koi" acha "Beta macho koi" e "Betta macho plakat koi candy")
// 3) Fuzzy MUITO restrito, so em nome e nome cientifico - pega so variacoes minimas de
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

  // Camada 2: todas as palavras da busca, em qualquer ordem
  const tokens = palavras(termoNormalizado).filter(t => !PALAVRAS_IGNORADAS.has(t))
  const porPalavras = tokens.length < 2 ? [] : itensNormalizados.filter(item => {
    const palavrasItem = palavras(item._nomeNorm + ' ' + item._cientificoNorm + ' ' + item._categoriaNorm)
    return tokens.every(t => palavraBate(t, palavrasItem))
  })

  // Camada 3: fuzzy apertado (so tolera 1-2 letras de diferenca, perto do inicio)
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
  for (const item of [...porPalavras, ...porFuzzy]) {
    const chave = item._tipo + item.id
    if (!vistos.has(chave)) {
      combinado.push(item)
      vistos.add(chave)
    }
  }

  return combinado
}
