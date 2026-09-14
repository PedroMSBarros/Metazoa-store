// Otimiza imagens externas (postimg, unsplash, etc.) via proxy gratuito wsrv.nl
// Redimensiona, comprime e converte para WebP sem precisar trocar de hospedagem
export function otimizarImagem(url, largura = 500) {
  if (!url) return url
  // Evita re-otimizar links que já passam pelo proxy
  if (url.includes('wsrv.nl')) return url
  const urlCodificada = encodeURIComponent(url)
  return `https://wsrv.nl/?url=${urlCodificada}&w=${largura}&output=webp&q=75`
}
