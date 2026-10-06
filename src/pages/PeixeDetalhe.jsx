import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, MessageCircle, ShoppingCart, Thermometer, Droplets, Fish, Clock, XCircle, Minus, Plus, Ruler, Box, Users } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { supabase } from '../lib/supabase'
import { useCart } from '../components/CartContext'
import { otimizarImagem } from '../lib/imagem'
import { trackVisualizacaoPeixe, trackCliqueWhatsApp, trackAdicionarCarrinho } from '../lib/analytics'

function PeixeDetalhe() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [peixe, setPeixe] = useState(null)
  const [variantes, setVariantes] = useState([])
  const [selecionadoId, setSelecionadoId] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [adicionado, setAdicionado] = useState(false)
  const [quantidade, setQuantidade] = useState(1)
  const { adicionarItem } = useCart()

  // Avisa o layout que esta pagina tem a barra de compra fixa no celular
  // (os botoes flutuantes sobem para nao ficar em cima dela)
  useEffect(() => {
    document.body.classList.add('tem-barra-compra')
    return () => document.body.classList.remove('tem-barra-compra')
  }, [])

  useEffect(() => {
    async function buscarPeixe() {
      const { data, error } = await supabase.from('peixes').select('*').eq('id', id).single()
      if (!error) {
        setPeixe(data)
        setSelecionadoId(data.id)
        trackVisualizacaoPeixe(data)
        if (data.grupo_variante) {
          const { data: irmaos } = await supabase.from('peixes').select('*').eq('grupo_variante', data.grupo_variante).order('variante_ordem')
          if (irmaos) setVariantes([...irmaos].sort((a, b) => (a.variante_ordem || 0) - (b.variante_ordem || 0)))
        } else {
          setVariantes([])
        }
      }
      setCarregando(false)
    }
    buscarPeixe()
  }, [id])

  function handleAdicionarCarrinho() {
    adicionarItem({ ...selecionado, _tipo: 'peixe' }, quantidade)
    trackAdicionarCarrinho(selecionado)
    setAdicionado(true)
    setQuantidade(1)
    setTimeout(() => setAdicionado(false), 2000)
  }

  function handleCliqueWhatsApp() {
    trackCliqueWhatsApp('pagina_peixe')
  }

  if (carregando) {
    return (
      <div className="min-h-screen bg-[#F4F1E1] flex items-center justify-center">
        <div className="text-[#5B8C7A] text-lg font-serif">Carregando...</div>
      </div>
    )
  }

  if (!peixe) {
    return (
      <div className="min-h-screen bg-[#F4F1E1] flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🐠</div>
          <p className="text-[#7A6A52]">Peixe não encontrado.</p>
          <button onClick={() => navigate('/catalogo')} className="mt-4 text-[#5B8C7A] underline">Voltar ao catálogo</button>
        </div>
      </div>
    )
  }

  const temVariantes = variantes.length > 1
  const selecionado = (temVariantes && variantes.find(v => v.id === selecionadoId)) || peixe
  const nomeExibido = peixe.nome_base || peixe.nome
  const indisponivel = selecionado.disponivel === false

  const nomeParaWhatsApp = temVariantes ? nomeExibido + " (" + selecionado.variante_nome + ")" : selecionado.nome

  const msgWhatsApp = indisponivel
    ? "Olá! Gostaria de saber sobre a disponibilidade futura do " + nomeParaWhatsApp + "."
    : "Olá! Vim pelo site e tenho interesse no " + nomeParaWhatsApp + " (" + selecionado.preco + "). Poderia me passar mais informações?"

  const ficha = [
    { icon: Ruler, label: 'Tamanho adulto', valor: selecionado.tamanho_adulto },
    { icon: Box, label: 'Aquário mínimo', valor: selecionado.aquario_minimo },
    { icon: Thermometer, label: 'Temperatura', valor: selecionado.temperatura },
    { icon: Droplets, label: 'pH ideal', valor: selecionado.ph },
    { icon: Fish, label: 'Nível', valor: selecionado.nivel },
    { icon: Clock, label: 'Longevidade', valor: selecionado.longevidade },
    { icon: Users, label: 'Temperamento', valor: selecionado.temperamento, largo: true },
  ].filter(i => i.valor)

  const linkWhatsApp = "https://wa.me/5511971526750?text=" + encodeURIComponent(msgWhatsApp)

  const seletorQuantidade = (compacto) => (
    <div className={`flex items-center bg-white border border-[#D9D2B0] rounded-full ${compacto ? 'gap-1 px-1' : 'gap-3 px-2 py-1'}`}>
      <button
        onClick={() => setQuantidade(q => Math.max(1, q - 1))}
        className={`${compacto ? 'w-9 h-9' : 'w-8 h-8'} rounded-full flex items-center justify-center text-[#6B5B3E] hover:bg-[#F4F1E1] transition-colors`}
        aria-label="Diminuir quantidade"
      >
        <Minus size={16} />
      </button>
      <span className="text-base font-medium text-[#2C2416] w-6 text-center">{quantidade}</span>
      <button
        onClick={() => setQuantidade(q => q + 1)}
        className={`${compacto ? 'w-9 h-9' : 'w-8 h-8'} rounded-full flex items-center justify-center text-[#6B5B3E] hover:bg-[#F4F1E1] transition-colors`}
        aria-label="Aumentar quantidade"
      >
        <Plus size={16} />
      </button>
    </div>
  )

  return (
    <div className="bg-[#F4F1E1] min-h-screen">
      <Header />

      <div className="pt-20 md:pt-24 pb-12 md:pb-20 px-4 md:px-6 max-w-6xl mx-auto">

        <motion.button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#7A6A52] hover:text-[#5B8C7A] transition-colors mb-4 md:mb-8 text-sm py-2" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <ArrowLeft size={16} /> Voltar
        </motion.button>

        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-start">

          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="md:sticky md:top-24">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] md:aspect-square bg-[#E8E3CC]">
              <img src={otimizarImagem(selecionado.imagem_url, 700)} alt={nomeExibido} loading="eager" fetchpriority="high" className={`w-full h-full object-contain ${indisponivel ? 'grayscale' : ''}`} />
              {indisponivel ? (
                <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-medium px-3 py-1 rounded-full">Indisponível</span>
              ) : selecionado.badge ? (
                <span className="absolute top-4 left-4 bg-[#5B8C7A] text-white text-xs font-medium px-3 py-1 rounded-full">{selecionado.badge}</span>
              ) : null}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-xs font-medium tracking-widest uppercase text-[#9C8A6A] block mb-2">{selecionado.categoria}</span>
            <h1 className="font-serif text-3xl md:text-4xl font-light text-[#2C2416] mb-1 leading-tight">{nomeExibido}</h1>
            <p className="font-serif italic text-[#7A6A52] mb-5 md:mb-6">{selecionado.nome_cientifico}</p>

            {temVariantes && (
              <div className="mb-5 md:mb-6">
                <span className="text-sm text-[#7A6A52] font-medium block mb-2">Escolha o tamanho</span>
                <div className="flex flex-wrap gap-2">
                  {variantes.map(v => {
                    const vIndisponivel = v.disponivel === false
                    const ativo = v.id === selecionado.id
                    return (
                      <button
                        key={v.id}
                        type="button"
                        disabled={vIndisponivel}
                        onClick={() => !vIndisponivel && setSelecionadoId(v.id)}
                        className={
                          vIndisponivel
                            ? 'px-4 py-2.5 rounded-full text-sm border border-[#E8E3CC] text-[#B3A98A] bg-[#F4F1E1] line-through cursor-not-allowed'
                            : ativo
                              ? 'px-4 py-2.5 rounded-full text-sm bg-[#5B8C7A] text-white border border-[#5B8C7A] transition-colors'
                              : 'px-4 py-2.5 rounded-full text-sm bg-white text-[#6B5B3E] border border-[#D9D2B0] hover:border-[#5B8C7A] transition-colors'
                        }
                      >
                        {v.variante_nome}{vIndisponivel ? ' (indisponível)' : ''}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="border-t border-b border-[#D9D2B0] py-5 md:py-6 mb-6">
              <span className={`font-serif text-4xl md:text-5xl font-semibold ${indisponivel ? 'text-[#9C8A6A] line-through' : 'text-[#6B5B3E]'}`}>{selecionado.preco}</span>
              {!indisponivel && <span className="text-[#7A6A52] text-sm ml-2">por unidade</span>}
            </div>

            {indisponivel && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
                <XCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="text-red-800 font-medium text-sm">
                    {temVariantes ? `Tamanho ${selecionado.variante_nome} indisponível no momento` : 'Produto indisponível no momento'}
                  </p>
                  <p className="text-red-600 text-xs mt-1">
                    {temVariantes && variantes.some(v => v.disponivel !== false)
                      ? 'Escolha outro tamanho disponível acima ou consulte pelo WhatsApp.'
                      : 'Consulte pelo WhatsApp para saber sobre disponibilidade futura.'}
                  </p>
                </div>
              </div>
            )}

            {selecionado.descricao && (
              <p className="text-[#4A3F2E] text-[15px] leading-relaxed mb-6">{selecionado.descricao}</p>
            )}

            {ficha.length > 0 && (
              <div className="grid grid-cols-2 gap-2.5 md:gap-3 mb-8">
                {ficha.map(({ icon: Icon, label, valor, largo }) => (
                  <div key={label} className={`bg-white rounded-xl p-3 md:p-4 flex items-center gap-3 ${largo ? 'col-span-2' : ''}`}>
                    <Icon className="text-[#5B8C7A] flex-shrink-0" size={20} />
                    <div className="min-w-0">
                      <div className="text-xs text-[#7A6A52]">{label}</div>
                      <div className="text-sm font-medium text-[#2C2416]">{valor}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!indisponivel && (
              <div className="hidden md:flex items-center gap-4 mb-4">
                <span className="text-sm text-[#7A6A52] font-medium">Quantidade</span>
                {seletorQuantidade(false)}
              </div>
            )}

            <div className="flex flex-col gap-3">
              {!indisponivel && (
                <button onClick={handleAdicionarCarrinho} className={`hidden md:flex px-6 py-4 rounded-xl font-medium items-center justify-center gap-2 transition-colors ${adicionado ? 'bg-[#4A8C1C] text-white' : 'bg-[#6B5B3E] text-white hover:bg-[#2C2416]'}`}>
                  <ShoppingCart size={20} />
                  {adicionado ? '✓ Adicionado ao carrinho!' : `Adicionar ${quantidade > 1 ? quantidade + ' ao carrinho' : 'ao carrinho'}`}
                </button>
              )}
              <a href={linkWhatsApp} target="_blank" rel="noreferrer" onClick={handleCliqueWhatsApp} className={indisponivel ? "hidden md:flex bg-[#6B5B3E] text-white px-6 py-4 rounded-xl font-medium items-center justify-center gap-2 hover:bg-[#2C2416] transition-colors" : "border border-[#9C8A6A] text-[#6B5B3E] px-6 py-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-[#6B5B3E] hover:text-white transition-colors"}>
                <MessageCircle size={20} /> {indisponivel ? 'Consultar disponibilidade' : 'Consultar pelo WhatsApp'}
              </a>
            </div>

            <p className="text-xs text-[#7A6A52] mt-4 text-center">Entrega para todo o Brasil. Frete calculado no atendimento.</p>
          </motion.div>

        </div>

      </div>

      {/* Barra de compra fixa (celular): preco, quantidade e botao sempre ao alcance do polegar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E8E3CC] px-4 pt-3 shadow-[0_-4px_16px_rgba(44,36,22,0.08)]" style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))' }}>
        {indisponivel ? (
          <a href={linkWhatsApp} target="_blank" rel="noreferrer" onClick={handleCliqueWhatsApp} className="w-full bg-[#6B5B3E] text-white py-3.5 rounded-xl font-medium flex items-center justify-center gap-2">
            <MessageCircle size={18} /> Consultar disponibilidade
          </a>
        ) : (
          <div className="flex items-center gap-2">
            <div className="min-w-0 mr-auto">
              <div className="text-[11px] text-[#7A6A52] leading-none mb-1 truncate">{temVariantes ? selecionado.variante_nome : 'por unidade'}</div>
              <div className="font-serif text-xl font-semibold text-[#6B5B3E] leading-none whitespace-nowrap">{selecionado.preco}</div>
            </div>
            {seletorQuantidade(true)}
            <button onClick={handleAdicionarCarrinho} className={`px-4 py-3 rounded-xl font-medium flex items-center gap-1.5 text-sm transition-colors ${adicionado ? 'bg-[#4A8C1C] text-white' : 'bg-[#6B5B3E] text-white active:bg-[#2C2416]'}`}>
              <ShoppingCart size={18} />
              {adicionado ? 'Adicionado!' : 'Adicionar'}
            </button>
          </div>
        )}
      </div>

      <Footer />
      <div className="espaco-barra-compra md:hidden" aria-hidden="true" />
    </div>
  )
}

export default PeixeDetalhe
