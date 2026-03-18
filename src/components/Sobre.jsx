import { motion } from 'framer-motion'

const valores = [
  { icon: '🐠', titulo: 'Animais saudáveis', desc: 'Todos os peixes passam por quarentena' },
  { icon: '📦', titulo: 'Envio seguro', desc: 'Embalagem especializada para transporte' },
  { icon: '💬', titulo: 'Suporte ativo', desc: 'Atendimento rápido pelo WhatsApp' },
  { icon: '🌿', titulo: 'Sustentável', desc: 'Espécies criadas em cativeiro' },
]

function Sobre() {
  return (
    <section id="sobre" className="py-20 px-6 bg-[#E8E3CC]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="text-[#5B8C7A] text-sm font-medium tracking-widest uppercase flex items-center gap-2">
            <span className="w-7 h-px bg-[#5B8C7A]"></span>
            Nossa história
          </span>
          <h2 className="font-serif text-4xl font-light mt-2 text-[#2C2416]">
            Paixão por <span className="text-[#5B8C7A] italic">aquarismo</span>
          </h2>
          <p className="text-[#7A6A52] mt-4 leading-relaxed">
            A Metazoa Store nasceu de uma paixão genuína pelo mundo aquático. Somos especialistas em aquarismo ornamental, oferecendo peixes saudáveis, plantas vigorosas e todo o suporte necessário para que o seu aquário floresça.
          </p>
          <p className="text-[#7A6A52] mt-3 leading-relaxed">
            Trabalhamos com fornecedores cuidadosamente selecionados e garantimos que cada animal seja enviado com máximo cuidado e segurança até a sua casa.
          </p>

          <div className="grid grid-cols-2 gap-3 mt-8">
            {valores.map((v) => (
              <div key={v.titulo} className="bg-white rounded-lg p-4">
                <span className="text-2xl block mb-2">{v.icon}</span>
                <div className="text-sm font-medium text-[#2C2416]">{v.titulo}</div>
                <div className="text-xs text-[#7A6A52] mt-1">{v.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="hidden md:block relative" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <img src="https://i.postimg.cc/K8zrgg66/Whats-App-Image-2026-03-15-at-14-24-49.jpg" alt="Aquário Metazoa" className="w-full aspect-[4/5] object-cover rounded-xl" />
          <div className="absolute -top-4 -left-4 w-16 h-16 border-2 border-[#5B8C7A] rounded opacity-40"></div>
        </motion.div>

      </div>
    </section>
  )
}

export default Sobre
