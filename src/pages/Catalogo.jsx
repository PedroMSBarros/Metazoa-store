import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Loader, Search, X } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { supabase } from '../lib/supabase'

const categorias = [
  { label: 'Todos', value: 'Todos' },
  { label: 'Marinho', value: 'Marinho' },
  { label: 'Plantas', value: 'Plantas' },
  { label: 'Acessorios', value: 'Acessorios' },
]

const subcategorias = [
  { label: 'Todos Agua Doce', value: 'Agua Doce' },
  { label: 'Primitivos', value: 'Primitivos' },
  { label: 'Amazônicos', value: 'Amazonicos' },
  { label: 'Variados', value: 'Variados' },
  { label: 'Jumbos', value: 'Jumbos' },
  { label: 'Cascudos', value: 'Cascudos' },
  { label: 'Ciclídeos Africanos', value: 'Ciclideos Africanos' },
]

const aguaDoceValues = ['Agua Doce', 'Primitivos', 'Amazonicos', 'Variados', 'Jumbos', 'Cascudos', 'Ciclideos Africanos']

function Catalogo() {
  const [peixes, setPeixes] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [filtro, setFiltro] = useState('Todos')
  const [mostrarAguaDoce, setMostrarAguaDoce] = useState(false)
  const [busca, setBusca] = useState('')
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const categoriaParam = searchParams.get('categoria')
    if (categoriaParam) {
      setFiltro(categoriaParam)
      if (aguaDoceValues.includes(categoriaParam)) {
        setMostrarAguaDoce(true)
      }
    }
  }, [searchParams])

  useEffect(() => {
    async function buscarPeixes() {
      const { data, error } = await supabase.from('peixes').select('*')
      if (!error) setPeixes(data)
      setCarregando(false)
    }
    buscarPeixes()
  }, [])

  const peixesFiltrados = peixes
    .filter(p => {
      if (filtro === 'Todos') return true
      if (filtro === 'Agua Doce') return aguaDoceValues.includes(p.categoria)
      return p.categoria === filtro
    })
    .filter(p => {
      if (!busca) return true
      const termo = busca.toLowerCase()
      return (
        p.nome?.toLowerCase().includes(termo) ||
        p.nome_cientifico?.toLowerCase().includes(termo) ||
        p.categoria?.toLowerCase().includes(termo)
      )
    })

  function handleFiltro(value) {
    setFiltro(value)
    if (!aguaDoceValues.includes(value) && value !== 'Agua Doce') {
      setMostrarAguaDoce(false)
    }
  }

  return (
    <div className="bg-[#F4F1E1] min-h-screen">
      <Header />
      <div className="pt-24 pb-20 px-6 max-w-6xl mx-auto">

        <motion.div className="mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="text-[#5B8C7A] text-sm font-medium tracking-widest uppercase flex items-center gap-2">
            <span className="w-7 h-px bg-[#5B8C7A]"></span>
            Catalogo completo
          </span>
          <h1 className="font-serif text-4xl font-light mt-2 text-[#2C2416]">
            Nossos <span className="text-[#5B8C7A] italic">peixes</span>
          </h1>
        </motion.div>

        <motion.div className="relative mb-8" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9C8A6A]" size={18} />
          <input type="text" placeholder="Buscar peixe, especie ou categoria..." value={busca} onChange={e => setBusca(e.target.value)} className="w-full bg-white border border-[#D9D2B0] rounded-xl pl-11 pr-10 py-3 text-sm text-[#2C2416] placeholder-[#9C8A6A] focus:outline-none focus:border-[#5B8C7A] transition-colors" />
          {busca && (
            <button onClick={() => setBusca('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9C8A6A] hover:text-[#2C2416] transition-colors">
              <X size={16} />
            </button>
          )}
        </motion.div>

        <div className="mb-8">
          <div className="flex gap-3 flex-wrap">
            {categorias.map(cat => (
              <button key={cat.value} onClick={() => { handleFiltro(cat.value); setMostrarAguaDoce(false) }} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filtro === cat.value ? 'bg-[#5B8C7A] text-white' : 'bg-white text-[#6B5B3E] hover:bg-[#5B8C7A] hover:text-white'}`}>
                {cat.label}
              </button>
            ))}
            <button onClick={() => { setMostrarAguaDoce(!mostrarAguaDoce); handleFiltro('Agua Doce') }} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${aguaDoceValues.includes(filtro) ? 'bg-[#5B8C7A] text-white' : 'bg-white text-[#6B5B3E] hover:bg-[#5B8C7A] hover:text-white'}`}>
              Agua Doce ▾
            </button>
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

        {busca && (
          <p className="text-sm text-[#7A6A52] mb-6">
            {peixesFiltrados.length} resultado{peixesFiltrados.length !== 1 ? 's' : ''} para <span className="font-medium text-[#2C2416]">"{busca}"</span>
          </p>
        )}

        {carregando ? (
          <div className="flex justify-center items-center py-20">
            <Loader className="animate-spin text-[#5B8C7A]" size={32} />
          </div>
        ) : peixesFiltrados.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🐠</div>
            <p className="text-[#7A6A52] text-lg">Nenhum resultado encontrado</p>
            <button onClick={() => { setBusca(''); setFiltro('Todos') }} className="mt-4 text-[#5B8C7A] underline text-sm">Limpar filtros</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {peixesFiltrados.map((peixe, i) => (
              <motion.div key={peixe.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.03 }}>
                <Link to={"/peixe/" + peixe.id} className="bg-white rounded-xl overflow-hidden hover:-translate-y-1 transition-transform duration-300 shadow-sm hover:shadow-md block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#E8E3CC]">
                    <img src={peixe.imagem_url} alt={peixe.nome} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    {peixe.badge && (
                      <span className="absolute top-3 left-3 bg-[#5B8C7A] text-white text-xs font-medium px-3 py-1 rounded-full">{peixe.badge}</span>
                    )}
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-medium tracking-widest uppercase text-[#9C8A6A] block mb-1">{peixe.categoria}</span>
                    <div className="font-serif text-xl text-[#2C2416] mb-1">{peixe.nome}</div>
                    <span className="font-serif italic text-sm text-[#7A6A52] block mb-3">{peixe.nome_cientifico}</span>
                    <div className="flex justify-between items-center pt-3 border-t border-[#E8E3CC]">
                      <span className="font-serif text-2xl font-semibold text-[#6B5B3E]">{peixe.preco}</span>
                      <span className="bg-[#5B8C7A] text-white text-sm px-4 py-2 rounded">Ver detalhes</span>
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
