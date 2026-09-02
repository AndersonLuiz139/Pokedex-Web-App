# ⚡ Pokédex com Next.js

Este é um projeto **Pokédex** desenvolvido com **Next.js**, consumindo a **PokeAPI** para exibir informações sobre Pokémons.  
O usuário pode pesquisar, visualizar detalhes e **favoritar Pokémons**, com persistência de favoritos no **localStorage**.  

---

## 🌟 Funcionalidades

- 🔍 **Listagem de Pokémons:** Exibe Pokémons com ID, nome e imagem.  
- ⭐ **Favoritos:** Usuários podem favoritar/desfavoritar Pokémons (persistido no `localStorage`).  
- 📖 **Detalhes do Pokémon:** Exibição de informações detalhadas de cada Pokémon.  
- 🔄 **Alternar entre Lista e Card View** (opcional no header).  
- ⬅️ **Botão de voltar** na página de favoritos.    

---

## 🛠️ Tecnologias Utilizadas

- **Next.js** → Framework React para renderização híbrida.  
- **TypeScript** → Tipagem estática para mais segurança no código.  
- **Axios** → Requisições HTTP para consumir a API.  
- **CSS Modules** → Estilização com escopo local.  
- **PokeAPI** → API pública de Pokémons.  

---

## 🚀 Instalação e Execução do Projeto
Siga os passos abaixo para rodar o projeto localmente.

### 🔄 1. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/pokedex.git
cd pokedex
```

### 2️⃣ Instalar dependências

```bash
npm install
npm install axios
```

### 3️⃣ Rodar o servidor de desenvolvimento

```bash
npm run dev
```
O projeto ficara disponível em:
```bash
http://localhost:3000
```

### 📂 Estrutura de Pastas

```bash
📦 pokedex
 ┣ 📂 app
 ┃ ┣ 📂 components      # Componentes reutilizáveis (Header, Footer, etc.)
 ┃ ┣ 📂 favoritos       # Página de favoritos
 ┃ ┣ 📂 hooks           # Custom Hook (useFavorites)
 ┃ ┣ 📂 styles          # CSS Modules
 ┃ ┣ page.tsx           # Página principal
 ┃ ┗ layout.tsx         # Layout base
 ┣ 📜 package.json
 ┣ 📜 README.md
```

### 🔑 Principais Endpoints da PokeAPI usados

Listar Pokémons (limitado a 151):
```bash
GET https://pokeapi.co/api/v2/pokemon?limit=100
```

Buscar detalhes de um Pokémon
```bash
GET https://pokeapi.co/api/v2/pokemon/{id}
```

## 🎮 Como Usar

1. Abra o projeto em `http://localhost:3000/`.  
2. Veja a lista de Pokémons com **ID, Nome e Imagem**.  
3. Clique no botão ⭐ para **favoritar/desfavoritar** um Pokémon.  
4. Vá até a aba **Favoritos** e visualize todos os Pokémons salvos.  
5. Clique em ⬅️ **Voltar** para retornar à lista principal.

### 👨‍💻 Autor

Projeto desenvolvido por Anderson Luiz.
📧 Contato: namechina09@gmail.com
🔗 GitHub: https://github.com/AndersonLuiz139
