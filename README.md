# 🐠 Metazoa Store

> Loja online especializada em aquarismo e vida animal — peixes ornamentais de água doce e marinhos, plantas aquáticas e acessórios.

🔗 **[metazoastore.vercel.app](https://metazoastore.vercel.app/#/)**

---

## 📸 Sobre o Projeto

A **Metazoa Store** é uma loja virtual de aquarismo desenvolvida do zero com tecnologias modernas. O site conta com catálogo completo de animais e produtos, filtros por categoria, barra de pesquisa, páginas de detalhe para cada produto e integração direta com WhatsApp para atendimento ao cliente.

---

## 🚀 Tecnologias Utilizadas

| Tecnologia | Descrição |
|---|---|
| ⚛️ React 19 | Framework principal para construção da interface |
| 🎨 Tailwind CSS | Estilização com classes utilitárias |
| 🔀 React Router DOM v7 | Navegação entre páginas (HashRouter) |
| 🗄️ Supabase | Banco de dados PostgreSQL na nuvem |
| 🎞️ Framer Motion | Animações e transições suaves |
| 🔣 Lucide React | Biblioteca de ícones |
| 📱 PWA | Instalável como aplicativo no celular |
| ⚡ Vite | Ferramenta de build e desenvolvimento |
| 🚀 Vercel | Hospedagem e deploy contínuo |

---

## ✨ Funcionalidades

- 🏠 **Home** com hero animado, seção de categorias com vídeos, destaques e seção sobre
- 🔍 **Barra de pesquisa** em tempo real por nome, espécie ou categoria
- 🐟 **Catálogo completo** com filtros por categoria e subcategorias de água doce
- 📄 **Página de detalhe** de cada peixe/produto com informações e botões de contato
- 💬 **Integração WhatsApp** com mensagem personalizada por produto
- 📱 **Design responsivo** para desktop e mobile
- 🎬 **Vídeos em autoplay** no desktop e fotos no mobile para cada categoria
- 🌿 **Página Sobre** com história e valores da loja
- 💡 **Guia de Cuidados** com 9 dicas essenciais para aquaristas
- 🔄 **Botão flutuante** do WhatsApp em todas as páginas

---

## 📂 Estrutura do Projeto

```
metazoa-store/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── Categorias.jsx
│   │   ├── Destaques.jsx
│   │   ├── Sobre.jsx
│   │   ├── Cuidados.jsx
│   │   ├── Footer.jsx
│   │   └── WhatsAppFloat.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Catalogo.jsx
│   │   ├── Sobre.jsx
│   │   ├── Cuidados.jsx
│   │   ├── PeixeDetalhe.jsx
│   │   └── ProdutoDetalhe.jsx
│   ├── lib/
│   │   └── supabase.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
│   └── manifest.json
├── .env
├── .npmrc
├── vite.config.js
└── package.json
```

---

## 🗄️ Banco de Dados (Supabase)

### Tabela `peixes`

| Coluna | Tipo | Descrição |
|---|---|---|
| id | uuid | Identificador único |
| nome | text | Nome do peixe |
| nome_cientifico | text | Nome científico |
| categoria | text | Categoria (Agua Doce, Marinho, etc.) |
| preco | text | Preço |
| badge | text | Destaque (Novo, Popular, Raro) |
| imagem_url | text | URL da imagem |
| criado_em | timestamp | Data de criação |

### Tabela `produtos`

| Coluna | Tipo | Descrição |
|---|---|---|
| id | uuid | Identificador único |
| nome | text | Nome do produto |
| descricao | text | Descrição do produto |
| categoria | text | Categoria (Acessorios, Outros) |
| preco | text | Preço |
| badge | text | Destaque |
| imagem_url | text | URL da imagem |
| criado_em | timestamp | Data de criação |

### Categorias de Água Doce
`Primitivos` · `Amazônicos` · `Variados` · `Jumbos` · `Cascudos` · `Ciclídeos Africanos`

---

## ⚙️ Como Rodar Localmente

### Pré-requisitos
- Node.js 18+
- Conta no [Supabase](https://supabase.com)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/PedroMSBarros/Metazoa-store.git
cd Metazoa-store

# Instale as dependências
npm install --legacy-peer-deps

# Crie o arquivo de variáveis de ambiente
cp .env.example .env
```

### Configure o `.env`

```env
VITE_SUPABASE_URL=https://SEU_PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=SUA_CHAVE_ANON
```

### Rode o projeto

```bash
npm run dev
```

Acesse em **http://localhost:5173**

---

## 🚀 Deploy

O projeto está configurado para deploy automático na **Vercel**. Cada push na branch `main` dispara um novo deploy automaticamente.

Para configurar o deploy:
1. Importe o repositório na [Vercel](https://vercel.com)
2. Configure as variáveis de ambiente (`VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`)
3. Deploy!

---

## 📱 PWA

O site pode ser instalado como aplicativo no celular. Acesse o site pelo Chrome/Safari e clique em **"Adicionar à tela inicial"**.

---

## 📞 Contato

- 💬 WhatsApp: [Fale conosco](https://wa.me/5511971526750)
- 📷 Instagram: [@metazoa_store](https://instagram.com/metazoa_store)
- 🌐 Site: [metazoastore.vercel.app](https://metazoastore.vercel.app/#/)

---

<p align="center">Feito com 🐠 para amantes de aquarismo</p>
