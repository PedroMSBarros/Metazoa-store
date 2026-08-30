import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

function Aclimatacao() {
  return (
    <div className="bg-[#F4F1E1] min-h-screen">
      <Header />

      <div className="pt-16">

        {/* Banner */}
        <section className="bg-[#F4E9D8] px-6 md:px-8 py-10 grid md:grid-cols-2 gap-8 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-serif text-4xl md:text-5xl font-semibold leading-tight mb-3 text-[#2C2416]">Guia de Aclimatação de Peixes Novos</h1>
            <p className="text-[#7A6A52] max-w-md">Como introduzir novos peixes no aquário com segurança, minimizando o estresse e o risco de perdas.</p>
          </motion.div>
          <motion.div className="rounded-xl overflow-hidden aspect-[2.4/1]" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <img src="https://i.postimg.cc/kGY7Dddx/Gemini-Generated-Image-790k9w790k9w790k.jpg" alt="Aclimatação de peixes novos" className="w-full h-full object-cover" />
          </motion.div>
        </section>

        <section className="px-6 md:px-8 py-10 max-w-4xl mx-auto">

          {/* Por que importa */}
          <motion.div className="mb-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="font-serif text-2xl font-semibold mb-3 text-[#2C2416]">Por que a aclimatação é tão importante?</h2>
            <p className="text-sm text-[#4A3B2A] leading-relaxed mb-3">
              Todo peixe vem de uma água com temperatura, pH e dureza específicos — seja da loja, do criador ou do transporte. Quando ele é colocado direto no seu aquário, a mudança brusca desses parâmetros gera um <strong>choque osmótico</strong>: as células do peixe não conseguem se ajustar rápido o suficiente, o que causa estresse severo e compromete o sistema imunológico.
            </p>
            <p className="text-sm text-[#4A3B2A] leading-relaxed">
              A aclimatação é o processo de igualar essas condições <strong>gradualmente</strong>, dando tempo para o peixe se adaptar sem sofrer esse choque. É a etapa mais negligenciada por iniciantes — e uma das principais causas de morte de peixes recém-chegados, mesmo em animais saudáveis.
            </p>
          </motion.div>

          {/* Passo a passo */}
          <div className="mb-10">
            <h2 className="font-serif text-2xl font-semibold mb-5 text-[#2C2416]">Passo a passo</h2>
            <div className="flex flex-col gap-6">

              <motion.div className="border border-[#D9D2B0] rounded-xl p-5" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-7 h-7 rounded-full bg-[#5B8C7A] text-white flex items-center justify-center font-serif font-semibold text-sm flex-shrink-0">1</span>
                  <h3 className="font-semibold text-[#2C2416]">Equalização de Temperatura</h3>
                </div>
                <p className="text-sm text-[#7A6A52] leading-relaxed mb-2">Deixe o saco fechado flutuando na superfície do aquário por 15 a 20 minutos. Isso permite que a temperatura da água do saco se iguale gradualmente à do aquário, através da troca de calor pelo plástico.</p>
                <p className="text-xs text-[#9C8A6A]"><strong>Por que importa:</strong> mudanças bruscas de temperatura (mais de 2-3°C) podem causar choque térmico, deixando o peixe letárgico ou até matando-o em casos extremos.</p>
              </motion.div>

              <motion.div className="border border-[#D9D2B0] rounded-xl p-5" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-7 h-7 rounded-full bg-[#5B8C7A] text-white flex items-center justify-center font-serif font-semibold text-sm flex-shrink-0">2</span>
                  <h3 className="font-semibold text-[#2C2416]">Mistura da Água (Aclimatação Química)</h3>
                </div>
                <p className="text-sm text-[#7A6A52] leading-relaxed mb-2">Abra o saco e adicione cerca de meio copo de água do seu aquário a cada 5-10 minutos, ao longo de 30 a 45 minutos. Isso equaliza gradualmente o pH, a dureza e outros parâmetros químicos.</p>
                <p className="text-xs text-[#9C8A6A]"><strong>Por que importa:</strong> diferenças de pH podem causar "pH shock" — o peixe pode parecer bem na hora, mas apresentar sintomas (letargia, perda de apetite) horas ou dias depois.</p>
              </motion.div>

              <motion.div className="border border-[#D9D2B0] rounded-xl p-5" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-7 h-7 rounded-full bg-[#5B8C7A] text-white flex items-center justify-center font-serif font-semibold text-sm flex-shrink-0">3</span>
                  <h3 className="font-semibold text-[#2C2416]">Soltando o Peixe</h3>
                </div>
                <p className="text-sm text-[#7A6A52] leading-relaxed mb-2">Use uma rede para transferir o peixe do saco para o aquário. Nunca despeje a água de transporte da loja no seu aquário — ela pode conter amônia acumulada, parasitas ou patógenos.</p>
                <p className="text-xs text-[#9C8A6A]"><strong>Por que importa:</strong> a água de transporte é um ambiente fechado onde toxinas se acumulam rapidamente, especialmente se o trajeto foi longo.</p>
              </motion.div>

            </div>
          </div>

          {/* Metodo do gotejamento */}
          <motion.div className="mb-10 bg-white rounded-2xl p-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="font-serif text-xl font-semibold mb-3 text-[#2C2416]">Método avançado: aclimatação por gotejamento</h2>
            <p className="text-sm text-[#7A6A52] leading-relaxed mb-3">
              Para espécies mais sensíveis (marinhos, camarões, peixes de água muito específica), o método do saco não é preciso o suficiente. Nesse caso, o ideal é o <strong>drip acclimation</strong>:
            </p>
            <ol className="text-sm text-[#7A6A52] leading-relaxed space-y-2 list-decimal list-inside">
              <li>Transfira o peixe e a água do saco para um balde limpo (sem produtos químicos)</li>
              <li>Use uma mangueira fina (airline) para gotejar água do aquário dentro do balde, controlando o fluxo com um nó ou uma válvula</li>
              <li>Deixe gotejar por 1 a 2 horas, até que o volume de água tenha triplicado</li>
              <li>Transfira o peixe para o aquário com uma rede, descartando a água do balde</li>
            </ol>
          </motion.div>

          {/* Sinais de estresse */}
          <div className="mb-10">
            <h2 className="font-serif text-2xl font-semibold mb-4 text-[#2C2416]">Como identificar estresse pós-introdução</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <motion.div className="bg-red-50 border border-red-200 rounded-xl p-5" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                <p className="font-semibold text-sm text-red-800 mb-2">🚩 Sinais de alerta</p>
                <ul className="text-sm text-red-700 leading-relaxed space-y-1">
                  <li>• Respiração acelerada ou na superfície</li>
                  <li>• Cores esmaecidas ou manchas escuras</li>
                  <li>• Nadar de forma desequilibrada</li>
                  <li>• Esconder-se por longos períodos</li>
                  <li>• Recusa total de alimento após 2-3 dias</li>
                </ul>
              </motion.div>
              <motion.div className="bg-[#E8F0E4] rounded-xl p-5" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
                <p className="font-semibold text-sm text-[#3D6B5A] mb-2">✅ Comportamento saudável</p>
                <ul className="text-sm text-[#3D6B5A] leading-relaxed space-y-1">
                  <li>• Nadar explorando o ambiente aos poucos</li>
                  <li>• Respiração regular e tranquila</li>
                  <li>• Interesse por comida em 24-48h</li>
                  <li>• Cores voltando ao normal em 1-2 dias</li>
                  <li>• Reação a estímulos externos</li>
                </ul>
              </motion.div>
            </div>
          </div>

          {/* Cuidados extras */}
          <motion.div className="bg-[#E8E3CC] rounded-2xl p-6 md:p-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h3 className="font-serif text-xl font-semibold mb-3 text-[#2C2416]">⚠️ Cuidados extras</h3>
            <ul className="text-sm text-[#6B5B3E] leading-relaxed space-y-2">
              <li>• Evite alimentar o peixe nas primeiras 24 horas — o sistema digestivo também precisa se adaptar</li>
              <li>• Mantenha a luz do aquário apagada por algumas horas após a introdução, reduzindo o estresse visual</li>
              <li>• Nunca introduza mais de uma espécie nova ao mesmo tempo em aquários pequenos — isso sobrecarrega o filtro biológico e aumenta a competição territorial</li>
              <li>• Se possível, mantenha o peixe novo em quarentena por 1-2 semanas antes de introduzi-lo no aquário principal, evitando a propagação de doenças</li>
            </ul>
          </motion.div>

        </section>

        {/* CTA */}
        <section className="py-14 px-6 text-center bg-[#2C1A0E]">
          <h2 className="font-serif text-3xl font-light text-white mb-2">Ainda tem dúvidas?</h2>
          <p className="text-white/60 mb-6">Nossa equipe está pronta para te ajudar pelo WhatsApp!</p>
          <a href="https://wa.me/5511971526750?text=Ola! Tenho duvidas sobre aclimatacao de peixes." target="_blank" rel="noreferrer" className="bg-[#25D366] text-white px-6 py-3 rounded-full text-sm font-medium inline-flex items-center gap-2 hover:bg-[#1ebe5d] transition-colors">
            <MessageCircle size={18} /> Falar com especialista
          </a>
        </section>

      </div>

      <Footer />
    </div>
  )
}

export default Aclimatacao
