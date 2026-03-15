import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Catalogo from './pages/Catalogo'
import Sobre from './pages/Sobre'
import PeixeDetalhe from './pages/PeixeDetalhe'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalogo" element={<Catalogo />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/peixe/:id" element={<PeixeDetalhe />} />
    </Routes>
  )
}

export default App
