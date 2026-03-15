import { Fish } from 'lucide-react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-[#2C2416] text-[#F4F1E1]/60">

      <section id="contato" className="py-20 px-6 text-center bg-gradient-to-br from-[#2C4A3E] to-[#1A3028]">
        <span className="text-white/50 text-sm font-medium tracking-widest uppercase flex items-center gap-2 justify-center mb-4">
          <span className="w-7 h-px bg-white/40"></span>
          Contato
          <span className="w-7 h-px bg-white/40"></span>
        </span>
        <h2 className="font-serif text-4xl font-light text-white mb-3">
          Pronto para <span className="italic text-[#5B8C7A]">comecar?</span>
        </h2>
        <p className="text-white/60 max-w-md mx-auto mb-8">Entre em contato pelo WhatsApp e tire todas as suas duvidas. Atendemos de segunda a sabado.</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a href="https://wa.me/5511999999999?text=Ola! Vim pelo site e gostaria de saber mais sobre os peixes." target="_blank" rel="noreferrer" className="bg-[#25D366] text-white px-6 py-3 rounded text-sm font-medium flex items-center gap-2 hover:bg-[#1ebe5d] transition-colors">
            💬 Falar pelo WhatsApp
          </a>
          <a href="https://instagram.com/metazoa.store" target="_blank" rel="noreferrer" className="border border-white/30 text-white px-6 py-3 rounded text-sm font-medium flex items-center gap-2 hover:border-white hover:bg-white/5 transition-colors">
            📷 Instagram
          </a>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Fish className="text-[#5B8C7A]" size={20} />
            <span className="font-serif text-lg text-[#F4F1E1]">Metazoa <span className="text-[#5B8C7A] italic">Store</span></span>
          </div>
          <p className="text-sm leading-relaxed max-w-xs">Especialistas em aquarismo e vida animal. Peixes ornamentais, plantas aquaticas e acessorios.</p>
        </div>

        <div>
          <h4 className="text-xs font-medium tracking-widest uppercase text-[#F4F1E1] mb-4">Navegacao</h4>
          <ul className="flex flex-col gap-2">
            <li><Link to="/" className="text-sm hover:text-[#5B8C7A] transition-colors">Inicio</Link></li>
            <li><a href="#categorias" className="text-sm hover:text-[#5B8C7A] transition-colors">Categorias</a></li>
            <li><a href="#destaques" className="text-sm hover:text-[#5B8C7A] transition-colors">Peixes</a></li>
            <li><a href="#sobre" className="text-sm hover:text-[#5B8C7A] transition-colors">Sobre nos</a></li>
            <li><a href="#cuidados" className="text-sm hover:text-[#5B8C7A] transition-colors">Cuidados</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-medium tracking-widest uppercase text-[#F4F1E1] mb-4">Categorias</h4>
          <ul className="flex flex-col gap-2">
            <li><a href="#categorias" className="text-sm hover:text-[#5B8C7A] transition-colors">Agua Doce</a></li>
            <li><a href="#categorias" className="text-sm hover:text-[#5B8C7A] transition-colors">Marinhos</a></li>
            <li><a href="#categorias" className="text-sm hover:text-[#5B8C7A] transition-colors">Plantas</a></li>
            <li><a href="#categorias" className="text-sm hover:text-[#5B8C7A] transition-colors">Acessorios</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-4 max-w-6xl mx-auto flex justify-between flex-wrap gap-2 text-xs">
        <span>2025 Metazoa Store. Todos os direitos reservados.</span>
        <span>Feito com 🐠 para amantes de aquarismo</span>
      </div>
    </footer>
  )
}

export default Footer
