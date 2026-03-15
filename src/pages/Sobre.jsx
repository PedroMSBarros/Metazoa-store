import { motion } from 'framer-motion'
import Header from '../components/Header'
import Footer from '../components/Footer'

const valores = [
  { icon: '🐠', titulo: 'Animais saudaveis', desc: 'Todos os peixes passam por quarentena antes de serem vendidos.' },
  { icon: '📦', titulo: 'Envio seguro', desc: 'Embalagem especializada para garantir o transporte com seguranca.' },
  { icon: '💬', titulo: 'Suporte ativo', desc: 'Atendimento rapido e personalizado pelo WhatsApp.' },
  { icon: '🌿', titulo: 'Sustentavel', desc: 'Trabalhamos com especies criadas em cativeiro.' },
]

function Sobre() {
  return (
    <div className="bg-[#F4F1E1] min-h-screen">
      <Header />

      <div className="pt-24 pb-20 px-6 max-w-6xl mx-auto">

        <motion.div className="mb-16 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="text-[#5B8C7A] text-sm font-medium tracking-widest uppercase flex items-center gap-2 justify-center">
            <span className="w-7 h-px bg-[#5B8C7A]"></span>
            Nossa historia
            <span className="w-7 h-px bg-[#5B8C7A]"></span>
          </span>
          <h1 className="font-serif text-5xl font-light mt-3 text-[#2C2416]">
            Paixao por <span className="text-[#5B8C7A] italic">aquarismo</span>
          </h1>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-[#7A6A52] leading-relaxed text-lg mb-4">
              A Metazoa Store nasceu de uma paixao genuina pelo mundo aquatico. Somos especialistas em aquarismo ornamental, oferecendo peixes saudaveis, plantas vigorosas e todo o suporte necessario para que o seu aquario floresça.
            </p>
            <p className="text-[#7A6A52] leading-relaxed mb-4">
              Trabalhamos com fornecedores cuidadosamente selecionados e garantimos que cada animal seja enviado com maximo cuidado e seguranca ate a sua casa.
            </p>
            <p className="text-[#7A6A52] leading-relaxed">
              Nossa missao e tornar o aquarismo acessivel e prazeroso para todos, desde iniciantes ate aquaristas experientes.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <img src="https://images.unsplash.com/photo-1559181567-c3190bfbdf2e?w=600&q=80" alt="Aquario Metazoa" className="w-full aspect-[4/3] object-cover rounded-xl" />
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
          <h2 className="font-serif text-3xl font-light text-[#2C2416] mb-8 text-center">Nossos <span className="text-[#5B8C7A] italic">valores</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {valores.map((v, i) => (
              <motion.div key={v.titulo} className="bg-white rounded-xl p-6 text-center hover:-translate-y-1 transition-transform duration-300" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <span className="text-3xl block mb-3">{v.icon}</span>
                <div className="font-medium text-[#2C2416] mb-2">{v.titulo}</div>
                <p className="text-sm text-[#7A6A52] leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>

      <Footer />
    </div>
  )
}

export default Sobre
