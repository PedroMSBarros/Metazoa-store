import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Loader, Search, X } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { supabase } from '../lib/supabase'

const categoriasPeixes = [
  { label: 'Marinho', value: 'Marinho' },
  { label: 'Plantas', value: 'Plantas' },
]

const subcategorias = [
  { label: 'Todos Água Doce', value: 'Água Doce' },
  { label: 'Primitivos', value: 'Primitivos' },
  { label: 'Amazônicos', value: 'Amazônicos' },
  { label: 'Variados', value: 'Variados' },
  { label: 'Jumbos', value: 'Jumbos' },
  { label: 'Cascudos', value: 'Cascudos' },
  { label: 'Ciclídeos Africanos', value: 'Ciclídeos Africanos' },
]

const categoriasProdutos = [
  { label: 'Acessórios', value: 'Acessórios' },
  { label: 'Outros', value: 'Outros' },
]

const aguaDoceValues = ['Água Doce', 'Primitivos', 'Amazônicos', 'Variados', 'Jumbos', 'Cascudos', 'Ciclídeos Africanos']
const produtosValues = ['Acessórios', 'Outros']

function Catalogo() {
  const [peixes, setPeixes] = useState([])
  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [filtro, setFiltro] = useState('Todos')
  const [mostrarAguaDoce, setMostrarAguaDoce] = useState(false)
  const [busca, setBusca] = useState('')
  const [searchParams] = useSearchParams()

  useEffect(() => {
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

  const todosItens = [
    ...peixes.map(p => ({ ...p, _tipo: 'peixe' })),
    ...produtos.map(p => ({ ...p, _tipo: 'produto' }))
  ]

  const itensFiltrados = todosItens
    .filter(item => {
      if (filtro === 'Todos') return true
      if (filtro === 'Água Doce') return aguaDoceValues.includes(item.categoria)
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

  function handleFiltro(value) {
    setFiltro(value)
    if (!aguaDoceValues.includes(value) && value !== 'Água Doce') setMostrarAguaDoce(false)
  }

  return (
    <div className="bg-[#F4F1E1] min-h-screen">
      <Header />
      <div className="pt-24 pb-20 px-6 max-w-6xl mx-auto">
        <motion.div className="mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-[#5B8C7A] text-sm font-medium tracking-widest uppercase flex items-center gap-2">
            <span className="w-7 h-px bg-[#5B8C7A]"></span>
            Catalogo completo
          </span>
          <h1 className="font-serif text-4xl font-light mt-2 text-[#2C2416]">
            Nossos <span className="text-[#5B8C7A] italic">produtos</span>
          </h1>
        </motion.div>

        <motion.div className="relative mb-8" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ pointerEvents: 'auto' }}>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9C8A6A] pointer-events-none" size={18} />
          <input type="search" inputMode="search" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" placeholder="Buscar por nome, espécie ou categoria..." value={busca} onChange={e => setBusca(e.target.value)} className="w-full pl-11 pr-10 py-3 rounded-xl border border-[#D9D2B0] bg-white text-[#2C2416] placeholder-[#9C8A6A] focus:outline-none focus:ring-2 focus:ring-[#5B8C7A]" />
          {busca && (
            <button onClick={() => setBusca('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9C8A6A] hover:text-[#2C2416]">
              <X size={16} />
            </button>
          )}
        </motion.div>

        <div className="mb-8">
          <div className="flex gap-3 flex-wrap">
            <button onClick={() => { handleFiltro('Todos'); setMostrarAguaDoce(false) }} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filtro === 'Todos' && !mostrarAguaDoce ? 'bg-[#5B8C7A] text-white' : 'bg-white text-[#5B8C7A] border border-[#5B8C7A] hover:bg-[#5B8C7A] hover:text-white'}`}>
              Todos
            </button>
            <button onClick={() => { setMostrarAguaDoce(!mostrarAguaDoce); handleFiltro('Água Doce') }} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${mostrarAguaDoce || aguaDoceValues.includes(filtro) ? 'bg-[#5B8C7A] text-white' : 'bg-white text-[#5B8C7A] border border-[#5B8C7A] hover:bg-[#5B8C7A] hover:text-white'}`}>
              Água Doce ▾
            </button>
            {categoriasPeixes.map(cat => (
              <button key={cat.value} onClick={() => handleFiltro(cat.value)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filtro === cat.value ? 'bg-[#5B8C7A] text-white' : 'bg-white text-[#5B8C7A] border border-[#5B8C7A] hover:bg-[#5B8C7A] hover:text-white'}`}>
                {cat.label}
              </button>
            ))}
            <span className="w-px bg-[#D9D2B0] self-stretch"></span>
            {categoriasProdutos.map(cat => (
              <button key={cat.value} onClick={() => handleFiltro(cat.value)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filtro === cat.value ? 'bg-[#5B8C7A] text-white' : 'bg-white text-[#5B8C7A] border border-[#5B8C7A] hover:bg-[#5B8C7A] hover:text-white'}`}>
                {cat.label}
              </button>
            ))}
          </div>
          {mostrarAguaDoce && (
            <motion.div className="flex gap-3 flex-wrap mt-3 pl-4 border-l-2 border-[#5B8C7A]" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
              {subcategorias.map(sub => (
                <button key={sub.value} onClick={() => setFiltro(sub.value)} className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${filtro === sub.value ? 'bg-[#5B8C7A] text-white' : 'bg-white text-[#5B8C7A] border border-[#5B8C7A] hover:bg-[#5B8C7A] hover:text-white'}`}>
                  {sub.label}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {busca && (
          <p className="text-sm text-[#7A6A52] mb-6">
            {itensFiltrados.length} resultado{itensFiltrados.length !== 1 ? 's' : ''} para <strong>"{busca}"</strong>
          </p>
        )}

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {itensFiltrados.map((item, i) => (
              <motion.div key={item.id + item._tipo} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Link to={"/" + item._tipo + "/" + item.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow block">
                  <div className={`relative aspect-[4/3] overflow-hidden bg-[#E8E3CC] ${item.disponivel === false ? 'opacity-60' : ''}`}>
                    <img src={item.imagem_url} alt={item.nome} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    {item.disponivel === false ? (
                      <span className="absolute top-3 left-3 bg-[#8B6F47] text-white text-xs px-2 py-1 rounded">Indisponível</span>
                    ) : item.badge ? (
                      <span className="absolute top-3 left-3 bg-[#5B8C7A] text-white text-xs px-2 py-1 rounded">{item.badge}</span>
                    ) : null}
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-medium tracking-widest uppercase text-[#9C8A6A]">{item.categoria}</span>
                    <div className="font-serif text-xl text-[#2C2416] mb-1">{item.nome}</div>
                    {item.nome_cientifico && <span className="font-serif italic text-sm text-[#9C8A6A] block mb-2">{item.nome_cientifico}</span>}
                    {item.descricao && <span className="text-sm text-[#7A6A52] block mb-3 line-clamp-2">{item.descricao}</span>}
                    <div className="flex justify-between items-center pt-3 border-t border-[#E8E3CC]">
                      <span className="font-serif text-2xl font-semibold text-[#6B5B3E]">{item.preco ? `R$ ${Number(item.preco).toFixed(2)}` : ''}</span>
                      <span className="bg-[#5B8C7A] text-white text-sm px-4 py-2 rounded">Ver mais</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Catalogo
