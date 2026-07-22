import { useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Catalogo from './pages/Catalogo'
import Sobre from './pages/Sobre'
import Cuidados from './pages/Cuidados'
import PeixeDetalhe from './pages/PeixeDetalhe'
import ProdutoDetalhe from './pages/ProdutoDetalhe'
import WhatsAppFloat from './components/WhatsAppFloat'

function RedirecionadorHash() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Redireciona links antigos com #/ para a rota normal
    if (window.location.hash.startsWith('#/')) {
      const novaRota = window.location.hash.replace('#', '')
      navigate(novaRota, { replace: true })
    }
  }, [])

  return null
}

function App() {
  return (
    <>
      <RedirecionadorHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/cuidados" element={<Cuidados />} />
        <Route path="/peixe/:id" element={<PeixeDetalhe />} />
        <Route path="/produto/:id" element={<ProdutoDetalhe />} />
      </Routes>
      <WhatsAppFloat />
    </>
  )
}

export default App
