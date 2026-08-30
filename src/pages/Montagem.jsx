import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

function Montagem() {
  return (
    <div className="bg-[#F4F1E1] min-h-screen">
      <Header />

      <div className="pt-16">

        {/* Banner */}
        <section className="bg-[#F4E9D8] px-6 md:px-8 py-10 grid md:grid-cols-2 gap-8 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-serif text-4xl md:text-5xl font-semibold leading-tight mb-3 text-[#2C2416]">Montagem e Ciclagem Metazoa</h1>
            <p className="text-[#7A6A52] max-w-md">Guia completo para criar um ambiente saudável desde o início.</p>
          </motion.div>
          <motion.div className="rounded-xl overflow-hidden h-56" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <img src="https://i.postimg.cc/pTLv8g7n/Gemini-Generated-Image-ohwjy3ohwjy3ohwj.jpg" alt="Montagem de aquário" className="w-full h-full object-cover" />
          </motion.div>
        </section>

        {/* Parte 1 */}
        <section className="px-6 md:px-8 py-10 max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl font-semibold mb-6 text-[#2C2416]">Parte 1: Montagem do Aquário</h2>
          <div className="flex flex-col gap-8">

            <motion.div className="grid md:grid-cols-[240px_1fr] gap-5 items-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <img src="https://i.postimg.cc/V6qtr0xJ/Gemini-Generated-Image-1fcwv1fcwv1fcwv1.jpg" alt="Substrato e hardscape" className="w-full h-44 object-cover rounded-xl" />
              <div>
                <h3 className="font-semibold mb-1 text-[#2C2416]">1. Substrato e Hardscape</h3>
                <p className="text-sm text-[#7A6A52] leading-relaxed">Distribua o substrato e monte a base do cenário com pedras e troncos antes de adicionar água. Planeje a composição desde o início, pensando na temperatura ideal entre 24°C e 28°C para espécies tropicais.</p>
              </div>
            </motion.div>

            <motion.div className="grid md:grid-cols-[240px_1fr] gap-5 items-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
              <img src="https://i.postimg.cc/9FF90M1s/Gemini-Generated-Image-mk0tkxmk0tkxmk0t.jpg" alt="Decoração e plantio" className="w-full h-44 object-cover rounded-xl" />
              <div>
                <h3 className="font-semibold mb-1 text-[#2C2416]">2. Decoração e Plantio</h3>
                <p className="text-sm text-[#7A6A52] leading-relaxed">Adicione uma boa variedade de decoração e plantio, distribuindo as espécies conforme o crescimento e a altura, para dar profundidade e naturalidade ao aquário.</p>
              </div>
            </motion.div>

            <motion.div className="grid md:grid-cols-[240px_1fr] gap-5 items-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
              <img src="https://i.postimg.cc/ZKR9ZQK7/Gemini-Generated-Image-rky2odrky2odrky2.jpg" alt="Água e equipamentos" className="w-full h-44 object-cover rounded-xl" />
              <div>
                <h3 className="font-semibold mb-1 text-[#2C2416]">3. Água e Equipamentos</h3>
                <p className="text-sm text-[#7A6A52] leading-relaxed">Introduza a água com cuidado — isso é essencial. Instale filtro, aquecedor e iluminação, e use sempre um condicionador para remover cloro e metais pesados, protegendo as futuras bactérias benéficas do aquário.</p>
              </div>
            </motion.div>

          </div>
        </section>

        {/* Parte 2 - Ciclagem detalhada */}
        <section className="px-6 md:px-8 py-12 bg-white">
          <div className="max-w-4xl mx-auto">

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <h2 className="font-serif text-3xl font-semibold mb-2 text-center text-[#2C2416]">Parte 2: Roteiro da Ciclagem</h2>
              <p className="text-center text-[#7A6A52] max-w-xl mx-auto mb-10">A ciclagem é o processo mais importante — e mais ignorado — na montagem de um aquário. Sem ela, os primeiros peixes podem morrer por intoxicação.</p>
            </motion.div>

            {/* O que é */}
            <motion.div className="mb-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <h3 className="font-serif text-xl font-semibold mb-3 text-[#2C2416]">O que é a ciclagem?</h3>
              <p className="text-sm text-[#4A3B2A] leading-relaxed mb-3">
                Ciclar um aquário significa estabelecer uma colônia de <strong>bactérias benéficas</strong> (principalmente <em>Nitrosomonas</em> e <em>Nitrobacter</em>) no filtro e no substrato. Essas bactérias são responsáveis por converter substâncias tóxicas produzidas pelos próprios peixes — através das fezes, urina e restos de ração — em compostos cada vez menos nocivos.
              </p>
              <p className="text-sm text-[#4A3B2A] leading-relaxed">
                Sem essa colônia estabelecida, a amônia se acumula rapidamente e queima as guelras dos peixes, podendo matá-los em poucos dias. Por isso, todo aquário novo precisa ser ciclado <strong>antes</strong> de receber os primeiros animais — ou de forma bem controlada, no caso da ciclagem com peixes.
              </p>
            </motion.div>

            {/* Diagrama do ciclo */}
            <motion.div className="bg-[#F4F1E1] rounded-2xl p-8 mb-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <p className="text-center text-xs font-medium tracking-widest uppercase text-[#9C8A6A] mb-6">Ciclo do Nitrogênio</p>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-white font-serif font-semibold text-lg" style={{ backgroundColor: '#C0392B' }}>NH₃</div>
                  <p className="text-sm font-medium mt-2 text-[#2C2416]">Amônia</p>
                  <p className="text-xs text-[#9C8A6A]">(NH₃/NH₄+)</p>
                </div>
                <span className="text-[#9C8A6A] text-3xl mb-8">⟶</span>
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-white font-serif font-semibold text-lg" style={{ backgroundColor: '#D68910' }}>NO₂</div>
                  <p className="text-sm font-medium mt-2 text-[#2C2416]">Nitrito</p>
                  <p className="text-xs text-[#9C8A6A]">(NO₂-)</p>
                </div>
                <span className="text-[#9C8A6A] text-3xl mb-8">⟶</span>
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-white font-serif font-semibold text-lg" style={{ backgroundColor: '#5B8C7A' }}>NO₃</div>
                  <p className="text-sm font-medium mt-2 text-[#2C2416]">Nitrato</p>
                  <p className="text-xs text-[#9C8A6A]">(NO₃-)</p>
                </div>
              </div>

              <p className="text-sm text-[#7A6A52] leading-relaxed mt-5 text-center mb-6">O processo bacteriano transforma a amônia tóxica em nitrito, e depois em nitrato, através da ação de bactérias benéficas no filtro e substrato.</p>

              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white rounded-lg p-4">
                  <p className="font-semibold mb-1" style={{ color: '#C0392B' }}>Amônia (NH₃)</p>
                  <p className="text-[#7A6A52] leading-relaxed">Altamente tóxica mesmo em concentrações baixas. É produzida pela decomposição de matéria orgânica e pela respiração dos peixes. A bactéria <em>Nitrosomonas</em> a converte em nitrito.</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="font-semibold mb-1" style={{ color: '#D68910' }}>Nitrito (NO₂⁻)</p>
                  <p className="text-[#7A6A52] leading-relaxed">Ainda tóxico, prejudica a capacidade do sangue dos peixes de transportar oxigênio. A bactéria <em>Nitrobacter</em> o converte em nitrato.</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="font-semibold mb-1" style={{ color: '#5B8C7A' }}>Nitrato (NO₃⁻)</p>
                  <p className="text-[#7A6A52] leading-relaxed">Muito menos tóxico. Se acumula com o tempo e é removido principalmente através das trocas parciais de água semanais.</p>
                </div>
              </div>
            </motion.div>

            {/* Métodos */}
            <motion.div className="mb-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <h3 className="font-serif text-xl font-semibold mb-4 text-[#2C2416]">Métodos de ciclagem</h3>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="border border-[#D9D2B0] rounded-xl p-5">
                  <p className="font-semibold text-sm mb-2">🐟 Ciclagem com peixes</p>
                  <p className="text-sm text-[#7A6A52] leading-relaxed">Usa poucos peixes resistentes desde o início para gerar amônia naturalmente. É mais arriscada — exige trocas de água frequentes e monitoramento diário — mas é o método tradicional mais usado.</p>
                </div>
                <div className="border border-[#D9D2B0] rounded-xl p-5">
                  <p className="font-semibold text-sm mb-2">🧪 Ciclagem sem peixes</p>
                  <p className="text-sm text-[#7A6A52] leading-relaxed">Usa fontes de amônia pura (comercial ou caseira) para alimentar as bactérias sem colocar nenhum animal em risco. É o método mais seguro e recomendado, principalmente para iniciantes.</p>
                </div>
              </div>
            </motion.div>

            {/* Linha do tempo */}
            <motion.div className="mb-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <h3 className="font-serif text-xl font-semibold mb-4 text-[#2C2416]">Linha do tempo esperada</h3>
              <div className="flex flex-col gap-3">
                <div className="flex gap-4 items-start">
                  <span className="bg-[#5B8C7A] text-white text-xs font-medium px-3 py-1 rounded-full flex-shrink-0 mt-0.5">Semana 1</span>
                  <p className="text-sm text-[#7A6A52]">Pico de amônia. A água pode ficar turva. É normal — as bactérias ainda não se estabeleceram.</p>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="bg-[#D68910] text-white text-xs font-medium px-3 py-1 rounded-full flex-shrink-0 mt-0.5">Semana 2-3</span>
                  <p className="text-sm text-[#7A6A52]">A amônia começa a cair e o nitrito sobe, indicando que a primeira colônia bacteriana está ativa.</p>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="bg-[#3D6B5A] text-white text-xs font-medium px-3 py-1 rounded-full flex-shrink-0 mt-0.5">Semana 4-6</span>
                  <p className="text-sm text-[#7A6A52]">Nitrito cai a zero e o nitrato aparece de forma estável. O aquário está oficialmente ciclado e pronto para receber a população completa de peixes.</p>
                </div>
              </div>
            </motion.div>

            {/* Checklist */}
            <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <h3 className="font-semibold mb-3 text-[#2C2416]">Checklist de Equipamentos Essenciais</h3>
              <p className="text-sm text-[#2C2416] leading-relaxed">
                🧊 Filtro,&nbsp; 🌡️ Aquecedor,&nbsp; 🌡️ Termômetro,&nbsp; 🔍 Kit de Testes,&nbsp; 💧 Condicionador de Água.
              </p>
            </motion.div>

            <motion.div className="bg-[#E8F0E4] rounded-lg p-5" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <p className="text-sm text-[#3D6B5A]"><span className="font-semibold">Dica Pro:</span> Teste a água todos os dias durante a ciclagem, sempre no mesmo horário. Anote os valores — ver a curva de amônia subir e depois cair é o sinal mais confiável de que o processo está funcionando. Nunca adicione todos os peixes de uma vez, mesmo depois de ciclado: introduza aos poucos para não sobrecarregar a colônia bacteriana.</p>
            </motion.div>

          </div>
        </section>

        {/* CTA */}
        <section className="py-14 px-6 text-center bg-[#2C1A0E]">
          <h2 className="font-serif text-3xl font-light text-white mb-2">Ainda tem dúvidas?</h2>
          <p className="text-white/60 mb-6">Nossa equipe está pronta para te ajudar pelo WhatsApp!</p>
          <a href="https://wa.me/5511971526750?text=Ola! Tenho duvidas sobre montagem e ciclagem de aquario." target="_blank" rel="noreferrer" className="bg-[#25D366] text-white px-6 py-3 rounded-full text-sm font-medium inline-flex items-center gap-2 hover:bg-[#1ebe5d] transition-colors">
            <MessageCircle size={18} /> Falar com especialista
          </a>
        </section>

      </div>

      <Footer />
    </div>
  )
}

export default Montagem
