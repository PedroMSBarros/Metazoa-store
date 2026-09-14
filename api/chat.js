// Vercel Serverless Function - protege a chave da API do Gemini
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido' })
  }

  const { mensagens } = req.body

  if (!mensagens || !Array.isArray(mensagens)) {
    return res.status(400).json({ erro: 'Formato de mensagens inválido' })
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return res.status(500).json({ erro: 'Chave da API não configurada' })
  }

  const contextoLoja = `Você é o assistente virtual da Metazoa Store, uma loja de aquarismo e vida animal no Brasil.
Você ajuda clientes com dúvidas sobre peixes ornamentais (água doce e marinhos), plantas aquáticas, acessórios e cuidados com aquários.
Seja simpático, direto e use linguagem informal brasileira.
REGRA MAIS IMPORTANTE: responda em NO MÁXIMO 2 frases curtas. Sempre termine a resposta com ponto final antes de parar - nunca deixe uma frase pela metade.
NÃO use formatação Markdown (sem asteriscos, sem negrito, sem listas) - escreva em texto simples corrido.
Se o cliente quiser comprar ou tiver dúvida sobre disponibilidade/preço específico, direcione para o WhatsApp da loja.
Se não souber algo com certeza, seja honesto e sugira falar com a equipe pelo WhatsApp.
Nunca invente preços ou disponibilidade de produtos específicos.`

  const modelo = 'gemini-flash-latest'

  try {
    const resposta = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: contextoLoja }]
          },
          contents: mensagens.map(m => ({
            role: m.autor === 'usuario' ? 'user' : 'model',
            parts: [{ text: m.texto }]
          })),
          generationConfig: {
            maxOutputTokens: 2048,
            temperature: 0.6,
            thinkingConfig: {
              thinkingBudget: 0
            }
          }
        })
      }
    )

    if (!resposta.ok) {
      const erroTexto = await resposta.text()
      console.error('Erro Gemini:', erroTexto)
      return res.status(502).json({ erro: 'Erro ao consultar o assistente' })
    }

    const dados = await resposta.json()
    const candidato = dados.candidates?.[0]
    let textoResposta = candidato?.content?.parts?.[0]?.text

    // Log para diagnosticar cortes no futuro
    if (candidato?.finishReason && candidato.finishReason !== 'STOP') {
      console.error('Finish reason nao-padrao:', candidato.finishReason)
    }

    if (!textoResposta) {
      console.error('Resposta sem texto:', JSON.stringify(dados))
      return res.status(502).json({ erro: 'Resposta vazia do assistente' })
    }

    // Remove formatação Markdown caso o modelo insista em usar
    textoResposta = textoResposta
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/^#+\s*/gm, '')
      .replace(/^-\s+/gm, '• ')
      .trim()

    // Se mesmo assim veio cortada (nao termina em pontuacao), corta na ultima frase completa
    const terminaOk = /[.!?]$/.test(textoResposta)
    if (!terminaOk) {
      const ultimoPonto = Math.max(
        textoResposta.lastIndexOf('.'),
        textoResposta.lastIndexOf('!'),
        textoResposta.lastIndexOf('?')
      )
      if (ultimoPonto > 20) {
        textoResposta = textoResposta.slice(0, ultimoPonto + 1)
      }
    }

    return res.status(200).json({ texto: textoResposta })
  } catch (erro) {
    console.error('Erro na função chat:', erro)
    return res.status(500).json({ erro: 'Erro interno' })
  }
}
