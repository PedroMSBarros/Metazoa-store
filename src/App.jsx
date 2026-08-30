import { useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
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

function App() {
  return (
    <>
      <RedirecionadorHash />
      <RastreadorPagina />
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
