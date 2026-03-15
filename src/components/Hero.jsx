import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'

function Hero() {
  return (
    <section className="min-h-screen bg-[#F4F1E1] flex items-center pt-16">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center py-20">

        <div>
          <motion.span className="text-[#5B8C7A] text-sm font-medium tracking-widest uppercase flex items-center gap-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <span className="w-7 h-px bg-[#5B8C7A]"></span>
            Aquarismo e Vida Animal
          </motion.span>

          <motion.h1 className="font-serif text-5xl md:text-6xl font-light leading-tight mt-4 text-[#2C2416]" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            Vida que <span className="text-[#5B8C7A] italic">flutua</span>, beleza que <span className="text-[#5B8C7A] italic">encanta</span>
          </motion.h1>

          <motion.p className="text-[#7A6A52] mt-6 text-base leading-relaxed max-w-md" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            Peixes ornamentais de agua doce e marinhos, plantas aquaticas e acessorios selecionados com cuidado para o seu aquario.
          </motion.p>

          <motion.div className="flex gap-4 mt-8 flex-wrap" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            <a href="#catalogo" className="bg-[#6B5B3E] text-white px-6 py-3 rounded text-sm font-medium flex items-center gap-2 hover:bg-[#2C2416] transition-colors">
              Ver catalogo <ArrowRight size={16} />
            </a>
            <a href="https://wa.me/5511999999999" target="_blank" rel="noreferrer" className="border border-[#9C8A6A] text-[#6B5B3E] px-6 py-3 rounded text-sm font-medium flex items-center gap-2 hover:bg-[#6B5B3E] hover:text-white transition-colors">
              <MessageCircle size={16} /> Falar conosco
            </a>
          </motion.div>

          <motion.div className="flex gap-8 mt-12 pt-8 border-t border-[#D9D2B0]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}>
            <div>
              <span className="font-serif text-3xl font-semibold text-[#6B5B3E] block">150+</span>
              <span className="text-xs text-[#7A6A52]">Especies disponiveis</span>
            </div>
            <div>
              <span className="font-serif text-3xl font-semibold text-[#6B5B3E] block">100%</span>
              <span className="text-xs text-[#7A6A52]">Entrega online</span>
            </div>
            <div>
              <span className="font-serif text-3xl font-semibold text-[#6B5B3E] block">5 estrelas</span>
              <span className="text-xs text-[#7A6A52]">Avaliacoes</span>
            </div>
          </motion.div>
        </div>

        <motion.div className="hidden md:flex items-center justify-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}>
          <div className="bg-gradient-to-br from-[#2C4A3E] to-[#0D1F1A] rounded-2xl p-12 text-center text-white relative overflow-hidden w-full aspect-square max-w-sm">
            <div className="text-8xl mb-4">🐠</div>
            <h3 className="font-serif text-2xl font-light mb-2">Peixes ornamentais</h3>
            <p className="text-sm opacity-60">Especies raras e exoticas para o seu aquario</p>
            <div className="absolute top-8 left-8 w-4 h-4 rounded-full bg-white/10 border border-white/20"></div>
            <div className="absolute top-16 right-12 w-3 h-3 rounded-full bg-white/10 border border-white/20"></div>
            <div className="absolute bottom-16 left-10 w-5 h-5 rounded-full bg-white/10 border border-white/20"></div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default Hero
