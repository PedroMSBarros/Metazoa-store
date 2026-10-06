import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ImagemProduto from './ImagemProduto'
import CarrosselCards from './CarrosselCards'
import { supabase } from '../lib/supabase'

const TAMANHO_POOL = 150
const QTD_NOVIDADE = 8

function embaralhar(lista) {
  const copia = [...lista]
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copia[i], copia[j]] = [copia[j], copia[i]]
  }
  return copia
}

function ProdutosDestaque() {
  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    async function buscarProdutos() {
      const { data, error } = await supabase
        .from('produtos')
        .select('*')
        .order('criado_em', { ascending: false })
        .limit(TAMANHO_POOL)

      if (!error && data) {
        // So entra quem tem foto de verdade e nao e Pecas de Reposicao
        const elegiveis = data.filter(p =>
          p.imagem_url &&
          p.categoria !== 'Peças de Reposição' &&
          p.disponivel !== false
        )
        const comNovidade = elegiveis.map((p, i) => ({ ...p, _novidade: i < QTD_NOVIDADE }))
        setProdutos(embaralhar(comNovidade))
      }
      setCarregando(false)
    }
    buscarProdutos()
  }, [])

  return (
    <section id="produtos-destaque" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">

        <motion.div className="flex justify-between items-end mb-12 flex-wrap gap-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div>
            <span className="text-[#5B8C7A] text-sm font-medium tracking-widest uppercase flex items-center gap-2">
              <span className="w-7 h-px bg-[#5B8C7A]"></span>
              Loja
            </span>
            <h2 className="font-serif text-4xl font-light mt-2 text-[#2C2416]">
              Produtos em <span className="text-[#5B8C7A] italic">destaque</span>
            </h2>
          </div>
          <Link to="/catalogo?categoria=Produtos" className="text-[#5B8C7A] text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
            Ver catálogo completo
          </Link>
        </motion.div>

        {carregando ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-[#F4F1E1] rounded-xl overflow-hidden">
                <div className="aspect-[4/3] bg-gradient-to-r from-[#E8E3CC] via-[#F4F1E1] to-[#E8E3CC] bg-[length:200%_100%] animate-shimmer" />
                <div className="p-5">
                  <div className="h-3 w-20 bg-[#E8E3CC] rounded mb-2" />
                  <div className="h-5 w-32 bg-[#E8E3CC] rounded mb-3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <CarrosselCards
            itens={produtos}
            intervalo={3500}
            corSeta="bg-[#F4F1E1]"
            renderItem={(produto) => (
              <Link to={"/produto/" + produto.id} className="bg-[#F4F1E1] rounded-xl overflow-hidden hover:-translate-y-1 transition-transform duration-300 shadow-sm hover:shadow-md block h-full">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#E8E3CC]">
                  <ImagemProduto
                    src={produto.imagem_url}
                    alt={produto.nome}
                    largura={450}
                    className="w-full h-full object-contain md:hover:scale-105 transition-transform duration-500"
                  />
                  {produto._novidade && (
                    <span className="absolute top-3 left-3 bg-[#5B8C7A] text-white text-xs font-medium px-3 py-1 rounded-full z-10">Novidade</span>
                  )}
                </div>
                <div className="p-5">
                  <span className="text-xs font-medium tracking-widest uppercase text-[#9C8A6A] block mb-1">{produto.categoria}</span>
                  <div className="font-serif text-xl text-[#2C2416] mb-1">{produto.nome}</div>
                  {produto.marca && <span className="font-serif italic text-sm text-[#7A6A52] block mb-3">{produto.marca}</span>}
                  <div className="flex justify-between items-center pt-3 border-t border-[#D9D2B0]">
                    <span className="font-serif text-2xl font-semibold text-[#6B5B3E]">{produto.preco}</span>
                    <span className="bg-[#5B8C7A] text-white text-sm px-4 py-2 rounded">Ver detalhes</span>
                  </div>
                </div>
              </Link>
            )}
          />
        )}

      </div>
    </section>
  )
}

export default ProdutosDestaque
