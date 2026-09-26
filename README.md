# Árvore da Vida — Site Institucional

Site institucional em Node.js + Express (backend mínimo) servindo HTML/CSS/JS puro
(frontend leve, sem framework, rápido de carregar em conexão móvel).

## Rodando localmente

```bash
npm install
cp .env.example .env   # preencha depois, não é obrigatório para rodar
npm start
```

Acesse `http://localhost:3000`.

## Estrutura

```
server.js            → servidor Express (arquivos estáticos + /api/contato)
public/index.html    → conteúdo completo do site (seções: hero, sobre, serviços,
                        simulador, depoimentos, contato)
public/css/styles.css→ sistema de design (tokens de cor/tipografia no topo do arquivo)
public/js/main.js    → menu mobile, simulador de diagnóstico, envio do formulário
```

## Publicar no GitHub

```bash
git init
git add .
git commit -m "Site institucional Árvore da Vida"
gh repo create arvore-da-vida-site --private --source=. --push
# ou, sem o GitHub CLI:
git remote add origin https://github.com/SEU_USUARIO/arvore-da-vida-site.git
git branch -M main
git push -u origin main
```

## Publicar no Railway

1. Em [railway.app](https://railway.app), **New Project → Deploy from GitHub repo**
   e selecione o repositório recém-criado.
2. O Railway detecta o Node automaticamente (usa `npm start`, definido em
   `package.json` e reforçado em `railway.json`).
3. Em **Variables**, adicione (opcional, mas recomendado assim que tiver um SMTP):
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO_EMAIL`
   - Sem essas variáveis, o formulário continua funcionando e registra o lead nos
     logs do Railway (para não perder contato), mas o e-mail não é enviado.
4. Gere um domínio em **Settings → Networking → Generate Domain**, ou aponte seu
   domínio próprio (`arvoredavidaambiental.com.br`) como CNAME.

## Antes de publicar de verdade — conferir e ajustar

- [ ] Confirmar telefone/WhatsApp, e-mail e horário de atendimento exatos
  (usei os dados visíveis no site atual — revise no `index.html`, seção `#contato`
  e no rodapé).
- [ ] Preencher o número de registro profissional (CRBio/RT) no rodapé.
- [ ] Trocar os 3 depoimentos-modelo por cases reais (nome, empresa, resultado).
- [ ] Configurar o SMTP para o formulário realmente enviar e-mail.
- [ ] Registrar o domínio próprio e configurar o DNS/CNAME no Railway.
- [ ] Rodar um teste em todos os formulários e no simulador, em mobile.

Veja `PROMPT_ANTIGRAVITY.md` para o prompt completo a colar no Antigravity, caso
queira que o agente refine, gere variações visuais ou já execute o commit + deploy.
