import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Loader } from 'lucide-react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function Destaques() {
  const [peixes, setPeixes] = useState([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    async function buscarPeixes() {
      const { data, error } = await supabase.from('peixes').select('*').limit(6)
      if (!error) setPeixes(data)
      setCarregando(false)
    }
    buscarPeixes()
  }, [])

  return (
    <section id="destaques" className="py-20 px-6 bg-[#F4F1E1]">
      <div className="max-w-6xl mx-auto">

        <motion.div className="flex justify-between items-end mb-12 flex-wrap gap-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div>
            <span className="text-[#5B8C7A] text-sm font-medium tracking-widest uppercase flex items-center gap-2">
              <span className="w-7 h-px bg-[#5B8C7A]"></span>
              Catalogo
            </span>
            <h2 className="font-serif text-4xl font-light mt-2 text-[#2C2416]">
              Peixes em <span className="text-[#5B8C7A] italic">destaque</span>
            </h2>
          </div>
          <Link to="/catalogo" className="text-[#5B8C7A] text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
            Ver catalogo completo
          </Link>
        </motion.div>

        {carregando ? (
          <div className="flex justify-center items-center py-20">
            <Loader className="animate-spin text-[#5B8C7A]" size={32} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {peixes.map((peixe, i) => (
              <motion.div key={peixe.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
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
    </section>
  )
}

export default Destaques
