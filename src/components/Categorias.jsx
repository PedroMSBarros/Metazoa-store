import { motion } from 'framer-motion'

const categorias = [
  { icon: '🐟', nome: 'Agua Doce', quantidade: '80+ especies', img: 'https://images.unsplash.com/photo-1571752726703-5e7d1f6a986d?w=600&q=80' },
  { icon: '🐡', nome: 'Marinhos', quantidade: '40+ especies', img: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=600&q=80' },
  { icon: '🌿', nome: 'Plantas Aquaticas', quantidade: '30+ variedades', img: 'https://images.unsplash.com/photo-1585858229735-cd08d8cb510d?w=600&q=80' },
  { icon: '⚙️', nome: 'Acessorios', quantidade: 'Filtros, luzes e mais', img: 'https://images.unsplash.com/photo-1590677197631-b9501d643de5?w=600&q=80' },
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
            <motion.a key={cat.nome} href="#destaques" className="relative rounded-xl overflow-hidden aspect-[3/4] block group cursor-pointer" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <img src={cat.img} alt={cat.nome} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14231e]/85 via-[#14231e]/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <span className="text-2xl block mb-1">{cat.icon}</span>
                <span className="font-serif text-lg block">{cat.nome}</span>
                <span className="text-xs opacity-70">{cat.quantidade}</span>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Categorias
