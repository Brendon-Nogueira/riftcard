# 🌌 RiftCards • Player Card Colecionável 3D do League of Legends

Um projeto fullstack moderno construído com **Next.js (App Router)**, **TypeScript** e a **Riot Games Developer API**, que transforma o perfil de qualquer invocador em um Card 3D holográfico colecionável (estilo FIFA Card / Spotify Wrapped).

---

## ✨ Recursos

- 🃏 **Card 3D com Parallax Interativo:** O card reage em tempo real aos movimentos do cursor do mouse, com efeito holográfico de reflexo de luz (*foil sheen*).
- 🔄 **Frente & Verso (3D Flip):**
  - **Frente:** Arte em alta resolução da splash art do campeão favorito, elo, nível, Riot ID (`Nome#TAG`), taxa de vitória e top 3 insígnias.
  - **Verso:** Relatório tático detalhado com distribuição de maestria, pontos totais acumulados, *Mono Score* e rotas.
- 🎖️ **Insígnias Dinâmicas:** Algoritmo exclusivo que analisa os dados do jogador e gera conquistas automáticas como *Monochamp Inveterado*, *Elite de Runeterra*, *Máquina de Vitórias*, *Lenda Imortal* e *Mestre do Smite*.
- 📥 **Exportação para PNG:** Botão com conversão direta de alta resolução para download e compartilhamento no Twitter/X, Discord e Instagram.
- 🔒 **Arquitetura Segura:** A chave da Riot API (`RIOT_API_KEY`) nunca é exposta no frontend, ficando protegida dentro do Route Handler do Next.js (`/api/card`).
- ⚖️ **100% em Conformidade com a Riot Games:** Segue rigorosamente a política *Legal Jibber Jabber* (Lero-lero Jurídico) da Riot para projetos comunitários não-comerciais.

---

## 🚀 Como Executar Localmente

### 1. Clonar e Instalar Dependências

```bash
cd app_lol
npm install
```

### 2. Configurar a Chave da Riot API

Crie um arquivo `.env.local` na raiz do projeto (ou copie de `.env.example`):

```env
RIOT_API_KEY=RGAPI-sua-chave-aqui
```

> **Atenção:** Chaves de desenvolvedor da Riot têm validade de 24 horas no plano gratuito. Gere ou renove sua chave gratuitamente no [Riot Developer Portal](https://developer.riotgames.com/).

### 3. Rodar o Servidor de Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## 🌐 Como Publicar na Vercel

1. Suba o projeto para o seu repositório no GitHub (`git push`).
2. Acesse a [Vercel](https://vercel.com/) e importe o repositório.
3. Nas configurações do projeto na Vercel, acesse **Settings > Environment Variables** e adicione:
   - **Key:** `RIOT_API_KEY`
   - **Value:** `sua-chave-da-riot-api`
4. Clique em **Deploy**. A Vercel cuidará de compilar tanto a interface quanto as rotas serverless da API!

---

## 🛡️ Aviso Legal (Disclaimer Riot Games)

*RiftCards não é endossado pela Riot Games e não reflete as visões ou opiniões da Riot Games ou de qualquer pessoa oficialmente envolvida na produção ou gerenciamento das propriedades da Riot Games. Riot Games e League of Legends são marcas comerciais ou marcas registradas da Riot Games, Inc.*
