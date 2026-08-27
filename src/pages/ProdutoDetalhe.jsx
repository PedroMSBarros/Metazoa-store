import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, MessageCircle, ShoppingCart, Minus, Plus, XCircle } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { supabase } from '../lib/supabase'
import { useCart } from '../components/CartContext'

function ProdutoDetalhe() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [produto, setProduto] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [adicionado, setAdicionado] = useState(false)
  const [quantidade, setQuantidade] = useState(1)
  const { adicionarItem } = useCart()

  useEffect(() => {
    async function buscarProduto() {
      const { data, error } = await supabase.from('produtos').select('*').eq('id', id).single()
      if (!error) setProduto(data)
      setCarregando(false)
    }
    buscarProduto()
  }, [id])

  function handleAdicionarCarrinho() {
    adicionarItem({ ...produto, _tipo: 'produto' }, quantidade)
    setAdicionado(true)
    setQuantidade(1)
    setTimeout(() => setAdicionado(false), 2000)
  }

  if (carregando) {
    return (
      <div className="min-h-screen bg-[#F4F1E1] flex items-center justify-center">
        <div className="text-[#5B8C7A] text-lg font-serif">Carregando...</div>
      </div>
    )
  }

  if (!produto) {
    return (
      <div className="min-h-screen bg-[#F4F1E1] flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">📦</div>
          <p className="text-[#7A6A52]">Produto não encontrado.</p>
          <button onClick={() => navigate('/catalogo')} className="mt-4 text-[#5B8C7A] underline">Voltar ao catálogo</button>
        </div>
      </div>
    )
  }

  const indisponivel = produto.disponivel === false

  const msgWhatsApp = indisponivel
    ? "Olá! Gostaria de saber sobre a disponibilidade futura do produto: " + produto.nome + "."
    : "Olá! Vim pelo site e tenho interesse no produto: " + produto.nome + " (" + produto.preco + "). Poderia me passar mais informações?"

  return (
    <div className="bg-[#F4F1E1] min-h-screen">
      <Header />
      <div className="pt-24 pb-20 px-6 max-w-6xl mx-auto">

        <motion.button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#7A6A52] hover:text-[#5B8C7A] transition-colors mb-8 text-sm" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <ArrowLeft size={16} /> Voltar
        </motion.button>

        <div className="grid md:grid-cols-2 gap-12 items-start">

          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="relative rounded-2xl overflow-hidden aspect-square bg-[#E8E3CC]">
              <img src={produto.imagem_url} alt={produto.nome} className={`w-full h-full object-cover ${indisponivel ? 'grayscale' : ''}`} />
              {indisponivel ? (
                <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-medium px-3 py-1 rounded-full">Indisponível</span>
              ) : produto.badge ? (
                <span className="absolute top-4 left-4 bg-[#5B8C7A] text-white text-xs font-medium px-3 py-1 rounded-full">{produto.badge}</span>
              ) : null}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-xs font-medium tracking-widest uppercase text-[#9C8A6A] block mb-2">{produto.categoria}</span>
            <h1 className="font-serif text-4xl font-light text-[#2C2416] mb-4">{produto.nome}</h1>

            {produto.descricao && (
              <p className="text-[#7A6A52] leading-relaxed mb-6">{produto.descricao}</p>
            )}

            <div className="border-t border-b border-[#D9D2B0] py-6 mb-6">
              <span className={`font-serif text-5xl font-semibold ${indisponivel ? 'text-[#9C8A6A] line-through' : 'text-[#6B5B3E]'}`}>{produto.preco}</span>
            </div>

            {indisponivel && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
                <XCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="text-red-800 font-medium text-sm">Produto indisponível no momento</p>
                  <p className="text-red-600 text-xs mt-1">Consulte pelo WhatsApp para saber sobre disponibilidade futura.</p>
                </div>
              </div>
            )}

            {!indisponivel && (
              <div className="flex items-center gap-4 mb-4">
                <span className="text-sm text-[#7A6A52] font-medium">Quantidade</span>
                <div className="flex items-center gap-3 bg-white border border-[#D9D2B0] rounded-full px-2 py-1">
                  <button
                    onClick={() => setQuantidade(q => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#6B5B3E] hover:bg-[#F4F1E1] transition-colors"
                    aria-label="Diminuir quantidade"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-base font-medium text-[#2C2416] w-6 text-center">{quantidade}</span>
                  <button
                    onClick={() => setQuantidade(q => q + 1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#6B5B3E] hover:bg-[#F4F1E1] transition-colors"
                    aria-label="Aumentar quantidade"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3">
              {!indisponivel && (
                <button onClick={handleAdicionarCarrinho} className={`px-6 py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors ${adicionado ? 'bg-[#4A8C1C] text-white' : 'bg-[#6B5B3E] text-white hover:bg-[#2C2416]'}`}>
                  <ShoppingCart size={20} />
                  {adicionado ? '✓ Adicionado ao carrinho!' : `Adicionar ${quantidade > 1 ? quantidade + ' ao carrinho' : 'ao carrinho'}`}
                </button>
              )}
              <a href={"https://wa.me/5511971526750?text=" + encodeURIComponent(msgWhatsApp)} target="_blank" rel="noreferrer" className={indisponivel ? "bg-[#6B5B3E] text-white px-6 py-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-[#2C2416] transition-colors" : "border border-[#9C8A6A] text-[#6B5B3E] px-6 py-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-[#6B5B3E] hover:text-white transition-colors"}>
                <MessageCircle size={20} /> {indisponivel ? 'Consultar disponibilidade' : 'Consultar pelo WhatsApp'}
              </a>
            </div>

            <p className="text-xs text-[#7A6A52] mt-4 text-center">Entrega para todo o Brasil. Frete calculado no atendimento.</p>
          </motion.div>

        </div>

      </div>
      <Footer />
    </div>
  )
}

export default ProdutoDetalhe
