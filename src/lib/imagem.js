// Otimiza imagens hospedadas no Cloudinary usando as transformacoes nativas da URL.
// Reduz o tamanho do arquivo (WebP/AVIF automatico + redimensionamento) sem
// precisar de nenhum proxy externo, evitando o problema de hotlink que tinhamos
// com o postimg.cc.
export function otimizarImagem(url, largura = 500) {
  if (!url) return url

  // So aplica transformacao em imagens que ja estao no Cloudinary
  if (!url.includes('res.cloudinary.com')) return url

  // Evita aplicar duas vezes se a URL ja tiver transformacao
  if (url.includes('/upload/f_auto') || url.includes('/upload/q_auto')) return url

  // Insere os parametros de transformacao logo apos "/upload/"
  // f_auto = formato mais leve suportado pelo navegador (webp/avif)
  // q_auto = qualidade automatica (comprime sem perda visivel)
  // w_ = largura maxima, mantendo a proporcao original
  return url.replace('/upload/', `/upload/f_auto,q_auto,w_${largura}/`)
}
