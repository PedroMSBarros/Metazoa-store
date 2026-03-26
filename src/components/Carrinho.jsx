import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2, Plus, Minus, ShoppingCart } from 'lucide-react'
import { useCart } from './CartContext'

function Carrinho({ aberto, fechar }) {
  const { itens, removerItem, alterarQuantidade, limparCarrinho, total, totalItens } = useCart()

  function gerarMensagemWhatsApp() {
    if (itens.length === 0) return ''

    let msg = 'Olá! Gostaria de fazer o seguinte pedido:\n\n'

    itens.forEach(item => {
      msg += `• ${item.nome} (x${item.quantidade}) — ${item.preco} cada\n`
    })

    msg += `\n💰 *Total: R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}*`
    msg += '\n\nPoderia confirmar a disponibilidade e o frete?'

    return encodeURIComponent(msg)
  }

  return (
    <AnimatePresence>
      {aberto && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={fechar}
          />
          <motion.div
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="flex items-center justify-between p-6 border-b border-[#E8E3CC]">
              <div className="flex items-center gap-3">
                <ShoppingCart className="text-[#5B8C7A]" size={22} />
                <h2 className="font-serif text-xl text-[#2C2416]">Meu Pedido</h2>
                {totalItens > 0 && (
                  <span className="bg-[#5B8C7A] text-white text-xs font-medium px-2 py-0.5 rounded-full">{totalItens}</span>
                )}
              </div>
              <button onClick={fechar} className="text-[#7A6A52] hover:text-[#2C2416] transition-colors">
                <X size={22} />
              </button>
            </div>

            {itens.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                <div className="text-6xl mb-4">🐠</div>
                <p className="text-[#7A6A52] text-lg font-serif">Seu carrinho está vazio</p>
                <p className="text-[#9C8A6A] text-sm mt-2">Adicione peixes e produtos para fazer seu pedido</p>
                <button onClick={fechar} className="mt-6 bg-[#5B8C7A] text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-[#3D6B5A] transition-colors">
                  Ver catálogo
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                  {itens.map(item => (
                    <div key={item.id + item._tipo} className="bg-[#F4F1E1] rounded-xl p-3 flex gap-3">
                      <img src={item.imagem_url} alt={item.nome} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#2C2416] truncate">{item.nome}</p>
                        <p className="text-xs text-[#7A6A52] mb-2">{item.preco}</p>
                        <div className="flex items-center gap-2">
                          <button onClick={() => alterarQuantidade(item.id, item._tipo, item.quantidade - 1)} className="w-7 h-7 rounded-full bg-white border border-[#D9D2B0] flex items-center justify-center hover:border-[#5B8C7A] transition-colors">
                            <Minus size={12} />
                          </button>
                          <span className="text-sm font-medium w-6 text-center">{item.quantidade}</span>
                          <button onClick={() => alterarQuantidade(item.id, item._tipo, item.quantidade + 1)} className="w-7 h-7 rounded-full bg-white border border-[#D9D2B0] flex items-center justify-center hover:border-[#5B8C7A] transition-colors">
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <button onClick={() => removerItem(item.id, item._tipo)} className="text-[#9C8A6A] hover:text-red-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                        <span className="text-sm font-serif font-semibold text-[#6B5B3E]">
                          {(() => {
                            const preco = parseFloat(item.preco.replace('R$', '').replace('.', '').replace(',', '.').trim())
                            return 'R$ ' + (preco * item.quantidade).toLocaleString('pt-BR', { minimumFractionDigits: 2 })
                          })()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 border-t border-[#E8E3CC] bg-white">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[#7A6A52]">Total do pedido</span>
                    <span className="font-serif text-2xl font-semibold text-[#6B5B3E]">
                      R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <a
                    href={"https://wa.me/5511971526750?text=" + gerarMensagemWhatsApp()}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-[#25D366] text-white py-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-[#1ebe5d] transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.564 4.136 1.544 5.868L0 24l6.335-1.521A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.886 0-3.66-.491-5.2-1.352l-.371-.22-3.863.927.974-3.765-.242-.387A9.937 9.937 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                    Enviar pedido pelo WhatsApp
                  </a>
                  <button onClick={limparCarrinho} className="w-full mt-2 text-[#9C8A6A] text-sm hover:text-red-500 transition-colors py-2">
                    Limpar carrinho
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Carrinho
