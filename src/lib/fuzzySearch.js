// Busca do site (barra do topo e catalogo).
//
// Ideia: o cliente digita do jeito que ouviu ou lembra o nome, entao a busca
// compara "como a palavra soa", nao letra por letra:
// - ignora acentos, maiusculas, pontuacao e a ordem das palavras
// - letras dobradas viram uma so (ocellaris = ocelaris, betta = beta)
// - trocas comuns de grafia sao igualadas (y/i, ph/f, k/c, w/v, z/s, ce/se, ch/c, h mudo)
// - plural no fim da palavra e ignorado (corydoras = corydora, anubias = anubia)
// - tolera erro de digitacao: 1 letra errada em palavras de 4 a 6 letras,
//   2 em palavras maiores (inclui letra trocada de lugar)
// - aceita palavra pela metade enquanto o cliente digita (ocel -> ocellaris)
// - quando existe resultado certeiro, os parecidos por erro de digitacao nao aparecem
// - entende alguns sinonimos do aquarismo (pleco = cascudo, nemo = palhaco...)
// Cada palavra digitada precisa aparecer no item. Os resultados vem ordenados
// do mais parecido para o menos parecido.

export function normalizar(texto) {
  if (!texto) return ''
  return String(texto)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim()
}

const PALAVRAS_IGNORADAS = new Set([
  'de', 'da', 'do', 'das', 'dos', 'e', 'com', 'para', 'pra', 'p', 'o', 'a', 'os', 'as', 'um', 'uma', 'no', 'na', 'em',
  // genericas demais: "racao peixe" e "peixe palhaco" funcionam pelas outras palavras
  'peixe', 'peixes',
])

// Grupos de palavras que o cliente usa para a mesma coisa
const SINONIMOS = [
  ['palhaco', 'clownfish', 'clown', 'nemo', 'amphiprion'],
  ['cascudo', 'acari', 'pleco', 'plecostomus', 'loricaria'],
  ['ciclideo', 'cichl', 'cichlid', 'ciclid'],
  ['kinguio', 'kingyo', 'goldfish', 'carassius', 'telescopio'],
  ['betta', 'beta', 'betinha', 'splendens'],
  ['lebiste', 'guppy', 'gupi', 'barrigudinho'],
  ['molinesia', 'molly', 'moli'],
  ['plati', 'platy', 'platys'],
  ['espada', 'xipho', 'xiphophorus', 'swordtail'],
  ['coridora', 'corydora', 'corydoras', 'cory'],
  ['camarao', 'shrimp', 'neocaridina', 'caridina'],
  ['caramujo', 'caracol', 'snail', 'neritina'],
  ['bandeira', 'escalar', 'angelfish', 'pterophyllum'],
  ['disco', 'discus', 'symphysodon'],
  ['oscar', 'astronotus'],
  ['termostato', 'aquecedor', 'heater'],
  ['racao', 'alimento', 'comida'],
  ['marinho', 'reef', 'salgada'],
  ['barbo', 'barbus', 'barb'],
]

// Transforma a palavra em uma "forma sonora" para comparar grafias diferentes
function chave(palavra) {
  let p = palavra
  p = p.replace(/ph/g, 'f')
  p = p.replace(/th/g, 't')
  p = p.replace(/ch/g, 'c')
  p = p.replace(/sh/g, 'x')
  p = p.replace(/y/g, 'i')
  p = p.replace(/k/g, 'c')
  p = p.replace(/w/g, 'v')
  p = p.replace(/z/g, 's')
  p = p.replace(/c(?=[ei])/g, 's')
  p = p.replace(/qu(?=[ei])/g, 'c')
  p = p.replace(/h/g, '')
  p = p.replace(/([^aeiou])\1+/g, '$1')
  // plural: racoes = racao, paes = pao, papeis = papel
  p = p.replace(/[oa]es$/, 'ao').replace(/eis$/, 'el')
  if (p.length > 4) p = p.replace(/s$/, '')
  return p
}

// Codigos de cascudo: "L 66", "L-066", "l66" e "L066" viram todos "l066"
function juntarCodigoL(lista) {
  const saida = []
  for (let i = 0; i < lista.length; i++) {
    const w = lista[i]
    const proximo = lista[i + 1]
    if (w === 'l' && proximo && /^\d{1,4}$/.test(proximo)) {
      saida.push('l' + proximo.padStart(3, '0'))
      i++
    } else if (/^l\d{1,4}$/.test(w)) {
      saida.push('l' + w.slice(1).padStart(3, '0'))
    } else {
      saida.push(w)
    }
  }
  return saida
}

function palavras(texto) {
  return juntarCodigoL(normalizar(texto).split(/[^a-z0-9]+/).filter(Boolean))
}

const mapaSinonimos = new Map()
for (const grupo of SINONIMOS) {
  const chaves = [...new Set(grupo.map(chave))]
  for (const c of chaves) mapaSinonimos.set(c, chaves)
}

// Distancia de edicao com troca de letras vizinhas (Damerau / OSA)
function distancia(a, b, limite) {
  if (Math.abs(a.length - b.length) > limite) return limite + 1
  const d = []
  for (let i = 0; i <= a.length; i++) d.push([i])
  for (let j = 1; j <= b.length; j++) d[0][j] = j
  for (let i = 1; i <= a.length; i++) {
    let menorDaLinha = Infinity
    for (let j = 1; j <= b.length; j++) {
      const custo = a[i - 1] === b[j - 1] ? 0 : 1
      let v = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + custo)
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) v = Math.min(v, d[i - 2][j - 2] + 1)
      d[i][j] = v
      if (v < menorDaLinha) menorDaLinha = v
    }
    if (menorDaLinha > limite) return limite + 1
  }
  return d[a.length][b.length]
}

function tolerancia(tamanho) {
  if (tamanho <= 3) return 0
  if (tamanho <= 6) return 1
  return 2
}

// Nota de 0 a 1 de quanto uma palavra digitada combina com uma palavra do item
function notaPalavra(token, palavraItem) {
  if (palavraItem === token) return 1
  if (palavraItem.startsWith(token)) return 0.85
  if (token.length >= 3 && palavraItem.includes(token)) return 0.75
  const lim = tolerancia(token.length)
  if (lim === 0) return 0
  const dist = distancia(token, palavraItem, lim)
  if (dist <= lim) return 0.6 - dist * 0.1
  return 0
}

// Nota a partir da qual a palavra "bateu de verdade" (igual, comeco ou dentro de uma palavra).
// Abaixo disso foi so por erro de digitacao.
const NOTA_FORTE = 0.7

const cachePreparo = new WeakMap()

function prepararItem(item) {
  const emCache = cachePreparo.get(item)
  if (emCache) return emCache
  const campos = [
    { texto: item.nome, peso: 1 },
    { texto: item.nome_base, peso: 1 },
    { texto: item.nome_cientifico, peso: 0.85 },
    { texto: item.marca, peso: 0.8 },
    { texto: item.categoria, peso: 0.6 },
  ]
  const lista = []
  for (const campo of campos) {
    for (const w of palavras(campo.texto)) lista.push({ chave: chave(w), bruta: w, peso: campo.peso })
  }
  const prep = {
    palavras: lista,
    nomeNorm: normalizar(item.nome),
    cientificoNorm: normalizar(item.nome_cientifico),
  }
  cachePreparo.set(item, prep)
  return prep
}

// Retorna a nota ponderada pelo campo (nome vale mais que categoria) e a qualidade
// do acerto em si (para saber se foi certeiro ou so por erro de digitacao)
function notaToken(token, prep) {
  const tokenChave = chave(token)
  const variantes = mapaSinonimos.get(tokenChave) || [tokenChave]
  let melhor = 0
  let qualidade = 0
  for (const p of prep.palavras) {
    for (const v of variantes) {
      const fator = v === tokenChave ? 1 : 0.9
      let bruta = notaPalavra(v, p.chave)
      // compara tambem a grafia original, para erros de digitacao que mudam a "forma sonora"
      if (v === tokenChave && bruta < NOTA_FORTE) bruta = Math.max(bruta, notaPalavra(token, p.bruta))
      if (bruta === 0) continue
      const n = bruta * p.peso * fator
      if (n > melhor) melhor = n
      if (bruta > qualidade) qualidade = bruta
    }
  }
  return { nota: melhor, qualidade }
}

export function buscarFuzzy(itens, termo) {
  const termoNorm = normalizar(termo)
  if (!termoNorm) return itens

  let tokens = palavras(termoNorm).filter(t => !PALAVRAS_IGNORADAS.has(t))
  if (tokens.length === 0) tokens = palavras(termoNorm)
  const chaves = tokens.filter(t => chave(t))
  if (chaves.length === 0) return itens

  // A frase digitada aparecendo inteira (como palavras completas) no nome sobe para o topo
  const escapado = termoNorm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const fraseInteira = new RegExp(`(^|[^a-z0-9])${escapado}($|[^a-z0-9])`)

  const avaliados = []
  const frequencia = chaves.map(() => 0)
  itens.forEach((item, indice) => {
    const prep = prepararItem(item)
    const resultadosToken = chaves.map(c => notaToken(c, prep))
    const notas = resultadosToken.map(r => r.nota)
    const acertos = notas.filter(n => n > 0).length
    if (acertos === 0) return
    notas.forEach((n, i) => { if (n > 0) frequencia[i]++ })
    let bonus = 0
    if (fraseInteira.test(prep.nomeNorm)) bonus = 1
    else if (fraseInteira.test(prep.cientificoNorm)) bonus = 0.5
    const forte = resultadosToken.every(r => r.qualidade >= NOTA_FORTE)
    avaliados.push({ item, notas, acertos, forte, bonus, indice })
  })

  // Palavras raras pesam mais que palavras comuns (em "racao peixe", "racao" e o que importa)
  const total = itens.length || 1
  const pesos = frequencia.map(f => Math.log(1 + total / (1 + f)))
  const somaPesos = pesos.reduce((s, p) => s + p, 0) || 1
  for (const a of avaliados) {
    a.nota = a.notas.reduce((s, n, i) => s + n * pesos[i], 0) / somaPesos + a.bonus
  }

  // Primeiro tenta itens com TODAS as palavras.
  let resultado = avaliados.filter(a => a.acertos === chaves.length)
  // Se existe item que bate de verdade, os que so bateram por erro de digitacao ficam de fora
  // (ex: "aruana" nao traz "aranha", "l024" nao traz "l020")
  if (resultado.some(a => a.forte)) resultado = resultado.filter(a => a.forte)
  // Se nenhum item tem todas as palavras (ex: o cliente digitou uma palavra que nao existe
  // no site), mostra os que tem pelo menos metade delas, os mais relevantes primeiro
  if (resultado.length === 0 && chaves.length > 1) {
    resultado = avaliados.filter(a => a.acertos >= Math.ceil(chaves.length / 2))
  }

  resultado.sort((a, b) => b.nota - a.nota || a.indice - b.indice)
  return resultado.map(a => a.item)
}
