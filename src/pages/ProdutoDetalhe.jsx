import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, MessageCircle, ShoppingCart } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { supabase } from '../lib/supabase'

function ProdutoDetalhe() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [produto, setProduto] = useState(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    async function buscarProduto() {
      const { data, error } = await supabase.from('produtos').select('*').eq('id', id).single()
      if (!error) setProduto(data)
      setCarregando(false)
    }
    buscarProduto()
  }, [id])

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
          <p className="text-[#7A6A52]">Produto nao encontrado.</p>
          <button onClick={() => navigate('/catalogo')} className="mt-4 text-[#5B8C7A] underline">Voltar ao catalogo</button>
        </div>
      </div>
    )
  }

  const msgWhatsApp = "Ola! Vim pelo site e tenho interesse no produto: " + produto.nome + " (" + produto.preco + "). Poderia me passar mais informacoes?"

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
              <img src={produto.imagem_url} alt={produto.nome} className="w-full h-full object-cover" />
              {produto.badge && (
                <span className="absolute top-4 left-4 bg-[#5B8C7A] text-white text-xs font-medium px-3 py-1 rounded-full">{produto.badge}</span>
              )}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-xs font-medium tracking-widest uppercase text-[#9C8A6A] block mb-2">{produto.categoria}</span>
            <h1 className="font-serif text-4xl font-light text-[#2C2416] mb-4">{produto.nome}</h1>

            {produto.descricao && (
              <p className="text-[#7A6A52] leading-relaxed mb-6">{produto.descricao}</p>
            )}

            <div className="border-t border-b border-[#D9D2B0] py-6 mb-6">
              <span className="font-serif text-5xl font-semibold text-[#6B5B3E]">{produto.preco}</span>
            </div>

            <div className="flex flex-col gap-3">
              <a href={"https://wa.me/5511971526750?text=" + encodeURIComponent(msgWhatsApp)} target="_blank" rel="noreferrer" className="bg-[#25D366] text-white px-6 py-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-[#1ebe5d] transition-colors">
                <MessageCircle size={20} /> Comprar pelo WhatsApp
              </a>
              <a href={"https://wa.me/5511971526750?text=" + encodeURIComponent("Ola! Tenho interesse no produto " + produto.nome + " e gostaria de mais informacoes.")} target="_blank" rel="noreferrer" className="border border-[#9C8A6A] text-[#6B5B3E] px-6 py-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-[#6B5B3E] hover:text-white transition-colors">
                <ShoppingCart size={20} /> Adicionar ao pedido
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
