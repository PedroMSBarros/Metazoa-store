import { Link } from 'react-router-dom'
import { Menu, X, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { useCart } from './CartContext'
import Carrinho from './Carrinho'

function Header() {
  const [menuAberto, setMenuAberto] = useState(false)
  const [carrinhoAberto, setCarrinhoAberto] = useState(false)
  const { totalItens } = useCart()

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#2C1A0E]/95 backdrop-blur-md border-b border-[#4A3020]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

          <Link to="/" className="flex items-center gap-3">
            <img src="https://i.postimg.cc/Kk3XcgDg/image.png" alt="Metazoa Store" className="h-10 w-10 rounded-full object-cover" />
            <span className="font-serif text-xl font-semibold text-[#C8D4A0]">
              metazoa <span className="text-[#4A8C1C] font-bold not-italic">STORE</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm text-[#C8D4A0]/70 hover:text-[#C8D4A0] transition-colors">Início</Link>
            <Link to="/catalogo" className="text-sm text-[#C8D4A0]/70 hover:text-[#C8D4A0] transition-colors">Catálogo</Link>
            <Link to="/sobre" className="text-sm text-[#C8D4A0]/70 hover:text-[#C8D4A0] transition-colors">Sobre</Link>
            <Link to="/cuidados" className="text-sm text-[#C8D4A0]/70 hover:text-[#C8D4A0] transition-colors">Cuidados</Link>
            <button onClick={() => setCarrinhoAberto(true)} className="relative text-[#C8D4A0] hover:text-white transition-colors">
              <ShoppingCart size={22} />
              {totalItens > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#4A8C1C] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItens}
                </span>
              )}
            </button>
            <a href="https://wa.me/5511971526750" target="_blank" rel="noreferrer" className="bg-[#4A8C1C] text-white text-sm px-4 py-2 rounded-full hover:bg-[#3A6E14] transition-colors font-medium">
              WhatsApp
            </a>
          </nav>

          <div className="flex items-center gap-4 md:hidden">
            <button onClick={() => setCarrinhoAberto(true)} className="relative text-[#C8D4A0]">
              <ShoppingCart size={22} />
              {totalItens > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#4A8C1C] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItens}
                </span>
              )}
            </button>
            <button className="text-[#C8D4A0]" onClick={() => setMenuAberto(!menuAberto)}>
              {menuAberto ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {menuAberto && (
          <div className="md:hidden bg-[#2C1A0E] border-t border-[#4A3020] px-6 py-4 flex flex-col gap-4">
            <Link to="/" onClick={() => setMenuAberto(false)} className="text-[#C8D4A0]">Início</Link>
            <Link to="/catalogo" onClick={() => setMenuAberto(false)} className="text-[#C8D4A0]">Catálogo</Link>
            <Link to="/sobre" onClick={() => setMenuAberto(false)} className="text-[#C8D4A0]">Sobre</Link>
            <Link to="/cuidados" onClick={() => setMenuAberto(false)} className="text-[#C8D4A0]">Cuidados</Link>
            <a href="https://wa.me/5511971526750" target="_blank" rel="noreferrer" className="text-[#4A8C1C] font-semibold">
              💬 WhatsApp
            </a>
          </div>
        )}
      </header>

      <Carrinho aberto={carrinhoAberto} fechar={() => setCarrinhoAberto(false)} />
    </>
  )
}

export default Header
