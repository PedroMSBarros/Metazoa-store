import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [itens, setItens] = useState([])

  function adicionarItem(item, quantidade = 1) {
    setItens(prev => {
      const existe = prev.find(i => i.id === item.id && i._tipo === item._tipo)
      if (existe) {
        return prev.map(i =>
          i.id === item.id && i._tipo === item._tipo
            ? { ...i, quantidade: i.quantidade + quantidade }
            : i
        )
      }
      return [...prev, { ...item, quantidade }]
    })
  }

  function removerItem(id, tipo) {
    setItens(prev => prev.filter(i => !(i.id === id && i._tipo === tipo)))
  }

  function alterarQuantidade(id, tipo, quantidade) {
    if (quantidade <= 0) {
      removerItem(id, tipo)
      return
    }
    setItens(prev =>
      prev.map(i =>
        i.id === id && i._tipo === tipo ? { ...i, quantidade } : i
      )
    )
  }

  function limparCarrinho() {
    setItens([])
  }

  const total = itens.reduce((acc, item) => {
    const preco = parseFloat(
      item.preco.replace('R$', '').replace('.', '').replace(',', '.').trim()
    )
    return acc + (isNaN(preco) ? 0 : preco * item.quantidade)
  }, 0)

  const totalItens = itens.reduce((acc, item) => acc + item.quantidade, 0)

  return (
    <CartContext.Provider
      value={{ itens, adicionarItem, removerItem, alterarQuantidade, limparCarrinho, total, totalItens }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
