import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Loader } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { supabase } from '../lib/supabase'

const categorias = ['Todos', 'Agua Doce', 'Marinho', 'Plantas', 'Acessorios']

function Catalogo() {
  const [peixes, setPeixes] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [filtro, setFiltro] = useState('Todos')

  useEffect(() => {
    async function buscarPeixes() {
      const { data, error } = await supabase.from('peixes').select('*')
      if (!error) setPeixes(data)
      setCarregando(false)
    }
    buscarPeixes()
  }, [])

  const peixesFiltrados = filtro === 'Todos' ? peixes : peixes.filter(p => p.categoria === filtro)

  return (
    <div className="bg-[#F4F1E1] min-h-screen">
      <Header />
      <div className="pt-24 pb-20 px-6 max-w-6xl mx-auto">

        <motion.div className="mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="text-[#5B8C7A] text-sm font-medium tracking-widest uppercase flex items-center gap-2">
            <span className="w-7 h-px bg-[#5B8C7A]"></span>
            Catalogo completo
          </span>
          <h1 className="font-serif text-4xl font-light mt-2 text-[#2C2416]">
            Nossos <span className="text-[#5B8C7A] italic">peixes</span>
          </h1>
        </motion.div>

        <div className="flex gap-3 mb-10 flex-wrap">
          {categorias.map(cat => (
            <button key={cat} onClick={() => setFiltro(cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filtro === cat ? 'bg-[#5B8C7A] text-white' : 'bg-white text-[#6B5B3E] hover:bg-[#5B8C7A] hover:text-white'}`}>
              {cat}
            </button>
          ))}
        </div>

        {carregando ? (
          <div className="flex justify-center items-center py-20">
            <Loader className="animate-spin text-[#5B8C7A]" size={32} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {peixesFiltrados.map((peixe, i) => (
              <motion.div key={peixe.id} className="bg-white rounded-xl overflow-hidden hover:-translate-y-1 transition-transform duration-300 shadow-sm hover:shadow-md" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }}>
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
                    <a href={"https://wa.me/5511971526750?text=Ola! Tenho interesse no " + peixe.nome} target="_blank" rel="noreferrer" className="bg-[#5B8C7A] text-white text-sm px-4 py-2 rounded flex items-center gap-1 hover:bg-[#3D6B5A] transition-colors">
                      <MessageCircle size={14} /> Consultar
                    </a>
                  </div>
                </div>
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
