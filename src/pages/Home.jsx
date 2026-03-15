import Header from '../components/Header'
import Hero from '../components/Hero'
import Categorias from '../components/Categorias'
import Destaques from '../components/Destaques'
import Sobre from '../components/Sobre'
import Cuidados from '../components/Cuidados'
import Footer from '../components/Footer'

function Home() {
  return (
    <div className="bg-[#F4F1E1]">
      <Header />
      <Hero />
      <Categorias />
      <Destaques />
      <Sobre />
      <Cuidados />
      <Footer />
    </div>
  )
}

export default Home
