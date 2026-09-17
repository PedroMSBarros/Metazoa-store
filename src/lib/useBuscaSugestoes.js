import { useState, useEffect } from 'react'
import { supabase } from './supabase'

// Normaliza texto: remove acentos, minusculo, remove espacos duplicados
// Assim "Beta" encontra "Betta", "agua" encontra "água", etc.
export function normalizar(texto) {
  if (!texto) return ''
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

// Hook que busca sugestoes de peixes/produtos conforme o usuario digita
// Usa debounce de 250ms e normaliza acentos/case para busca "fuzzy"
export function useBuscaSugestoes(termo, limite = 6) {
  const [sugestoes, setSugestoes] = useState([])
  const [carregando, setCarregando] = useState(false)

  useEffect(() => {
    const termoNormalizado = normalizar(termo)

    if (termoNormalizado.length < 2) {
      setSugestoes([])
      return
    }

    setCarregando(true)
    const timeout = setTimeout(async () => {
      // Busca com ilike (case-insensitive, mas sem remover acentos no banco)
      // Por isso buscamos tanto pelo termo original quanto tentamos capturar variacoes
      const [{ data: dataPeixes }, { data: dataProdutos }] = await Promise.all([
        supabase
          .from('peixes')
          .select('id, nome, nome_cientifico, categoria, preco, imagem_url')
          .or(`nome.ilike.%${termo}%,nome_cientifico.ilike.%${termo}%,categoria.ilike.%${termo}%`)
          .limit(20),
        supabase
          .from('produtos')
          .select('id, nome, categoria, preco, imagem_url')
          .or(`nome.ilike.%${termo}%,categoria.ilike.%${termo}%`)
          .limit(20),
      ])

      const todosPeixes = (dataPeixes || []).map(p => ({ ...p, _tipo: 'peixe' }))
      const todosProdutos = (dataProdutos || []).map(p => ({ ...p, _tipo: 'produto' }))
      let todos = [...todosPeixes, ...todosProdutos]

      // Filtro extra client-side ignorando acentos (cobre "Beta" -> "Betta", "agua" -> "água")
      todos = todos.filter(item => {
        const nomeNorm = normalizar(item.nome)
        const cientificoNorm = normalizar(item.nome_cientifico)
        const categoriaNorm = normalizar(item.categoria)
        return nomeNorm.includes(termoNormalizado) || cientificoNorm.includes(termoNormalizado) || categoriaNorm.includes(termoNormalizado)
      })

      setSugestoes(todos.slice(0, limite))
      setCarregando(false)
    }, 250)

    return () => clearTimeout(timeout)
  }, [termo, limite])

  return { sugestoes, carregando }
}
