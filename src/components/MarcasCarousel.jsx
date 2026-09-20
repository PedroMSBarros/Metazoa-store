import { otimizarImagem } from '../lib/imagem'

const marcas = [
  { nome: 'Wave Reef', url: 'https://res.cloudinary.com/dcfvuaoxf/image/upload/v1789917696/wavereef_rh1cah.jpg' },
  { nome: 'Minjiang', url: 'https://res.cloudinary.com/dcfvuaoxf/image/upload/v1789917695/minjiang_lwucty.jpg' },
  { nome: 'SunSun', url: 'https://res.cloudinary.com/dcfvuaoxf/image/upload/v1789917695/sunsun_nfm4w6.jpg' },
  { nome: 'Nemo Light', url: 'https://res.cloudinary.com/dcfvuaoxf/image/upload/v1789917695/nemolight_s6atxj.jpg' },
  { nome: 'HS Bao', url: 'https://res.cloudinary.com/dcfvuaoxf/image/upload/v1789917694/hsbao_zh0yj6.png' },
  { nome: 'Modern Reef', url: 'https://res.cloudinary.com/dcfvuaoxf/image/upload/v1789917694/modern_reef_wcmf2s.png' },
  { nome: 'Byosim', url: 'https://res.cloudinary.com/dcfvuaoxf/image/upload/v1789917693/byosim_cdwyj6.png' },
  { nome: 'Hagen', url: 'https://res.cloudinary.com/dcfvuaoxf/image/upload/v1789917693/hagen_znxuoq.jpg' },
  { nome: 'ADA', url: 'https://res.cloudinary.com/dcfvuaoxf/image/upload/v1789917693/ADA_zwqk5n.jpg' },
  { nome: 'Maramar', url: 'https://res.cloudinary.com/dcfvuaoxf/image/upload/v1789917693/maramar_nkngkq.png' },
  { nome: 'Aqua Ocean', url: 'https://res.cloudinary.com/dcfvuaoxf/image/upload/v1789917693/aquaocean_ypa7ov.jpg' },
  { nome: 'Poytara', url: 'https://res.cloudinary.com/dcfvuaoxf/image/upload/v1789917693/poytara_f8ojoi.png' },
  { nome: 'Nutricon', url: 'https://res.cloudinary.com/dcfvuaoxf/image/upload/v1789917692/nutricon_zohkst.png' },
  { nome: 'Ista', url: 'https://res.cloudinary.com/dcfvuaoxf/image/upload/v1789917693/ista_h9hyh2.jpg' },
  { nome: 'Kintons', url: 'https://res.cloudinary.com/dcfvuaoxf/image/upload/v1789917692/kintons_yrbfdq.webp' },
  { nome: 'Bubble Magus', url: 'https://res.cloudinary.com/dcfvuaoxf/image/upload/v1789917692/bubble_magus_ydiu5i.jpg' },
  { nome: 'HW', url: 'https://res.cloudinary.com/dcfvuaoxf/image/upload/v1789917692/hw_zcjbwj.png' },
  { nome: 'Jebao', url: 'https://res.cloudinary.com/dcfvuaoxf/image/upload/v1789917692/jebao_klpgpf.png' },
]

function LogoLista({ escondida = false }) {
  return (
    <div className="flex gap-14 items-center" aria-hidden={escondida}>
      {marcas.map((m, i) => (
        <img
          key={m.nome + '-' + i}
          src={otimizarImagem(m.url, 200)}
          alt={escondida ? '' : m.nome}
          title={m.nome}
          loading="lazy"
          className="h-10 md:h-12 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 flex-shrink-0"
        />
      ))}
    </div>
  )
}

function MarcasCarousel() {
  return (
    <section className="bg-white py-10 border-y border-[#E8E3CC] overflow-hidden">
      <div className="marquee-wrap relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <div className="flex gap-14 marquee-track w-max">
          <LogoLista />
          <LogoLista escondida />
        </div>
      </div>
    </section>
  )
}

export default MarcasCarousel
