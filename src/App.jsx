import { useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation, useNavigationType } from 'react-router-dom'
import Home from './pages/Home'
import Catalogo from './pages/Catalogo'
import Sobre from './pages/Sobre'
import Cuidados from './pages/Cuidados'
import Aclimatacao from './pages/Aclimatacao'
import Montagem from './pages/Montagem'
import PeixeDetalhe from './pages/PeixeDetalhe'
import ProdutoDetalhe from './pages/ProdutoDetalhe'
import WhatsAppFloat from './components/WhatsAppFloat'
import ChatBot from './components/ChatBot'

function RedirecionadorHash() {
  const navigate = useNavigate()
  useEffect(() => {
    if (window.location.hash.startsWith('#/')) {
      const novaRota = window.location.hash.replace('#', '')
      navigate(novaRota, { replace: true })
    }
  }, [])
  return null
}

function RastreadorPagina() {
  const location = useLocation()
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_title: document.title,
      })
    }
  }, [location])
  return null
}

// Ao abrir uma pagina nova (clique em link), comeca do topo. Ao voltar
// (botao Voltar / gesto do celular) o navegador e o catalogo restauram a posicao.
function RolarParaTopo() {
  const { pathname } = useLocation()
  const tipoNavegacao = useNavigationType()
  useEffect(() => {
    if (tipoNavegacao === 'PUSH') window.scrollTo(0, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])
  return null
}

// No celular, esconde os botoes flutuantes enquanto o cliente rola para baixo
// (para nao cobrir cards e botoes) e mostra de novo ao rolar para cima.
function ControleFlutuantes() {
  const location = useLocation()

  useEffect(() => {
    document.body.classList.remove('rolando-para-baixo')
  }, [location.pathname])

  useEffect(() => {
    let ultimoY = window.scrollY
    let agendado = false
    function aoRolar() {
      if (agendado) return
      agendado = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        const delta = y - ultimoY
        if (Math.abs(delta) > 10) {
          document.body.classList.toggle('rolando-para-baixo', delta > 0 && y > 200)
          ultimoY = y
        }
        agendado = false
      })
    }
    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => window.removeEventListener('scroll', aoRolar)
  }, [])

  return null
}

function App() {
  return (
    <>
      <RedirecionadorHash />
      <RastreadorPagina />
      <ControleFlutuantes />
      <RolarParaTopo />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/cuidados" element={<Cuidados />} />
        <Route path="/cuidados/aclimatacao" element={<Aclimatacao />} />
        <Route path="/cuidados/montagem" element={<Montagem />} />
        <Route path="/peixe/:id" element={<PeixeDetalhe />} />
        <Route path="/produto/:id" element={<ProdutoDetalhe />} />
      </Routes>
      <WhatsAppFloat />
      <ChatBot />
    </>
  )
}

export default App
