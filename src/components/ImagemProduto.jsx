import { useState } from 'react'

// Componente de imagem com skeleton de carregamento
// Evita a sensação de "travado" enquanto a foto ainda não chegou
function ImagemProduto({ src, alt, className, prioritaria = false, indisponivel = false }) {
  const [carregada, setCarregada] = useState(false)
  const [erro, setErro] = useState(false)

  return (
    <div className="relative w-full h-full">
      {!carregada && !erro && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#E8E3CC] via-[#F4F1E1] to-[#E8E3CC] bg-[length:200%_100%] animate-shimmer" />
      )}
      {erro ? (
        <div className="absolute inset-0 flex items-center justify-center bg-[#E8E3CC] text-3xl">
          🐠
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={prioritaria ? 'eager' : 'lazy'}
          fetchpriority={prioritaria ? 'high' : 'auto'}
          decoding="async"
          onLoad={() => setCarregada(true)}
          onError={() => setErro(true)}
          className={`${className} ${carregada ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 ${indisponivel ? 'grayscale' : ''}`}
        />
      )}
    </div>
  )
}

export default ImagemProduto
