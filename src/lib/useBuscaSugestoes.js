import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import { buscarFuzzy, normalizar } from './fuzzySearch'

export { normalizar }

// Cache em memoria compartilhado entre todos os componentes que usam o hook,
// assim so buscamos a lista completa do banco uma vez por sessao
let cachePeixes = null
let cacheProdutos = null
let promessaCache = null

async function carregarCache() {
  if (cachePeixes && cacheProdutos) return
  if (promessaCache) return promessaCache

  promessaCache = (async () => {
    const [{ data: peixes }, { data: produtos }] = await Promise.all([
      supabase.from('peixes').select('id, nome, nome_cientifico, categoria, preco, imagem_url'),
      supabase.from('produtos').select('id, nome, categoria, preco, imagem_url'),
    ])
    cachePeixes = (peixes || []).map(p => ({ ...p, _tipo: 'peixe' }))
    cacheProdutos = (produtos || []).map(p => ({ ...p, _tipo: 'produto' }))
  })()

  await promessaCache
}

// Hook que busca sugestoes com fuzzy matching real conforme o usuario digita
export function useBuscaSugestoes(termo, limite = 6) {
  const [sugestoes, setSugestoes] = useState([])
  const [carregando, setCarregando] = useState(false)

  useEffect(() => {
    if (normalizar(termo).length < 2) {
      setSugestoes([])
      return
    }

    let cancelado = false
    setCarregando(true)

    const timeout = setTimeout(async () => {
      await carregarCache()
      if (cancelado) return
      const todos = [...cachePeixes, ...cacheProdutos]
      const resultado = buscarFuzzy(todos, termo)
      setSugestoes(resultado.slice(0, limite))
      setCarregando(false)
    }, 250)

    return () => { cancelado = true; clearTimeout(timeout) }
  }, [termo, limite])

  return { sugestoes, carregando }
}
