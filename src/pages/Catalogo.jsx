import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Loader, Search, X } from 'lucide-react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ImagemProduto from '../components/ImagemProduto'
import { supabase } from '../lib/supabase'
import { buscarFuzzy } from '../lib/fuzzySearch'
import { trackBusca } from '../lib/analytics'

const categoriasPeixes = [
  { label: 'Marinho', value: 'Marinho' },
  { label: 'Plantas', value: 'Plantas' },
]

const subcategorias = [
  { label: 'Todos Água Doce', value: 'Agua Doce' },
  { label: 'Primitivos', value: 'Primitivos' },
  { label: 'Amazônicos', value: 'Amazônicos' },
  { label: 'Variados', value: 'Variados' },
  { label: 'Jumbos', value: 'Jumbos' },
  { label: 'Cascudos', value: 'Cascudos' },
  { label: 'Ciclídeos Africanos', value: 'Ciclídeos Africanos' },
  { label: 'Betta', value: 'Betta' },
  { label: 'Ovovíparos', value: 'Ovovíparos' },
  { label: 'Killifish e Rainbow Fishs', value: 'Killifish e Rainbow Fishs' },
  { label: 'Kinguios & Carpas', value: 'Kinguios & Carpas' },
]

const produtosValues = ['Filtros', 'Acessórios', 'Peças de Reposição', 'Bombas de Circulação', 'Bombas de Recalque', 'Decoração (Aquascape)', 'Suplementos', 'Compressores de Ar', 'Termostatos', 'Resfriadores', 'Wavemakers', 'Luminárias', 'Sal Marinho', 'Alimentadores Automáticos', 'Alimentos Vivos', 'Ferramentas p/ Corais', 'Reposição de Água (ATO)', 'Medidores', 'Terrários', 'Substratos', 'Rações', 'Skimmers', 'Aquários']

const categoriasProdutos = [
  { label: 'Tudo', value: 'Produtos' },
  { label: 'Filtros', value: 'Filtros' },
  { label: 'Acessórios', value: 'Acessórios' },
  { label: 'Peças de Reposição', value: 'Peças de Reposição' },
  { label: 'Bombas de Circulação', value: 'Bombas de Circulação' },
  { label: 'Bombas de Recalque', value: 'Bombas de Recalque' },
  { label: 'Decoração (Aquascape)', value: 'Decoração (Aquascape)' },
  { label: 'Suplementos', value: 'Suplementos' },
  { label: 'Compressores de Ar', value: 'Compressores de Ar' },
  { label: 'Termostatos', value: 'Termostatos' },
  { label: 'Resfriadores', value: 'Resfriadores' },
  { label: 'Wavemakers', value: 'Wavemakers' },
  { label: 'Luminárias', value: 'Luminárias' },
  { label: 'Sal Marinho', value: 'Sal Marinho' },
  { label: 'Alimentadores Automáticos', value: 'Alimentadores Automáticos' },
  { label: 'Alimentos Vivos', value: 'Alimentos Vivos' },
  { label: 'Ferramentas p/ Corais', value: 'Ferramentas p/ Corais' },
  { label: 'Reposição de Água (ATO)', value: 'Reposição de Água (ATO)' },
  { label: 'Medidores', value: 'Medidores' },
  { label: 'Terrários', value: 'Terrários' },
  { label: 'Substratos', value: 'Substratos' },
  { label: 'Rações', value: 'Rações' },
  { label: 'Skimmers', value: 'Skimmers' },
  { label: 'Aquários', value: 'Aquários' },
]

const aguaDoceValues = ['Agua Doce', 'Primitivos', 'Amazônicos', 'Variados', 'Jumbos', 'Cascudos', 'Ciclídeos Africanos', 'Betta', 'Ovovíparos', 'Kinguios & Carpas', 'Killifish e Rainbow Fishs']

const ITENS_POR_PAGINA = 24

// So o que o card precisa: a descricao completa dos peixes e carregada apenas na pagina do peixe
const COLUNAS_PEIXES_CARD = 'id, nome, nome_base, nome_cientifico, categoria, preco, badge, imagem_url, disponivel, grupo_variante, variante_nome, variante_ordem'

function parsePreco(preco) {
  if (!preco) return 0
  const limpo = String(preco).replace(/[^\d,]/g, '').replace(',', '.')
  return parseFloat(limpo) || 0
}

function ordenarItens(itens, criterio) {
  const copia = [...itens]
  switch (criterio) {
    case 'menor-preco':
      return copia.sort((a, b) => parsePreco(a.preco) - parsePreco(b.preco))
    case 'maior-preco':
      return copia.sort((a, b) => parsePreco(b.preco) - parsePreco(a.preco))
    case 'az':
      return copia.sort((a, b) => (a.nome || '').localeCompare(b.nome || '', 'pt-BR'))
    case 'marca':
      return copia.sort((a, b) =>
        (a.marca || 'zzz').localeCompare(b.marca || 'zzz', 'pt-BR') ||
        (a.nome || '').localeCompare(b.nome || '', 'pt-BR')
      )
    default:
      return copia
  }
}

function formatPreco(valor) {
  return 'R$ ' + valor.toFixed(2).replace('.', ',')
}

function agruparVariantes(peixesLista) {
  const semGrupo = peixesLista.filter(p => !p.grupo_variante)
  const grupos = {}
  peixesLista.forEach(p => {
    if (!p.grupo_variante) return
    if (!grupos[p.grupo_variante]) grupos[p.grupo_variante] = []
    grupos[p.grupo_variante].push(p)
  })
  const itensAgrupados = Object.values(grupos).map(variantes => {
    const ordenadas = [...variantes].sort((a, b) => (a.variante_ordem || 0) - (b.variante_ordem || 0))
    const disponiveis = ordenadas.filter(v => v.disponivel !== false)
    const representante = disponiveis[0] || ordenadas[0]
    const precos = ordenadas.map(v => parsePreco(v.preco)).filter(v => v > 0)
    const precoMin = precos.length ? Math.min(...precos) : 0
    const precoMax = precos.length ? Math.max(...precos) : 0
    return {
      ...representante,
      nome: representante.nome_base || representante.nome,
      _variantes: ordenadas,
      _precoMin: precoMin,
      _precoMax: precoMax,
      disponivel: disponiveis.length > 0,
    }
  })
  return [...semGrupo, ...itensAgrupados]
}

function Catalogo() {
  const [peixes, setPeixes] = useState([])
  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  const scrollRestauradoRef = useRef(false)

  // Estado inicial vem da URL: isso permite que o botao "Voltar" das paginas
  // de detalhe restaure a categoria, busca, ordenacao e pagina exatas em que
  // o cliente estava (o historico do navegador ja guarda essa URL).
  const [filtro, setFiltro] = useState(() => searchParams.get('categoria') || 'Todos')
  const [busca, setBusca] = useState(() => searchParams.get('busca') || '')
  const [ordenacao, setOrdenacao] = useState(() => searchParams.get('ordenacao') || 'padrao')
  const [paginaAtual, setPaginaAtual] = useState(() => {
    const p = parseInt(searchParams.get('pagina'), 10)
    return p > 0 ? p : 1
  })
  const [mostrarAguaDoce, setMostrarAguaDoce] = useState(() => aguaDoceValues.includes(searchParams.get('categoria')))
  const [mostrarProdutos, setMostrarProdutos] = useState(() => {
    const c = searchParams.get('categoria')
    return c === 'Produtos' || produtosValues.includes(c)
  })

  // Links externos (Header, Home) navegam para /catalogo?categoria=... ou
  // ?busca=... mesmo quando o catalogo ja esta montado - sincroniza esses casos.
  useEffect(() => {
    const buscaParam = searchParams.get('busca') || ''
    const categoriaParam = searchParams.get('categoria') || 'Todos'
    setBusca(prev => (prev !== buscaParam ? buscaParam : prev))
    setFiltro(prev => (prev !== categoriaParam ? categoriaParam : prev))
    if (categoriaParam !== 'Todos') {
      if (aguaDoceValues.includes(categoriaParam)) setMostrarAguaDoce(true)
      if (categoriaParam === 'Produtos' || produtosValues.includes(categoriaParam)) setMostrarProdutos(true)
    }
  }, [searchParams])

  // Mantem a URL sempre refletindo o estado atual (com replace, sem poluir o
  // historico), para que a entrada do historico que fica para tras ao abrir
  // um peixe/produto ja tenha a categoria, busca, ordenacao e pagina certas.
  useEffect(() => {
    const params = {}
    if (filtro !== 'Todos') params.categoria = filtro
    if (busca) params.busca = busca
    if (ordenacao !== 'padrao') params.ordenacao = ordenacao
    if (paginaAtual > 1) params.pagina = String(paginaAtual)
    setSearchParams(params, { replace: true })
  }, [filtro, busca, ordenacao, paginaAtual])

  useEffect(() => {
    async function buscarTudo() {
      const [{ data: dataPeixes }, { data: dataProdutos }] = await Promise.all([
        supabase.from('peixes').select(COLUNAS_PEIXES_CARD).order('nome'),
        supabase.from('produtos').select('*').order('nome')
      ])
      if (dataPeixes) setPeixes(dataPeixes)
      if (dataProdutos) setProdutos(dataProdutos)
      setCarregando(false)
    }
    buscarTudo()
  }, [])

  // Nao reseta a pagina no primeiro render: nesse momento paginaAtual ja
  // veio da URL (restaurando onde o cliente estava ao clicar em "Voltar").
  const primeiraRenderPaginaRef = useRef(true)
  useEffect(() => {
    if (primeiraRenderPaginaRef.current) {
      primeiraRenderPaginaRef.current = false
      return
    }
    setPaginaAtual(1)
  }, [filtro, busca, ordenacao])

  useEffect(() => {
    if (!busca) return
    const timeout = setTimeout(() => {
      trackBusca(busca)
    }, 600)
    return () => clearTimeout(timeout)
  }, [busca])

  const todosItens = [
    ...agruparVariantes(peixes).map(p => ({ ...p, _tipo: 'peixe' })),
    ...produtos.map(p => ({ ...p, _tipo: 'produto' }))
  ]

  const termoBuscaTrim = busca.trim()

  const itensFiltrados = (() => {
    // Enquanto o cliente esta buscando, ignora a categoria selecionada e olha tudo
    const baseParaFiltrar = termoBuscaTrim ? todosItens : todosItens.filter(item => {
      if (filtro === 'Todos') return true
      if (filtro === 'Agua Doce') return aguaDoceValues.includes(item.categoria)
      if (filtro === 'Produtos') return produtosValues.includes(item.categoria)
      return item.categoria === filtro
    })
    const resultado = termoBuscaTrim ? buscarFuzzy(baseParaFiltrar, termoBuscaTrim) : baseParaFiltrar
    const ordenado = ordenarItens(resultado, ordenacao)

    // Indisponiveis sempre no final, mantendo a ordem definida acima entre os itens de cada grupo
    return [...ordenado].sort((a, b) => {
      const aIndisponivel = a.disponivel === false
      const bIndisponivel = b.disponivel === false
      if (aIndisponivel === bIndisponivel) return 0
      return aIndisponivel ? 1 : -1
    })
  })()

  const itensVisiveis = itensFiltrados.slice(0, paginaAtual * ITENS_POR_PAGINA)
  const temMais = itensVisiveis.length < itensFiltrados.length

  // Guarda a posicao de rolagem associada a URL atual (categoria/busca/pagina),
  // para restaurar quando o cliente voltar da pagina de um peixe/produto.
  useEffect(() => {
    const chave = 'catalogoScroll:' + location.search
    function salvarScroll() {
      sessionStorage.setItem(chave, String(window.scrollY))
    }
    window.addEventListener('scroll', salvarScroll, { passive: true })
    return () => {
      salvarScroll()
      window.removeEventListener('scroll', salvarScroll)
    }
  }, [location.search])

  useEffect(() => {
    if (carregando || scrollRestauradoRef.current || itensVisiveis.length === 0) return
    scrollRestauradoRef.current = true
    const salvo = sessionStorage.getItem('catalogoScroll:' + location.search)
    if (salvo) {
      requestAnimationFrame(() => window.scrollTo(0, parseInt(salvo, 10) || 0))
    }
  }, [carregando, itensVisiveis.length, location.search])

  function handleFiltro(value) {
    setFiltro(value)
    if (!aguaDoceValues.includes(value) && value !== 'Agua Doce') setMostrarAguaDoce(false)
  }

  return (
    <div className="bg-[#F4F1E1] min-h-screen">
      <Header />
      <div className="pt-20 md:pt-24 pb-16 md:pb-20 px-4 md:px-6 max-w-6xl mx-auto">

        <motion.div className="mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="text-[#5B8C7A] text-sm font-medium tracking-widest uppercase flex items-center gap-2">
            <span className="w-7 h-px bg-[#5B8C7A]"></span>
            Catálogo completo
          </span>
          <h1 className="font-serif text-4xl font-light mt-2 text-[#2C2416]">
            Nossos <span className="text-[#5B8C7A] italic">produtos</span>
          </h1>
        </motion.div>

        <motion.div className="relative mb-8" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9C8A6A]" size={18} />
          <input
            type="text"
            placeholder="Buscar peixe, produto ou categoria..."
            value={busca}
            onChange={e => {
              const valor = e.target.value
              setBusca(valor)
              if (valor.trim() && filtro !== 'Todos') {
                setFiltro('Todos')
                setMostrarAguaDoce(false)
                setMostrarProdutos(false)
              }
            }}
            className="w-full bg-white border border-[#D9D2B0] rounded-xl pl-11 pr-10 py-3 text-sm text-[#2C2416] placeholder-[#9C8A6A] focus:outline-none focus:border-[#5B8C7A] transition-colors"
          />
          {busca && (
            <button onClick={() => setBusca('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9C8A6A] hover:text-[#2C2416] transition-colors">
              <X size={16} />
            </button>
          )}
        </motion.div>

        <div className="mb-6">
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-6 px-6 md:overflow-visible md:flex-wrap md:mx-0 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <button onClick={() => { handleFiltro('Todos'); setMostrarAguaDoce(false); setMostrarProdutos(false) }} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex-shrink-0 ${filtro === 'Todos' ? 'bg-[#5B8C7A] text-white' : 'bg-white text-[#6B5B3E] hover:bg-[#5B8C7A] hover:text-white'}`}>
              Todos
            </button>
            <button onClick={() => { setMostrarAguaDoce(!mostrarAguaDoce); setMostrarProdutos(false); handleFiltro('Agua Doce') }} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex-shrink-0 ${aguaDoceValues.includes(filtro) ? 'bg-[#5B8C7A] text-white' : 'bg-white text-[#6B5B3E] hover:bg-[#5B8C7A] hover:text-white'}`}>
              Água Doce ▾
            </button>
            {categoriasPeixes.map(cat => (
              <button key={cat.value} onClick={() => { handleFiltro(cat.value); setMostrarProdutos(false) }} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex-shrink-0 ${filtro === cat.value ? 'bg-[#5B8C7A] text-white' : 'bg-white text-[#6B5B3E] hover:bg-[#5B8C7A] hover:text-white'}`}>
                {cat.label}
              </button>
            ))}
            <span className="w-px bg-[#D9D2B0] self-stretch flex-shrink-0"></span>
            <button onClick={() => { setMostrarProdutos(!mostrarProdutos); setMostrarAguaDoce(false); handleFiltro('Produtos') }} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex-shrink-0 whitespace-nowrap ${categoriasProdutos.some(c => c.value === filtro) ? 'bg-[#6B5B3E] text-white' : 'bg-white text-[#6B5B3E] hover:bg-[#6B5B3E] hover:text-white'}`}>
              Produtos & Acessórios ▾
            </button>
          </div>

          {mostrarAguaDoce && (
            <motion.div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 md:overflow-visible md:flex-wrap md:mx-0 md:px-0 mt-3 md:pl-4 md:border-l-2 border-[#5B8C7A] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
              {subcategorias.map(sub => (
                <button key={sub.value} onClick={() => setFiltro(sub.value)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex-shrink-0 whitespace-nowrap ${filtro === sub.value ? 'bg-[#3D6B5A] text-white' : 'bg-[#E8E3CC] text-[#6B5B3E] hover:bg-[#3D6B5A] hover:text-white'}`}>
                  {sub.label}
                </button>
              ))}
            </motion.div>
          )}

          {mostrarProdutos && (
            <motion.div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 md:overflow-visible md:flex-wrap md:mx-0 md:px-0 mt-3 md:pl-4 md:border-l-2 border-[#6B5B3E] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
              {categoriasProdutos.map(cat => (
                <button key={cat.value} onClick={() => handleFiltro(cat.value)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex-shrink-0 whitespace-nowrap ${filtro === cat.value ? 'bg-[#6B5B3E] text-white' : 'bg-[#E8E3CC] text-[#6B5B3E] hover:bg-[#6B5B3E] hover:text-white'}`}>
                  {cat.label}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <p className="text-sm text-[#7A6A52]">
            {busca ? (
              <>{itensFiltrados.length} resultado{itensFiltrados.length !== 1 ? 's' : ''} para <span className="font-medium text-[#2C2416]">"{busca}"</span></>
            ) : (
              <>Mostrando {itensVisiveis.length} de {itensFiltrados.length} produtos</>
            )}
          </p>

          <select
            value={ordenacao}
            onChange={e => setOrdenacao(e.target.value)}
            className="bg-white border border-[#D9D2B0] rounded-full px-4 py-2 text-sm text-[#6B5B3E] focus:outline-none focus:border-[#5B8C7A] cursor-pointer"
          >
            <option value="padrao">Ordenar por</option>
            <option value="az">Nome A-Z</option>
            <option value="menor-preco">Menor preço</option>
            <option value="maior-preco">Maior preço</option>
            <option value="marca">Marca</option>
          </select>
        </div>

        {carregando ? (
          <div className="flex justify-center items-center py-20">
            <Loader className="animate-spin text-[#5B8C7A]" size={32} />
          </div>
        ) : itensFiltrados.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🐠</div>
            <p className="text-[#7A6A52] text-lg">Nenhum resultado encontrado</p>
            <button onClick={() => { setBusca(''); setFiltro('Todos') }} className="mt-4 text-[#5B8C7A] underline text-sm">Limpar filtros</button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
              {itensVisiveis.map((item, i) => {
                const indisponivel = item.disponivel === false
                const aPartirDe = !indisponivel && item._variantes && item._precoMin !== item._precoMax
                return (
                  <div key={item.id + item._tipo} className="animate-fadein" style={{ animationDelay: (i % ITENS_POR_PAGINA) * 0.02 + 's' }}>
                    <Link to={"/" + item._tipo + "/" + item.id} className="bg-white rounded-xl overflow-hidden md:hover:-translate-y-1 transition-transform duration-300 shadow-sm hover:shadow-md h-full flex flex-col">
                      <div className="relative aspect-[4/3] overflow-hidden bg-[#E8E3CC]">
                        <ImagemProduto
                          src={item.imagem_url}
                          alt={item.nome}
                          prioritaria={i < 4}
                          indisponivel={indisponivel}
                          largura={450}
                          className="w-full h-full object-contain md:hover:scale-105 transition-transform duration-500"
                        />
                        {indisponivel ? (
                          <span className="absolute top-2 left-2 md:top-3 md:left-3 bg-red-600 text-white text-[10px] md:text-xs font-medium px-2 md:px-3 py-0.5 md:py-1 rounded-full z-10">Indisponível</span>
                        ) : item.badge ? (
                          <span className="absolute top-2 left-2 md:top-3 md:left-3 bg-[#5B8C7A] text-white text-[10px] md:text-xs font-medium px-2 md:px-3 py-0.5 md:py-1 rounded-full z-10">{item.badge}</span>
                        ) : null}
                      </div>
                      <div className="p-3 md:p-5 flex flex-col flex-1">
                        <span className="text-[10px] md:text-xs font-medium tracking-widest uppercase text-[#9C8A6A] block mb-1 truncate">{item.categoria}</span>
                        <div className="font-serif text-[15px] md:text-xl leading-snug text-[#2C2416] mb-1 line-clamp-2">{item.nome}</div>
                        {item.nome_cientifico && <span className="font-serif italic text-xs md:text-sm text-[#7A6A52] block mb-2 md:mb-3 truncate">{item.nome_cientifico}</span>}
                        {item.descricao && <span className="hidden md:block text-sm text-[#7A6A52] mb-3 line-clamp-2">{item.descricao}</span>}
                        {item._variantes && item._variantes.length > 1 && (
                          <span className="text-[11px] md:text-xs text-[#5B8C7A] block mb-2 md:mb-3">
                            {item._variantes.length} tamanhos
                          </span>
                        )}
                        <div className="flex justify-between items-end gap-2 pt-2 md:pt-3 mt-auto border-t border-[#E8E3CC]">
                          <div className="min-w-0">
                            {aPartirDe && <span className="block text-[11px] md:text-xs text-[#7A6A52] leading-tight">A partir de</span>}
                            <span className={`font-serif text-lg md:text-2xl font-semibold whitespace-nowrap ${indisponivel ? 'text-[#9C8A6A] line-through' : 'text-[#6B5B3E]'}`}>
                              {aPartirDe ? formatPreco(item._precoMin) : item.preco}
                            </span>
                          </div>
                          <span className={`hidden md:inline-block text-sm px-4 py-2 rounded text-white flex-shrink-0 ${indisponivel ? 'bg-[#9C8A6A]' : 'bg-[#5B8C7A]'}`}>
                            {indisponivel ? 'Consultar' : 'Ver detalhes'}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                )
              })}
            </div>

            {temMais && (
              <div className="flex justify-center mt-8 md:mt-10">
                <button onClick={() => setPaginaAtual(p => p + 1)} className="w-full md:w-auto bg-white border border-[#D9D2B0] text-[#6B5B3E] px-8 py-3.5 md:py-3 rounded-full text-sm font-medium hover:bg-[#5B8C7A] hover:text-white hover:border-[#5B8C7A] transition-colors">
                  Carregar mais ({itensFiltrados.length - itensVisiveis.length} restantes)
                </button>
              </div>
            )}
          </>
        )}

      </div>
      <Footer />
    </div>
  )
}

export default Catalogo
