import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-[#2C1A0E] text-[#C8D4A0]/60">

      <section id="contato" className="py-20 px-6 text-center bg-gradient-to-br from-[#1A3028] to-[#0D1F1A]">
        <span className="text-white/50 text-sm font-medium tracking-widest uppercase flex items-center gap-2 justify-center mb-4">
          <span className="w-7 h-px bg-white/40"></span>
          Contato
          <span className="w-7 h-px bg-white/40"></span>
        </span>
        <h2 className="font-serif text-4xl font-light text-white mb-3">
          Pronto para <span className="italic text-[#4A8C1C]">comecar?</span>
        </h2>
        <p className="text-white/60 max-w-md mx-auto mb-8">Entre em contato pelo WhatsApp e tire todas as suas duvidas. Atendemos de segunda a sabado.</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a href="https://wa.me/5511999999999?text=Ola! Vim pelo site e gostaria de saber mais sobre os peixes." target="_blank" rel="noreferrer" className="bg-[#25D366] text-white px-6 py-3 rounded text-sm font-medium flex items-center gap-2 hover:bg-[#1ebe5d] transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.564 4.136 1.544 5.868L0 24l6.335-1.521A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.886 0-3.66-.491-5.2-1.352l-.371-.22-3.863.927.974-3.765-.242-.387A9.937 9.937 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
            Falar pelo WhatsApp
          </a>
          <a href="https://instagram.com/metazoa.store" target="_blank" rel="noreferrer" className="border border-white/30 text-white px-6 py-3 rounded text-sm font-medium flex items-center gap-2 hover:border-white hover:bg-white/5 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            Instagram
          </a>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Link to="/" className="flex items-center gap-3 mb-3">
            <img src="https://i.postimg.cc/Kk3XcgDg/image.png" alt="Metazoa Store" className="h-10 w-10 rounded-full object-cover" />
            <span className="font-serif text-lg text-[#C8D4A0]">metazoa <span className="text-[#4A8C1C] font-bold">STORE</span></span>
          </Link>
          <p className="text-sm leading-relaxed max-w-xs">Especialistas em aquarismo e vida animal. Peixes ornamentais, plantas aquaticas e acessorios.</p>
        </div>

        <div>
          <h4 className="text-xs font-medium tracking-widest uppercase text-[#C8D4A0] mb-4">Navegacao</h4>
          <ul className="flex flex-col gap-2">
            <li><Link to="/" className="text-sm hover:text-[#4A8C1C] transition-colors">Inicio</Link></li>
            <li><a href="#categorias" className="text-sm hover:text-[#4A8C1C] transition-colors">Categorias</a></li>
            <li><Link to="/catalogo" className="text-sm hover:text-[#4A8C1C] transition-colors">Peixes</Link></li>
            <li><Link to="/sobre" className="text-sm hover:text-[#4A8C1C] transition-colors">Sobre nos</Link></li>
            <li><a href="#cuidados" className="text-sm hover:text-[#4A8C1C] transition-colors">Cuidados</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-medium tracking-widest uppercase text-[#C8D4A0] mb-4">Categorias</h4>
          <ul className="flex flex-col gap-2">
            <li><Link to="/catalogo" className="text-sm hover:text-[#4A8C1C] transition-colors">Agua Doce</Link></li>
            <li><Link to="/catalogo" className="text-sm hover:text-[#4A8C1C] transition-colors">Marinhos</Link></li>
            <li><Link to="/catalogo" className="text-sm hover:text-[#4A8C1C] transition-colors">Plantas</Link></li>
            <li><Link to="/catalogo" className="text-sm hover:text-[#4A8C1C] transition-colors">Acessorios</Link></li>
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
