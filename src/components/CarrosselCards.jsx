import { useEffect, useRef } from 'react'

const CLONES = 4

// Carrossel generico com auto-avanco, loop infinito sem "pulo" e setas manuais.
// Recebe uma lista de itens ja pronta (embaralhada/filtrada pelo componente pai)
// e uma funcao renderItem(item) que devolve o card.
function CarrosselCards({ itens, renderItem, intervalo = 2500, corSeta = 'bg-white' }) {
  const trackRef = useRef(null)
  const indexRef = useRef(CLONES)
  const travadoRef = useRef(false)
  const timerRef = useRef(null)

  const N = itens.length
  const estendidos = N > 0
    ? [...itens.slice(-CLONES), ...itens, ...itens.slice(0, CLONES)]
    : []

  function medirPasso() {
    const track = trackRef.current
    if (!track) return 0
    const item = track.children[indexRef.current]
    if (!item) return 0
    const estilo = getComputedStyle(item)
    return item.offsetWidth + parseFloat(estilo.marginRight || 0)
  }

  function ir(pos, comTransicao) {
    const track = trackRef.current
    if (!track) return
    track.style.transition = comTransicao ? 'transform 0.5s ease' : 'none'
    const passo = medirPasso()
    track.style.transform = `translateX(${-pos * passo}px)`
  }

  function mover(direcao) {
    if (travadoRef.current || N === 0) return
    travadoRef.current = true
    indexRef.current += direcao
    ir(indexRef.current, true)
  }

  function pausar() {
    clearInterval(timerRef.current)
  }

  function retomar() {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => mover(1), intervalo)
  }

  useEffect(() => {
    if (N === 0) return

    indexRef.current = CLONES
    ir(indexRef.current, false)

    function aoTransicionar() {
      travadoRef.current = false
      if (indexRef.current >= N + CLONES) {
        indexRef.current = CLONES
        ir(indexRef.current, false)
      } else if (indexRef.current < CLONES) {
        indexRef.current = N + CLONES - 1
        ir(indexRef.current, false)
      }
    }

    function aoRedimensionar() {
      ir(indexRef.current, false)
    }

    const track = trackRef.current
    track?.addEventListener('transitionend', aoTransicionar)
    window.addEventListener('resize', aoRedimensionar)
    timerRef.current = setInterval(() => mover(1), intervalo)

    return () => {
      track?.removeEventListener('transitionend', aoTransicionar)
      window.removeEventListener('resize', aoRedimensionar)
      clearInterval(timerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [N, intervalo])

  if (N === 0) return null

  return (
    <div className="relative" onMouseEnter={pausar} onMouseLeave={retomar}>
      <button
        onClick={() => mover(-1)}
        aria-label="Anterior"
        className={`carrossel-seta hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full ${corSeta} shadow-lg items-center justify-center text-[#5B8C7A] hover:bg-[#5B8C7A] hover:text-white text-xl`}
      >
        ‹
      </button>

      <div className="carrossel-viewport">
        <div ref={trackRef} className="carrossel-track">
          {estendidos.map((item, i) => (
            <div key={i} className="carrossel-item">
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => mover(1)}
        aria-label="Próximo"
        className={`carrossel-seta hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full ${corSeta} shadow-lg items-center justify-center text-[#5B8C7A] hover:bg-[#5B8C7A] hover:text-white text-xl`}
      >
        ›
      </button>
    </div>
  )
}

export default CarrosselCards
