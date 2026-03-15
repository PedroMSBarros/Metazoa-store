import { Link } from 'react-router-dom'
import { Fish, Menu, X } from 'lucide-react'
import { useState } from 'react'

function Header() {
  const [menuAberto, setMenuAberto] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#F4F1E1]/90 backdrop-blur-md border-b border-[#D9D2B0]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        <Link to="/" className="flex items-center gap-2">
          <Fish className="text-[#5B8C7A]" size={22} />
          <span className="font-serif text-xl font-semibold text-[#6B5B3E]">
            Metazoa <span className="text-[#5B8C7A] italic">Store</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm text-[#7A6A52] hover:text-[#5B8C7A] transition-colors">Início</Link>
          <Link to="/catalogo" className="text-sm text-[#7A6A52] hover:text-[#5B8C7A] transition-colors">Catálogo</Link>
          <Link to="/sobre" className="text-sm text-[#7A6A52] hover:text-[#5B8C7A] transition-colors">Sobre</Link>
          <a href="https://wa.me/5511971526750" target="_blank" rel="noreferrer" className="bg-[#5B8C7A] text-white text-sm px-4 py-2 rounded-full hover:bg-[#3D6B5A] transition-colors">
            WhatsApp
          </a>
        </nav>

        <button className="md:hidden text-[#6B5B3E]" onClick={() => setMenuAberto(!menuAberto)}>
          {menuAberto ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuAberto && (
        <div className="md:hidden bg-[#FEFCF5] border-t border-[#D9D2B0] px-6 py-4 flex flex-col gap-4">
          <Link to="/" onClick={() => setMenuAberto(false)} className="text-[#2C2416]">Início</Link>
          <Link to="/catalogo" onClick={() => setMenuAberto(false)} className="text-[#2C2416]">Catálogo</Link>
          <Link to="/sobre" onClick={() => setMenuAberto(false)} className="text-[#2C2416]">Sobre</Link>
          <a href="https://wa.me/5511971526750" target="_blank" rel="noreferrer" className="text-[#5B8C7A] font-semibold">
            WhatsApp
          </a>
        </div>
      )}
    </header>
  )
}

export default Header