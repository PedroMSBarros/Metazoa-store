import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, ShoppingCart, Search, Loader } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useCart } from './CartContext'
import { useBuscaSugestoes } from '../lib/useBuscaSugestoes'
import Carrinho from './Carrinho'

function Header() {
  const [menuAberto, setMenuAberto] = useState(false)
  const [carrinhoAberto, setCarrinhoAberto] = useState(false)
  const [busca, setBusca] = useState('')
  const [buscaAberta, setBuscaAberta] = useState(false)
  const [sugestoesVisiveis, setSugestoesVisiveis] = useState(false)
  const { totalItens } = useCart()
  const navigate = useNavigate()
  const buscaRef = useRef(null)

  const { sugestoes, carregando } = useBuscaSugestoes(busca)

  useEffect(() => {
    function handleClickFora(e) {
      if (buscaRef.current && !buscaRef.current.contains(e.target)) {
        setSugestoesVisiveis(false)
      }
    }
    document.addEventListener('mousedown', handleClickFora)
    return () => document.removeEventListener('mousedown', handleClickFora)
  }, [])

  function handleBusca(e) {
    e.preventDefault()
    if (busca.trim()) {
      navigate('/catalogo?busca=' + encodeURIComponent(busca.trim()))
      setBusca('')
      setBuscaAberta(false)
      setSugestoesVisiveis(false)
    }
  }

  function irParaItem(item) {
    navigate('/' + item._tipo + '/' + item.id)
    setBusca('')
    setBuscaAberta(false)
    setSugestoesVisiveis(false)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#2C1A0E]/95 backdrop-blur-md border-b border-[#4A3020]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">

          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <img src="https://i.postimg.cc/Kk3XcgDg/image.png" alt="Metazoa Store" className="h-10 w-10 rounded-full object-cover" />
            <span className="font-serif text-xl font-semibold text-[#C8D4A0]">
              metazoa <span className="text-[#4A8C1C] font-bold not-italic">STORE</span>
            </span>
          </Link>

          {/* Barra de busca desktop */}
          <div ref={buscaRef} className="hidden md:block flex-1 max-w-sm relative">
            <form onSubmit={handleBusca} className="relative">
              <input
                type="text"
                value={busca}
                onChange={e => { setBusca(e.target.value); setSugestoesVisiveis(true) }}
                onFocus={() => setSugestoesVisiveis(true)}
                placeholder="Buscar peixe ou produto..."
                className="w-full bg-[#3A2510] border border-[#5A3A20] rounded-full px-4 py-2 pr-10 text-sm text-[#C8D4A0] placeholder-[#7A6A52] focus:outline-none focus:border-[#4A8C1C] transition-colors"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A6A52] hover:text-[#4A8C1C] transition-colors">
                <Search size={16} />
              </button>
            </form>

            {sugestoesVisiveis && busca.trim().length >= 2 && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl border border-[#D9D2B0] overflow-hidden z-50 max-h-[70vh] flex flex-col">
                {carregando ? (
                  <div className="p-4 flex justify-center">
                    <Loader className="animate-spin text-[#5B8C7A]" size={18} />
                  </div>
                ) : sugestoes.length === 0 ? (
                  <p className="p-4 text-sm text-[#7A6A52] text-center">Nenhum resultado para "{busca}"</p>
                ) : (
                  <>
                    <div className="overflow-y-auto">
                      {sugestoes.map(item => (
                        <button
                          key={item._tipo + item.id}
                          onClick={() => irParaItem(item)}
                          className="w-full flex items-center gap-3 p-3 hover:bg-[#F4F1E1] transition-colors text-left border-b border-[#F4F1E1] last:border-0"
                        >
                          <img src={item.imagem_url} alt={item.nome} className="w-10 h-10 rounded-lg object-cover bg-[#E8E3CC] flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-[#2C2416] truncate">{item.nome}</p>
                            <p className="text-xs text-[#9C8A6A]">{item.categoria}</p>
                          </div>
                          <span className="text-sm font-serif font-semibold text-[#6B5B3E] flex-shrink-0">{item.preco}</span>
                        </button>
                      ))}
                    </div>
                    <button onClick={handleBusca} className="w-full p-3 text-sm text-[#5B8C7A] font-medium hover:bg-[#F4F1E1] transition-colors text-center flex-shrink-0 border-t border-[#F4F1E1]">
                      Ver todos os resultados para "{busca}"
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          <nav className="hidden md:flex items-center gap-6">
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

          <div className="flex items-center gap-3 md:hidden">
            <button onClick={() => setBuscaAberta(!buscaAberta)} className="text-[#C8D4A0]">
              <Search size={20} />
            </button>
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

        {/* Busca mobile */}
        {buscaAberta && (
          <div className="md:hidden px-4 pb-3 bg-[#2C1A0E] relative">
            <form onSubmit={handleBusca} className="relative">
              <input
                type="text"
                value={busca}
                onChange={e => { setBusca(e.target.value); setSugestoesVisiveis(true) }}
                placeholder="Buscar peixe ou produto..."
                autoFocus
                className="w-full bg-[#3A2510] border border-[#5A3A20] rounded-full px-4 py-2 pr-10 text-sm text-[#C8D4A0] placeholder-[#7A6A52] focus:outline-none focus:border-[#4A8C1C] transition-colors"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A6A52] hover:text-[#4A8C1C] transition-colors">
                <Search size={16} />
              </button>
            </form>

            {sugestoesVisiveis && busca.trim().length >= 2 && (
              <div className="mt-2 bg-white rounded-xl shadow-xl border border-[#D9D2B0] overflow-y-auto max-h-[50vh]">
                {carregando ? (
                  <div className="p-4 flex justify-center">
                    <Loader className="animate-spin text-[#5B8C7A]" size={18} />
                  </div>
                ) : sugestoes.length === 0 ? (
                  <p className="p-4 text-sm text-[#7A6A52] text-center">Nenhum resultado para "{busca}"</p>
                ) : (
                  <>
                    {sugestoes.map(item => (
                      <button
                        key={item._tipo + item.id}
                        onClick={() => irParaItem(item)}
                        className="w-full flex items-center gap-3 p-3 hover:bg-[#F4F1E1] transition-colors text-left border-b border-[#F4F1E1] last:border-0"
                      >
                        <img src={item.imagem_url} alt={item.nome} className="w-10 h-10 rounded-lg object-cover bg-[#E8E3CC] flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-[#2C2416] truncate">{item.nome}</p>
                          <p className="text-xs text-[#9C8A6A]">{item.categoria}</p>
                        </div>
                        <span className="text-sm font-serif font-semibold text-[#6B5B3E] flex-shrink-0">{item.preco}</span>
                      </button>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {menuAberto && (
          <div className="md:hidden bg-[#2C1A0E] border-t border-[#4A3020] px-6 py-4 flex flex-col gap-4">
            <Link to="/" onClick={() => setMenuAberto(false)} className="text-[#C8D4A0]">Início</Link>
            <Link to="/catalogo" onClick={() => setMenuAberto(false)} className="text-[#C8D4A0]">Catálogo</Link>
            <Link to="/sobre" onClick={() => setMenuAberto(false)} className="text-[#C8D4A0]">Sobre</Link>
            <Link to="/cuidados" onClick={() => setMenuAberto(false)} className="text-[#C8D4A0]">Cuidados</Link>
            <a href="https://wa.me/5511971526750" target="_blank" rel="noreferrer" className="text-[#4A8C1C] font-semibold">
              WhatsApp
            </a>
          </div>
        )}
      </header>

      <Carrinho aberto={carrinhoAberto} fechar={() => setCarrinhoAberto(false)} />
    </>
  )
}

export default Header
