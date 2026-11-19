# 🐠 Metazoa Store

Loja online especializada em aquarismo e vida animal — peixes ornamentais de água doce e marinhos, plantas aquáticas, equipamentos e acessórios.

🔗 **[metazoastore.vercel.app](https://metazoastore.vercel.app/#/)** · 📷 [@metazoa_store](https://www.instagram.com/metazoa_store/)

---

## 📸 Sobre o Projeto

A Metazoa Store é um e-commerce de aquarismo **em produção**, desenvolvido e mantido do zero por mim — do frontend ao banco de dados. O catálogo reúne **600+ peixes e plantas** e **900+ produtos** de vários fornecedores, com filtros por categoria, busca tolerante a erros de digitação, páginas de detalhe, carrinho e fechamento de pedido via WhatsApp.

Como a maior parte do tráfego vem do celular, o projeto é pensado **mobile-first**.

---

## 🚀 Tecnologias

| Tecnologia | Uso |
|---|---|
| ⚛️ React 19 | Interface |
| ⚡ Vite | Build e desenvolvimento |
| 🎨 Tailwind CSS | Estilização |
| 🔀 React Router DOM v7 | Navegação (HashRouter) |
| 🗄️ Supabase (PostgreSQL) | Banco de dados com Row Level Security |
| ☁️ Cloudinary | Hospedagem e otimização de imagens |
| 🎞️ Framer Motion | Animações |
| 🔣 Lucide React | Ícones |
| 📱 PWA | Instalável no celular |
| 🚀 Vercel | Hospedagem e deploy contínuo |

---

## ✨ Funcionalidades

**Catálogo**
- 🐟 Catálogo de peixes, plantas e produtos com filtros por categoria e subcategoria (água doce, marinho, produtos & acessórios)
- 📏 **Variantes de tamanho** — o mesmo peixe em tamanhos diferentes aparece como um único card, com seletor de tamanho na página de detalhe (tamanhos indisponíveis aparecem desabilitados)
- 🚫 **Controle de disponibilidade** — itens indisponíveis ficam em escala de cinza, com badge "Indisponível", vão para o fim da lista e trocam o botão de compra por "Consultar disponibilidade" no WhatsApp
- 📄 Paginação client-side ("Carregar mais", 24 itens por vez) para manter o catálogo leve

**Busca** — motor próprio (`src/lib/fuzzySearch.js`), compartilhado entre o Header e o Catálogo
- 🔀 **Palavras em qualquer ordem** — "bandeira acará" encontra "Acará Bandeira"; cada palavra digitada precisa aparecer no item
- 🗣️ **Compara pelo som, não letra por letra** — ignora acentos, maiúsculas e pontuação; letras dobradas viram uma só (`ocellaris` = `ocelaris`, `betta` = `beta`); trocas comuns de grafia são igualadas (y/i, ph/f, k/c, w/v, z/s, ch/c, h mudo); plural no fim é ignorado
- ⌨️ **Tolera erros de digitação** — distância de edição Damerau (inclui letras trocadas de lugar): 1 erro em palavras de 4–6 letras, 2 em palavras maiores
- ✍️ **Busca enquanto digita** — aceita palavra pela metade (`ocel` → *ocellaris*)
- 📚 **Sinônimos do aquarismo** — `pleco` = cascudo, `nemo` = palhaço, `goldfish` = kinguio, `aquecedor` = termostato…
- 🔢 **Códigos de cascudo normalizados** — `L 66`, `L-066` e `l66` viram todos `L066`
- 🎯 **Ranking por relevância** — nome pesa mais que categoria, palavras raras pesam mais que comuns, a frase exata no nome vai para o topo; quando existe resultado certeiro, os parecidos só por erro de digitação somem (ex.: "aruana" não traz "aranha")

**Compra**
- 🛒 Carrinho com controle de quantidade (soma automática quando o item já está no carrinho)
- 💬 Fechamento do pedido pelo WhatsApp com mensagem montada a partir do carrinho
- 🤖 Chatbot de atendimento e botão flutuante do WhatsApp

**Home**
- Hero, carrossel infinito de **marcas parceiras** e seção de categorias
- 🆕 Carrossel **Novidades** — todos os peixes disponíveis com o badge "Novidade", do mais recente para o mais antigo, em loop automático e com um card por grupo de tamanhos; a seção some sozinha quando não há novidades
- Carrossel de **Destaques** de peixes
- Carrossel **Produtos em destaque** — sorteia entre os produtos mais recentes com foto e disponíveis (sem peças de reposição), marcando os mais novos com "Novidade"
- Páginas Sobre e Guia de Cuidados para aquaristas

**Performance & mobile**
- 🖼️ Imagens servidas pelo Cloudinary com transformações na URL (`f_auto,q_auto,w_<largura>`), `loading="lazy"` e `decoding="async"`
- Filtros em scroll horizontal no mobile, botões flutuantes respeitando `safe-area-inset`, imagens com `object-contain` para não cortar fotos de produto

---

## 🖼️ Migração de imagens para o Cloudinary

As imagens originalmente ficavam no postimg.cc, que bloqueia proxies de otimização por *hotlink protection*. A solução foi um script Node de migração única (`migrar-imagens-cloudinary.js`) que:

1. Pede ao Cloudinary para buscar cada imagem diretamente da URL original
2. Atualiza a linha correspondente no Supabase com a nova URL
3. É **idempotente** — pula o que já está no Cloudinary, então pode ser rodado de novo com segurança
4. Faz **retry automático** (até 3 tentativas com backoff) para falhas transitórias

Resultado: 700+ imagens migradas, o que permitiu ativar a otimização automática por URL em todo o site.

Todas as credenciais (Cloudinary e `service_role` do Supabase) são lidas de **variáveis de ambiente** — nenhuma chave fica no código.

---

## 🗄️ Banco de Dados (Supabase)

### Tabela `peixes`

| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | uuid | Identificador único |
| `nome` | text | Nome do peixe/planta |
| `nome_cientifico` | text | Nome científico |
| `categoria` | text | Categoria (ver abaixo) |
| `preco` | text | Preço |
| `badge` | text | Destaque (ex.: Novidade, Popular, Raro) — "Novidade" alimenta o carrossel da Home |
| `imagem_url` | text | URL da imagem (Cloudinary) |
| `disponivel` | boolean | Disponibilidade (padrão `true`) |
| `grupo_variante` | text | Agrupa tamanhos do mesmo peixe |
| `variante_nome` | text | Nome do tamanho (ex.: Pq, Md) |
| `variante_ordem` | int | Ordem de exibição do tamanho |
| `nome_base` | text | Nome exibido no card agrupado |
| `criado_em` | timestamp | Data de criação |

### Tabela `produtos`

| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | uuid | Identificador único |
| `nome` | text | Nome do produto |
| `descricao` | text | Descrição |
| `categoria` | text | Categoria (ver abaixo) |
| `preco` | text | Preço |
| `badge` | text | Destaque |
| `imagem_url` | text | URL da imagem (Cloudinary) |
| `disponivel` | boolean | Disponibilidade (padrão `true`) |
| `criado_em` | timestamp | Data de criação |

### Categorias

**Peixes e plantas:** Primitivos · Amazônicos · Variados · Jumbos · Cascudos · Ciclídeos Africanos · Betta · Ovovíparos · Kinguios & Carpas · Killifish e Rainbow Fishs · Marinho · Plantas

**Produtos (principais):** Filtros · Bombas de Circulação · Bombas de Recalque · Wavemakers · Termostatos · Compressores de Ar · Luminárias · Skimmers · Aquários · Terrários · Substratos · Rações · Alimentos Vivos · Suplementos · Sal Marinho · Medidores · Decoração (Aquascape) · Acessórios · Peças de Reposição

> ⚠️ Os valores de categoria no frontend precisam bater **exatamente** com o banco, incluindo acentos — uma diferença de acento quebra o filtro silenciosamente.

---

## ⚙️ Como Rodar Localmente

**Pré-requisitos:** Node.js 18+ e uma conta no Supabase.

```bash
git clone https://github.com/PedroMSBarros/Metazoa-store.git
cd Metazoa-store
npm install --legacy-peer-deps
cp .env.example .env
```

Configure o `.env`:

```env
VITE_SUPABASE_URL=https://SEU_PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=SUA_CHAVE_ANON
```

```bash
npm run dev
```

Acesse em `http://localhost:5173`.

---

## 🚀 Deploy

Deploy automático na Vercel: cada push na branch `main` gera um novo deploy. Para configurar, importe o repositório na Vercel e defina `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` nas variáveis de ambiente.

---

## 📞 Contato

💬 WhatsApp: pelo botão no site · 📷 Instagram: [@metazoa_store](https://www.instagram.com/metazoa_store/) · 🌐 [metazoastore.vercel.app](https://metazoastore.vercel.app/#/)

Desenvolvido por **[Pedro Barros](https://github.com/PedroMSBarros)**, fundador da Metazoa Store. Feito com 🐠 para amantes de aquarismo.
