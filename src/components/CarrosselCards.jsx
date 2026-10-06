import { useEffect, useRef } from 'react'

const PAUSA_APOS_INTERACAO = 5000

// Carrossel generico com rolagem nativa (o cliente desliza com o dedo no celular),
// auto-avanco e setas no desktop. O auto-avanco pausa enquanto o cliente interage
// e volta sozinho alguns segundos depois - nunca fica travado apos um toque.
function CarrosselCards({ itens, renderItem, intervalo = 3500, corSeta = 'bg-white' }) {
  const viewportRef = useRef(null)
  const pausadoRef = useRef(false)
  const visivelRef = useRef(true)
  const retomarRef = useRef(null)

  const N = itens.length

  function passo() {
    const vp = viewportRef.current
    if (!vp || vp.children.length === 0) return 0
    if (vp.children.length === 1) return vp.children[0].offsetWidth
    return vp.children[1].offsetLeft - vp.children[0].offsetLeft
  }

  function mover(direcao) {
    const vp = viewportRef.current
    if (!vp) return
    const max = vp.scrollWidth - vp.clientWidth
    if (max <= 0) return

    // Chegou no fim: volta para o inicio (e vice-versa) sem animar a lista inteira
    if (direcao > 0 && vp.scrollLeft >= max - 4) {
      vp.scrollTo({ left: 0, behavior: 'auto' })
      return
    }
    if (direcao < 0 && vp.scrollLeft <= 4) {
      vp.scrollTo({ left: max, behavior: 'auto' })
      return
    }
    vp.scrollBy({ left: direcao * passo(), behavior: 'smooth' })
  }

  function pausarTemporariamente() {
    pausadoRef.current = true
    clearTimeout(retomarRef.current)
    retomarRef.current = setTimeout(() => { pausadoRef.current = false }, PAUSA_APOS_INTERACAO)
  }

  function clicarSeta(direcao) {
    mover(direcao)
    pausarTemporariamente()
  }

  useEffect(() => {
    const vp = viewportRef.current
    if (!vp || N === 0) return

    const semAnimacao = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const temMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches

    function aoEntrarMouse() {
      pausadoRef.current = true
      clearTimeout(retomarRef.current)
    }
    function aoSairMouse() {
      clearTimeout(retomarRef.current)
      retomarRef.current = setTimeout(() => { pausadoRef.current = false }, 1000)
    }

    // Dedo (touchstart), clique (pointerdown) e trackpad/roda do mouse (wheel) contam como interacao.
    // Nao usamos o evento 'scroll' porque o encaixe automatico dos cards tambem dispara rolagem.
    vp.addEventListener('wheel', pausarTemporariamente, { passive: true })
    vp.addEventListener('touchstart', pausarTemporariamente, { passive: true })
    vp.addEventListener('pointerdown', pausarTemporariamente)
    if (temMouse) {
      vp.addEventListener('mouseenter', aoEntrarMouse)
      vp.addEventListener('mouseleave', aoSairMouse)
    }

    // So anda quando o carrossel esta na tela
    const observer = new IntersectionObserver(
      ([entrada]) => { visivelRef.current = entrada.isIntersecting },
      { threshold: 0.3 }
    )
    observer.observe(vp)

    const timer = semAnimacao ? null : setInterval(() => {
      if (pausadoRef.current || !visivelRef.current || document.hidden) return
      mover(1)
    }, intervalo)

    return () => {
      vp.removeEventListener('wheel', pausarTemporariamente)
      vp.removeEventListener('touchstart', pausarTemporariamente)
      vp.removeEventListener('pointerdown', pausarTemporariamente)
      vp.removeEventListener('mouseenter', aoEntrarMouse)
      vp.removeEventListener('mouseleave', aoSairMouse)
      observer.disconnect()
      clearInterval(timer)
      clearTimeout(retomarRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [N, intervalo])

  if (N === 0) return null

  return (
    <div className="relative">
      <button
        onClick={() => clicarSeta(-1)}
        aria-label="Anterior"
        className={`carrossel-seta hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full ${corSeta} shadow-lg items-center justify-center text-[#5B8C7A] hover:bg-[#5B8C7A] hover:text-white text-xl`}
      >
        ‹
      </button>

      <div ref={viewportRef} className="carrossel-viewport" role="region" aria-roledescription="carrossel">
        {itens.map((item, i) => (
          <div key={item.id ?? i} className="carrossel-item">
            {renderItem(item)}
          </div>
        ))}
      </div>

      <button
        onClick={() => clicarSeta(1)}
        aria-label="Próximo"
        className={`carrossel-seta hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full ${corSeta} shadow-lg items-center justify-center text-[#5B8C7A] hover:bg-[#5B8C7A] hover:text-white text-xl`}
      >
        ›
      </button>

      <p className="md:hidden text-center text-xs text-[#9C8A6A] mt-3">Deslize para ver mais →</p>
    </div>
  )
}

export default CarrosselCards
