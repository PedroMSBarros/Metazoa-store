import { motion } from 'framer-motion'
import Header from '../components/Header'
import Footer from '../components/Footer'

const dicas = [
  { num: '01', icon: '🌡️', titulo: 'Temperatura da água', texto: 'Mantenha a temperatura estável entre 24 e 28°C para peixes tropicais. Variações bruscas causam estresse e doenças.' },
  { num: '02', icon: '💧', titulo: 'Qualidade da água', texto: 'Troque 20 a 30% da água semanalmente. Trate sempre com neutralizador de cloro antes de adicionar ao aquário.' },
  { num: '03', icon: '⚙️', titulo: 'Filtração eficiente', texto: 'Use um filtro adequado ao volume do aquário. A filtragem biológica é essencial para controlar amônia e nitritos.' },
  { num: '04', icon: '💡', titulo: 'Iluminação correta', texto: '8 a 10 horas de luz por dia para aquários plantados. Use timer para manter a rotina e evitar o crescimento de algas.' },
  { num: '05', icon: '🍽️', titulo: 'Alimentação adequada', texto: 'Alimente 1 a 2 vezes ao dia com ração de qualidade. Ofereça somente o que os peixes consomem em 2 a 3 minutos.' },
  { num: '06', icon: '🏠', titulo: 'Aclimatação', texto: 'Ao receber novos peixes, aclimate-os por 30 a 45 minutos flutuando a embalagem no aquário antes de soltá-los.' },
  { num: '07', icon: '🧪', titulo: 'Teste da água', texto: 'Teste regularmente os parâmetros da água: pH, amônia, nitrito e nitrato. Kits de teste são baratos e essenciais.' },
  { num: '08', icon: '🪸', titulo: 'Decoração', texto: 'Use substrato e decoração adequados para cada espécie. Alguns peixes precisam de esconderijos para se sentir seguros.' },
  { num: '09', icon: '🩺', titulo: 'Saúde dos peixes', texto: 'Observe seus peixes diariamente. Comportamento estranho, manchas ou nadadeiras danificadas podem indicar doenças.' },
]

function Cuidados() {
  return (
    <div className="bg-[#F4F1E1] min-h-screen">
      <Header />
      <div className="pt-24 pb-20 px-6 max-w-6xl mx-auto">

        <motion.div className="mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="text-[#5B8C7A] text-sm font-medium tracking-widest uppercase flex items-center gap-2">
            <span className="w-7 h-px bg-[#5B8C7A]"></span>
            Guia completo
          </span>
          <h1 className="font-serif text-5xl font-light mt-2 text-[#2C2416]">
            Cuidados <span className="text-[#5B8C7A] italic">essenciais</span>
          </h1>
          <p className="text-[#7A6A52] mt-3 max-w-xl">Tudo que você precisa saber para manter seu aquário saudável e seus peixes felizes por muito tempo.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {dicas.map((dica, i) => (
            <motion.div key={dica.num} className="bg-white border border-[#D9D2B0] rounded-xl p-6 hover:border-[#5B8C7A] hover:-translate-y-1 transition-all duration-300" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.07 }}>
              <span className="font-serif text-4xl font-light text-[#D9D2B0] block mb-2">{dica.num}</span>
              <span className="text-2xl block mb-3">{dica.icon}</span>
              <div className="text-sm font-medium text-[#2C2416] mb-2">{dica.titulo}</div>
              <p className="text-sm text-[#7A6A52] leading-relaxed">{dica.texto}</p>
            </motion.div>
          ))}
        </div>

        <motion.div className="mt-16 bg-[#2C1A0E] rounded-2xl p-8 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
          <h2 className="font-serif text-3xl font-light text-[#C8D4A0] mb-3">Ainda tem dúvidas?</h2>
          <p className="text-[#C8D4A0]/60 mb-6">Nossa equipe está pronta para te ajudar pelo WhatsApp!</p>
          <a href="https://wa.me/5511971526750?text=Olá! Tenho dúvidas sobre cuidados com meu aquário." target="_blank" rel="noreferrer" className="bg-[#25D366] text-white px-8 py-3 rounded-full font-medium inline-flex items-center gap-2 hover:bg-[#1ebe5d] transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.564 4.136 1.544 5.868L0 24l6.335-1.521A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.886 0-3.66-.491-5.2-1.352l-.371-.22-3.863.927.974-3.765-.242-.387A9.937 9.937 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
            Falar com especialista
          </a>
        </motion.div>

      </div>
      <Footer />
    </div>
  )
}

export default Cuidados
