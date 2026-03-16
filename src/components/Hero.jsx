import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="min-h-screen bg-[#2C1A0E] flex items-center pt-16 relative overflow-hidden">

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-[#C8D4A0]/5 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-[#4A8C1C]/8 blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center py-20 relative z-10">

        <div>
          <motion.span className="text-[#4A8C1C] text-sm font-medium tracking-widest uppercase flex items-center gap-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <span className="w-7 h-px bg-[#4A8C1C]"></span>
            Aquarismo e Vida Animal
          </motion.span>

          <motion.h1 className="font-serif text-5xl md:text-6xl font-light leading-tight mt-4 text-[#C8D4A0]" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            Vida que <span className="text-[#4A8C1C] italic">flutua</span>, beleza que <span className="text-[#4A8C1C] italic">encanta</span>
          </motion.h1>

          <motion.p className="text-[#C8D4A0]/60 mt-6 text-base leading-relaxed max-w-md" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            Peixes ornamentais de agua doce e marinhos, plantas aquaticas e acessorios selecionados com cuidado para o seu aquario.
          </motion.p>

          <motion.div className="flex gap-4 mt-8 flex-wrap" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            <Link to="/catalogo" className="bg-[#4A8C1C] text-white px-6 py-3 rounded text-sm font-medium flex items-center gap-2 hover:bg-[#3A6E14] transition-colors">
              Ver catalogo <ArrowRight size={16} />
            </Link>
            <a href="https://wa.me/5511971526750" target="_blank" rel="noreferrer" className="border border-[#C8D4A0]/30 text-[#C8D4A0] px-6 py-3 rounded text-sm font-medium flex items-center gap-2 hover:bg-[#C8D4A0]/10 transition-colors">
              <MessageCircle size={16} /> Falar conosco
            </a>
          </motion.div>

          <motion.div className="flex gap-8 mt-12 pt-8 border-t border-[#C8D4A0]/10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}>
            <div>
              <span className="font-serif text-3xl font-semibold text-[#C8D4A0] block">150+</span>
              <span className="text-xs text-[#C8D4A0]/50">Especies disponiveis</span>
            </div>
            <div>
              <span className="font-serif text-3xl font-semibold text-[#C8D4A0] block">100%</span>
              <span className="text-xs text-[#C8D4A0]/50">Entrega online</span>
            </div>
            <div>
              <span className="font-serif text-3xl font-semibold text-[#C8D4A0] block">5 estrelas</span>
              <span className="text-xs text-[#C8D4A0]/50">Avaliacoes</span>
            </div>
          </motion.div>
        </div>

        <motion.div className="hidden md:flex items-center justify-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}>
          <div className="relative">
            <div className="w-80 h-80 rounded-full bg-[#C8D4A0] flex items-center justify-center relative overflow-hidden shadow-2xl">
              <img src="https://i.postimg.cc/Kk3XcgDg/image.png" alt="Metazoa Store" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-[#4A8C1C]/20 border border-[#4A8C1C]/30"></div>
            <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-[#C8D4A0]/10 border border-[#C8D4A0]/20"></div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default Hero
