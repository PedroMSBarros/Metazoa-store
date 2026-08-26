import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Loader, Search, X } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ImagemProduto from '../components/ImagemProduto'
import { supabase } from '../lib/supabase'
import { trackBusca } from '../lib/analytics'

const categoriasPeixes = [
  { label: 'Marinho', value: 'Marinho' },
  { label: 'Plantas', value: 'Plantas' },
]

const subcategorias = [
  { label: 'Todos Agua Doce', value: 'Agua Doce' },
  { label: 'Primitivos', value: 'Primitivos' },
  { label: 'Amazônicos', value: 'Amazônicos' },
  { label: 'Variados', value: 'Variados' },
  { label: 'Jumbos', value: 'Jumbos' },
  { label: 'Cascudos', value: 'Cascudos' },
  { label: 'Ciclídeos Africanos', value: 'Ciclídeos Africanos' },
]

const categoriasProdutos = [
  { label: 'Acessorios', value: 'Acessorios' },
  { label: 'Outros', value: 'Outros' },
]

const aguaDoceValues = ['Agua Doce', 'Primitivos', 'Amazônicos', 'Variados', 'Jumbos', 'Cascudos', 'Ciclídeos Africanos']
const produtosValues = ['Acessorios', 'Outros']

const ITENS_POR_PAGINA = 24

function Catalogo() {
  const [peixes, setPeixes] = useState([])
  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [filtro, setFiltro] = useState('Todos')
  const [mostrarAguaDoce, setMostrarAguaDoce] = useState(false)
  const [busca, setBusca] = useState('')
  const [paginaAtual, setPaginaAtual] = useState(1)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const buscaParam = searchParams.get('busca')
    if (buscaParam) setBusca(buscaParam)
    const categoriaParam = searchParams.get('categoria')
    if (categoriaParam) {
      setFiltro(categoriaParam)
      if (aguaDoceValues.includes(categoriaParam)) setMostrarAguaDoce(true)
    }
  }, [searchParams])

  useEffect(() => {
    async function buscarTudo() {
      const [{ data: dataPeixes }, { data: dataProdutos }] = await Promise.all([
        supabase.from('peixes').select('*').order('nome'),
        supabase.from('produtos').select('*').order('nome')
      ])
      if (dataPeixes) setPeixes(dataPeixes)
      if (dataProdutos) setProdutos(dataProdutos)
      setCarregando(false)
    }
    buscarTudo()
  }, [])

  useEffect(() => {
    setPaginaAtual(1)
  }, [filtro, busca])

  useEffect(() => {
    if (!busca) return
    const timeout = setTimeout(() => {
      trackBusca(busca)
    }, 600)
    return () => clearTimeout(timeout)
  }, [busca])

  const todosItens = [
    ...peixes.map(p => ({ ...p, _tipo: 'peixe' })),
    ...produtos.map(p => ({ ...p, _tipo: 'produto' }))
  ]

  const itensFiltrados = todosItens
    .filter(item => {
      if (filtro === 'Todos') return true
      if (filtro === 'Agua Doce') return aguaDoceValues.includes(item.categoria)
      return item.categoria === filtro
    })
    .filter(item => {
      if (!busca) return true
      const termo = busca.toLowerCase()
      return (
        item.nome?.toLowerCase().includes(termo) ||
        item.nome_cientifico?.toLowerCase().includes(termo) ||
        item.descricao?.toLowerCase().includes(termo) ||
        item.categoria?.toLowerCase().includes(termo)
      )
    })

  const itensVisiveis = itensFiltrados.slice(0, paginaAtual * ITENS_POR_PAGINA)
  const temMais = itensVisiveis.length < itensFiltrados.length

  function handleFiltro(value) {
    setFiltro(value)
    if (!aguaDoceValues.includes(value) && value !== 'Agua Doce') setMostrarAguaDoce(false)
  }

  return (
    <div className="bg-[#F4F1E1] min-h-screen">
      <Header />
      <div className="pt-24 pb-20 px-6 max-w-6xl mx-auto">

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
          <input type="text" placeholder="Buscar peixe, produto ou categoria..." value={busca} onChange={e => setBusca(e.target.value)} className="w-full bg-white border border-[#D9D2B0] rounded-xl pl-11 pr-10 py-3 text-sm text-[#2C2416] placeholder-[#9C8A6A] focus:outline-none focus:border-[#5B8C7A] transition-colors" />
          {busca && (
            <button onClick={() => setBusca('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9C8A6A] hover:text-[#2C2416] transition-colors">
              <X size={16} />
            </button>
          )}
        </motion.div>

        <div className="mb-6">
          <div className="flex gap-3 flex-wrap">
            <button onClick={() => { handleFiltro('Todos'); setMostrarAguaDoce(false) }} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filtro === 'Todos' ? 'bg-[#5B8C7A] text-white' : 'bg-white text-[#6B5B3E] hover:bg-[#5B8C7A] hover:text-white'}`}>
              Todos
            </button>
            <button onClick={() => { setMostrarAguaDoce(!mostrarAguaDoce); handleFiltro('Agua Doce') }} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${aguaDoceValues.includes(filtro) ? 'bg-[#5B8C7A] text-white' : 'bg-white text-[#6B5B3E] hover:bg-[#5B8C7A] hover:text-white'}`}>
              Agua Doce ▾
            </button>
            {categoriasPeixes.map(cat => (
              <button key={cat.value} onClick={() => handleFiltro(cat.value)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filtro === cat.value ? 'bg-[#5B8C7A] text-white' : 'bg-white text-[#6B5B3E] hover:bg-[#5B8C7A] hover:text-white'}`}>
                {cat.label}
              </button>
            ))}
            <span className="w-px bg-[#D9D2B0] self-stretch"></span>
            {categoriasProdutos.map(cat => (
              <button key={cat.value} onClick={() => handleFiltro(cat.value)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filtro === cat.value ? 'bg-[#6B5B3E] text-white' : 'bg-white text-[#6B5B3E] hover:bg-[#6B5B3E] hover:text-white'}`}>
                {cat.label}
              </button>
            ))}
          </div>

          {mostrarAguaDoce && (
            <motion.div className="flex gap-3 flex-wrap mt-3 pl-4 border-l-2 border-[#5B8C7A]" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
              {subcategorias.map(sub => (
                <button key={sub.value} onClick={() => setFiltro(sub.value)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${filtro === sub.value ? 'bg-[#3D6B5A] text-white' : 'bg-[#E8E3CC] text-[#6B5B3E] hover:bg-[#3D6B5A] hover:text-white'}`}>
                  {sub.label}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        <p className="text-sm text-[#7A6A52] mb-6">
          {busca ? (
            <>{itensFiltrados.length} resultado{itensFiltrados.length !== 1 ? 's' : ''} para <span className="font-medium text-[#2C2416]">"{busca}"</span></>
          ) : (
            <>Mostrando {itensVisiveis.length} de {itensFiltrados.length} produtos</>
          )}
        </p>

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {itensVisiveis.map((item, i) => {
                const indisponivel = item.disponivel === false
                return (
                  <div key={item.id + item._tipo} className="animate-fadein" style={{ animationDelay: (i % ITENS_POR_PAGINA) * 0.02 + 's' }}>
                    <Link to={"/" + item._tipo + "/" + item.id} className="bg-white rounded-xl overflow-hidden hover:-translate-y-1 transition-transform duration-300 shadow-sm hover:shadow-md block">
                      <div className="relative aspect-[4/3] overflow-hidden bg-[#E8E3CC]">
                        <ImagemProduto
                          src={item.imagem_url}
                          alt={item.nome}
                          prioritaria={i < 6}
                          indisponivel={indisponivel}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                        {indisponivel ? (
                          <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-medium px-3 py-1 rounded-full z-10">Indisponível</span>
                        ) : item.badge ? (
                          <span className="absolute top-3 left-3 bg-[#5B8C7A] text-white text-xs font-medium px-3 py-1 rounded-full z-10">{item.badge}</span>
                        ) : null}
                      </div>
                      <div className="p-5">
                        <span className="text-xs font-medium tracking-widest uppercase text-[#9C8A6A] block mb-1">{item.categoria}</span>
                        <div className="font-serif text-xl text-[#2C2416] mb-1">{item.nome}</div>
                        {item.nome_cientifico && <span className="font-serif italic text-sm text-[#7A6A52] block mb-3">{item.nome_cientifico}</span>}
                        {item.descricao && <span className="text-sm text-[#7A6A52] block mb-3 line-clamp-2">{item.descricao}</span>}
                        <div className="flex justify-between items-center pt-3 border-t border-[#E8E3CC]">
                          <span className={`font-serif text-2xl font-semibold ${indisponivel ? 'text-[#9C8A6A] line-through' : 'text-[#6B5B3E]'}`}>{item.preco}</span>
                          <span className={`text-sm px-4 py-2 rounded text-white ${indisponivel ? 'bg-[#9C8A6A]' : 'bg-[#5B8C7A]'}`}>
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
              <div className="flex justify-center mt-10">
                <button onClick={() => setPaginaAtual(p => p + 1)} className="bg-white border border-[#D9D2B0] text-[#6B5B3E] px-8 py-3 rounded-full text-sm font-medium hover:bg-[#5B8C7A] hover:text-white hover:border-[#5B8C7A] transition-colors">
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
