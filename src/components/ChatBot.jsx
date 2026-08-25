import { useState, useRef, useEffect } from 'react'
import { MessageSquare, X, Send, Loader } from 'lucide-react'

const LIMITE_MENSAGENS_DIA = 15
const STORAGE_KEY_CONTADOR = 'metazoa-chat-contador'
const STORAGE_KEY_DATA = 'metazoa-chat-data'
const STORAGE_KEY_HISTORICO = 'metazoa-chat-historico'

function pegarContadorHoje() {
  const hoje = new Date().toDateString()
  const dataSalva = localStorage.getItem(STORAGE_KEY_DATA)
  if (dataSalva !== hoje) {
    localStorage.setItem(STORAGE_KEY_DATA, hoje)
    localStorage.setItem(STORAGE_KEY_CONTADOR, '0')
    return 0
  }
  return parseInt(localStorage.getItem(STORAGE_KEY_CONTADOR) || '0', 10)
}

function incrementarContador() {
  const atual = pegarContadorHoje()
  localStorage.setItem(STORAGE_KEY_CONTADOR, String(atual + 1))
  return atual + 1
}

function ChatBot() {
  const [aberto, setAberto] = useState(false)
  const [mensagens, setMensagens] = useState(() => {
    try {
      const salvo = sessionStorage.getItem(STORAGE_KEY_HISTORICO)
      return salvo ? JSON.parse(salvo) : []
    } catch {
      return []
    }
  })
  const [input, setInput] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [limiteAtingido, setLimiteAtingido] = useState(() => pegarContadorHoje() >= LIMITE_MENSAGENS_DIA)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [mensagens, carregando])

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY_HISTORICO, JSON.stringify(mensagens))
    } catch {
      // sessionStorage indisponível
    }
  }, [mensagens])

  async function enviarMensagem(e, textoForcado) {
    if (e) e.preventDefault()
    const texto = (textoForcado ?? input).trim()
    if (!texto || carregando) return

    if (pegarContadorHoje() >= LIMITE_MENSAGENS_DIA) {
      setLimiteAtingido(true)
      return
    }

    const novaMensagem = { autor: 'usuario', texto }
    const historicoAtualizado = [...mensagens, novaMensagem]
    setMensagens(historicoAtualizado)
    setInput('')
    setCarregando(true)

    const novoContador = incrementarContador()
    if (novoContador >= LIMITE_MENSAGENS_DIA) {
      setLimiteAtingido(true)
    }

    try {
      const resposta = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensagens: historicoAtualizado.slice(-10) })
      })

      const dados = await resposta.json()

      if (!resposta.ok) {
        const mensagemErro = resposta.status === 502
          ? 'Nosso assistente está com bastante gente conversando agora 🐠 Tenta de novo em alguns segundos, ou fala direto com a gente pelo WhatsApp!'
          : 'Desculpa, tive um probleminha. Que tal falar com a gente pelo WhatsApp?'
        setMensagens(prev => [...prev, { autor: 'bot', texto: mensagemErro }])
      } else {
        setMensagens(prev => [...prev, { autor: 'bot', texto: dados.texto }])
      }
    } catch {
      setMensagens(prev => [...prev, { autor: 'bot', texto: 'Desculpa, tive um probleminha de conexão. Tenta de novo ou fala com a gente pelo WhatsApp!' }])
    } finally {
      setCarregando(false)
    }
  }

  return (
    <>
      {!aberto && (
        <button
          onClick={() => setAberto(true)}
          className="fixed bottom-24 right-6 z-50 bg-[#5B8C7A] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
          title="Fale com nosso assistente"
        >
          <MessageSquare size={24} />
        </button>
      )}

      {aberto && (
        <div className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-[#D9D2B0]">

          <div className="bg-[#2C1A0E] px-5 py-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <img src="https://i.postimg.cc/Kk3XcgDg/image.png" alt="Metazoa" className="w-8 h-8 rounded-full object-cover" />
              <div>
                <p className="text-[#C8D4A0] text-sm font-medium">Assistente Metazoa</p>
                <p className="text-[#C8D4A0]/50 text-xs">Tire suas dúvidas</p>
              </div>
            </div>
            <button onClick={() => setAberto(false)} className="text-[#C8D4A0] hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-[#F4F1E1]">
            {mensagens.length === 0 && (
              <div className="text-center text-[#7A6A52] text-sm mt-6 px-4">
                🐠 Oi! Posso te ajudar com dúvidas sobre peixes, cuidados com aquário ou nossos produtos. Manda sua pergunta!
              </div>
            )}
            {mensagens.map((msg, i) => (
              <div key={i} className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                msg.autor === 'usuario'
                  ? 'bg-[#5B8C7A] text-white self-end rounded-br-sm'
                  : 'bg-white text-[#2C2416] self-start rounded-bl-sm shadow-sm'
              }`}>
                {msg.texto}
              </div>
            ))}
            {carregando && (
              <div className="bg-white self-start rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                <Loader className="animate-spin text-[#5B8C7A]" size={16} />
              </div>
            )}
          </div>

          <div className="p-3 border-t border-[#E8E3CC] bg-white flex-shrink-0">
            {limiteAtingido ? (
              <div className="text-center py-2">
                <p className="text-xs text-[#7A6A52] mb-2">Limite de mensagens de hoje atingido.</p>
                <a href="https://wa.me/5511971526750" target="_blank" rel="noreferrer" className="text-[#25D366] text-sm font-medium underline">
                  Falar pelo WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={enviarMensagem} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Digite sua pergunta..."
                  disabled={carregando}
                  className="flex-1 bg-[#F4F1E1] border border-[#D9D2B0] rounded-full px-4 py-2 text-sm text-[#2C2416] placeholder-[#9C8A6A] focus:outline-none focus:border-[#5B8C7A] transition-colors disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={carregando || !input.trim()}
                  className="bg-[#5B8C7A] text-white w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 hover:bg-[#3D6B5A] transition-colors disabled:opacity-40"
                >
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>

        </div>
      )}
    </>
  )
}

export default ChatBot
