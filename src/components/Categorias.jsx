import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const categorias = [
  {
    icon: '🐟',
    nome: 'Agua Doce',
    quantidade: '80+ especies',
    filtro: 'Agua Doce',
    video: 'https://streamable.com/e/975ha7',
    img: 'https://i.postimg.cc/jjrG917Y/doce.png'
  },
  {
    icon: '🐡',
    nome: 'Marinhos',
    quantidade: '40+ especies',
    filtro: 'Marinho',
    video: 'https://streamable.com/e/xpiddv',
    img: 'https://i.postimg.cc/bJmWZNVx/marin.png'
  },
  {
    icon: '🌿',
    nome: 'Plantas Aquaticas',
    quantidade: '30+ variedades',
    filtro: 'Plantas',
    video: 'https://streamable.com/e/fjs3jl',
    img: 'https://i.postimg.cc/HWPFHny7/plantas.png'
  },
  {
    icon: '⚙️',
    nome: 'Acessorios',
    quantidade: 'Filtros, luzes e mais',
    filtro: 'Acessorios',
    video: 'https://streamable.com/e/teo88g',
    img: 'https://i.postimg.cc/hvwY0ZB9/equip.png'
  },
]

function Categorias() {
  return (
    <section id="categorias" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">

        <motion.div className="mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="text-[#5B8C7A] text-sm font-medium tracking-widest uppercase flex items-center gap-2">
            <span className="w-7 h-px bg-[#5B8C7A]"></span>
            Explore
          </span>
          <h2 className="font-serif text-4xl font-light mt-2 text-[#2C2416]">
            Nossas <span className="text-[#5B8C7A] italic">categorias</span>
          </h2>
          <p className="text-[#7A6A52] mt-2 max-w-md">Do doce ao salgado, temos tudo que o seu aquario precisa.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categorias.map((cat, i) => (
            <motion.div key={cat.nome} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <Link to={"/catalogo?categoria=" + cat.filtro} className="relative rounded-xl overflow-hidden block group cursor-pointer">
                <div className="relative aspect-[3/4] bg-[#1A1A1A] overflow-hidden rounded-xl">

                  {/* Imagem para celular */}
                  <img src={cat.img} alt={cat.nome} className="absolute inset-0 w-full h-full object-cover md:hidden" />

                  {/* Video para desktop */}
                  <iframe
                    src={cat.video + "?autoplay=1&muted=1&loop=1&controls=0&nocontrols=1"}
                    className="absolute inset-0 w-full h-full scale-[1.5] pointer-events-none hidden md:block"
                    frameBorder="0"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    title={cat.nome}
                  ></iframe>

                  <div className="absolute inset-0 bg-gradient-to-t from-[#14231e]/90 via-[#14231e]/10 to-transparent rounded-xl group-hover:from-[#14231e]/95 transition-all duration-300"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <span className="text-2xl block mb-1">{cat.icon}</span>
                  <span className="font-serif text-lg block">{cat.nome}</span>
                  <span className="text-xs opacity-70">{cat.quantidade}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Categorias
