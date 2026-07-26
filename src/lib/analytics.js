// Utilitário simples para enviar eventos ao Google Analytics 4
export function trackEvent(nomeEvento, parametros = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', nomeEvento, parametros)
  }
}

// Eventos pré-definidos usados no site
export function trackVisualizacaoPeixe(peixe) {
  trackEvent('view_item', {
    item_id: peixe.id,
    item_name: peixe.nome,
    item_category: peixe.categoria,
    price: peixe.preco,
  })
}

export function trackBusca(termo) {
  trackEvent('search', { search_term: termo })
}

export function trackCliqueWhatsApp(origem) {
  trackEvent('contact_whatsapp', { origem })
}

export function trackAdicionarCarrinho(item) {
  trackEvent('add_to_cart', {
    item_id: item.id,
    item_name: item.nome,
    item_category: item.categoria,
  })
}

export function trackEnviarPedido(totalItens, valorTotal) {
  trackEvent('purchase_intent', {
    items_count: totalItens,
    value: valorTotal,
    currency: 'BRL',
  })
}
