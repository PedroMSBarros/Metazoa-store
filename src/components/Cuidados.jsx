import { motion } from 'framer-motion'

const dicas = [
  { num: '01', icon: '🌡️', titulo: 'Temperatura da agua', texto: 'Mantenha a temperatura estavel entre 24 e 28 graus para peixes tropicais. Variacoes bruscas causam estresse e doencas.' },
  { num: '02', icon: '💧', titulo: 'Qualidade da agua', texto: 'Troque 20 a 30% da agua semanalmente. Trate sempre com neutralizador de cloro antes de adicionar ao aquario.' },
  { num: '03', icon: '⚙️', titulo: 'Filtracao eficiente', texto: 'Use um filtro adequado ao volume do aquario. A filtragem biologica e essencial para controlar amonia e nitritos.' },
  { num: '04', icon: '💡', titulo: 'Iluminacao correta', texto: '8 a 10 horas de luz por dia para aquarios plantados. Use timer para manter a rotina e evitar o crescimento de algas.' },
  { num: '05', icon: '🍽️', titulo: 'Alimentacao adequada', texto: 'Alimente 1 a 2 vezes ao dia com racao de qualidade. Ofereça somente o que os peixes consomem em 2 a 3 minutos.' },
  { num: '06', icon: '🏠', titulo: 'Aclimatacao', texto: 'Ao receber novos peixes, aclimate-os por 30 a 45 minutos flutuando a embalagem no aquario antes de solta-los.' },
]

function Cuidados() {
  return (
    <section id="cuidados" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">

        <motion.div className="mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="text-[#5B8C7A] text-sm font-medium tracking-widest uppercase flex items-center gap-2">
            <span className="w-7 h-px bg-[#5B8C7A]"></span>
            Guia
          </span>
          <h2 className="font-serif text-4xl font-light mt-2 text-[#2C2416]">
            Cuidados <span className="text-[#5B8C7A] italic">essenciais</span>
          </h2>
          <p className="text-[#7A6A52] mt-2 max-w-md">Dicas para manter seu aquario saudavel e seus peixes felizes.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {dicas.map((dica, i) => (
            <motion.div key={dica.num} className="border border-[#D9D2B0] rounded-xl p-6 hover:border-[#5B8C7A] hover:-translate-y-1 transition-all duration-300" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <span className="font-serif text-4xl font-light text-[#D9D2B0] block mb-2">{dica.num}</span>
              <span className="text-2xl block mb-3">{dica.icon}</span>
              <div className="text-sm font-medium text-[#2C2416] mb-2">{dica.titulo}</div>
              <p className="text-sm text-[#7A6A52] leading-relaxed">{dica.texto}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Cuidados
