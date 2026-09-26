# Prompt para o Antigravity — Site Árvore da Vida Consultoria Ambiental

Cole o texto abaixo (a partir de "CONTEXTO") diretamente na Manager Surface do
Antigravity, com este repositório aberto como workspace. Ele já contém um site
funcional de partida (Node/Express + HTML/CSS/JS) — o agente deve revisar,
refinar e então executar o versionamento e o deploy.

---

CONTEXTO

Estou construindo o site institucional da **Árvore da Vida — Consultoria e
Serviços Ambientais**, uma consultoria ambiental que atua com licenciamento,
gestão de resíduos, estudos de flora/fauna, recuperação de áreas degradadas,
perícia ambiental forense e educação ambiental/ESG, sediada no Rio de Janeiro
mas atendendo também remotamente outros estados. O diferencial do negócio é a
combinação de rigor técnico-científico (Ciências Biológicas + Gestão
Ambiental) com pós-graduação em Investigação Forense e Perícia e em Educação
Ambiental — isso deve transparecer no tom do site: autoridade técnica, não
"eco-marketing" genérico.

O workspace já tem uma primeira versão completa e funcional do site (Node +
Express servindo `public/index.html`, `public/css/styles.css` e
`public/js/main.js`, com um endpoint `POST /api/contato`). Use-a como base —
não recomece do zero — e trate as tarefas abaixo como um passe de refino e
depois de publicação.

OBJETIVO DESTA SESSÃO

1. Revisar o site existente e refinar o que estiver abaixo do ideal
   (hierarquia visual, copy, responsividade, acessibilidade, performance).
2. Adicionar o que estiver faltando da lista de requisitos abaixo.
3. Inicializar o Git, criar um repositório no GitHub e fazer o commit.
4. Conectar o repositório ao Railway e realizar o deploy.

REQUISITOS DE CONTEÚDO E ESTRUTURA (não remover nada disto)

- Header fixo com logo/nome, navegação (Sobre, Serviços, Diagnóstico Rápido,
  Contato), telefone visível em desktop e botão de WhatsApp sempre visível.
- Hero com proposta de valor clara, CTA duplo (ação principal + secundária) e
  bloco de credenciais/confiança.
- Seção "Sobre Nós" com o manifesto institucional (mantenha o texto já
  presente) e os 4 pilares (Rigor Técnico-Científico, Excelência Operacional,
  Segurança Jurídica, Resultados Sustentáveis).
- Seção "Serviços" organizada nas 5 categorias já estruturadas no código:
  I. Gestão Ambiental Industrial e Licenciamento
  II. Flora, Fauna e Áreas Degradadas
  III. Auditoria, Perícia e Investigação Forense
  IV. Educação Ambiental e ESG Corporativo
  V. Novas Fronteiras (créditos de carbono, CAR/PRA, outorga de recursos
     hídricos, logística reversa) — categoria nova recomendada, mantenha o
     selo "Recomendado".
- Simulador de diagnóstico de 2 passos (segmento → necessidade → resultado)
  já implementado em `public/js/main.js` (objeto `SIM_DATA`) — pode ampliar
  as opções, mas mantenha a lógica de recomendar o serviço certo por segmento.
- Prova social: por enquanto os depoimentos são placeholders identificados
  como tal — não invente citações reais nem atribua depoimentos a empresas
  reais/fictícias como se fossem verdadeiros. Mantenha o aviso de que devem
  ser substituídos por cases reais.
- Seção de contato com: cartão de atendimento (telefone/WhatsApp, e-mail,
  horário, área de atuação) + formulário (nome, empresa, e-mail, telefone,
  serviço de interesse, mensagem) ligado ao endpoint `/api/contato`.
- Botão flutuante de WhatsApp em todas as páginas.
- Rodapé com navegação, especialidades e canais diretos.
- Manter o telefone/WhatsApp (21) 96688-1291 como canal principal — é o
  mesmo já usado no site atual. Confirme comigo o e-mail e o horário antes
  de publicar em produção (estão como texto editável no `index.html`).

REQUISITOS TÉCNICOS

- Stack: Node.js + Express servindo arquivos estáticos (sem framework
  frontend pesado — o site precisa carregar rápido em 3G/4G, público-alvo
  inclui obras e áreas rurais com internet limitada).
- 100% responsivo, testado em 375px, 768px e 1440px de largura.
- Acessibilidade: contraste AA, foco de teclado visível, `alt` em imagens,
  `aria-label` em ícones/botões sem texto.
- SEO on-page: `<title>` e `<meta description>` únicos, um único `<h1>` por
  página, dados estruturados JSON-LD do tipo `LocalBusiness` com nome,
  telefone, endereço e área de atuação.
- Performance: imagens em WebP/AVIF com `loading="lazy"`, sem bibliotecas
  desnecessárias, Lighthouse mobile acima de 90 em Performance e
  Acessibilidade.
- Formulário: validar no client e no servidor (já implementado em
  `server.js`), proteger contra spam (rate limit já implementado; se
  quiser, adicione um honeypot ou reCAPTCHA v3).
- Variáveis sensíveis (SMTP) apenas via `.env` / variáveis de ambiente do
  Railway — nunca hardcoded.

BENCHMARK DE MERCADO (referência de padrão a atingir)

Consultorias ambientais de referência (ERM, Ramboll, WSP, Anthesis, SWCA,
Rincon Consultants, Ambiotech no Brasil) seguem um padrão comum que o site
deve refletir: navegação por linha de serviço bem categorizada, forte ênfase
em credenciais técnicas e conformidade legal, estudos de caso com números
concretos, formulário de contato objetivo e, cada vez mais, uma seção
específica de ESG/carbono. Evite o clichê "verde-limão + folhas soltas": a
direção visual adotada é uma paleta de mata fechada (verde profundo,
quase-preto esverdeado) com um acento âmbar/argila (luz de clareira) sobre
fundo bege-papel, tipografia serifada editorial para títulos (Fraunces) e uma
grotesca simples para leitura (Work Sans) — já implementado nos tokens de
`styles.css`. Mantenha essa direção ao criar novas telas ou variações; não
substitua por um kit de cards genérico com sombras e cantos muito
arredondados.

TAREFAS DE GIT / GITHUB

1. Inicialize o repositório Git na raiz do projeto, se ainda não existir.
2. Garanta que `.env` está no `.gitignore` (já está) e nunca seja commitado.
3. Crie um repositório no GitHub chamado `arvore-da-vida-site` (privado).
4. Faça o commit inicial com uma mensagem clara, ex.:
   `feat: site institucional Árvore da Vida - versão inicial`.
5. Configure o remote `origin` e envie a branch `main`.
6. A cada mudança relevante depois disso, faça commits pequenos e
   descritivos (não um único commit gigante no fim).

TAREFAS DE DEPLOY NO RAILWAY

1. Confirme que `package.json` tem o script `start` apontando para
   `server.js` (já configurado) e que `railway.json` está presente.
2. Crie/conecte um projeto no Railway a partir do repositório GitHub recém
   criado (via CLI do Railway, se disponível no ambiente, ou documente o
   passo a passo exato caso precise ser feito manualmente pelo painel, já
   que a conexão inicial GitHub↔Railway exige autorização OAuth que só o
   usuário pode conceder).
3. Configure as variáveis de ambiente no Railway a partir do
   `.env.example` (peça os valores reais de SMTP ao usuário antes de
   configurar; não invente credenciais).
4. Gere o domínio público do Railway e valide que o site carrega, o
   formulário responde e o link de WhatsApp abre corretamente no celular.
5. Ao final, me devolva: o link do repositório GitHub, o link do deploy no
   Railway e uma lista do que foi alterado em relação à versão de partida.

CRITÉRIOS DE ACEITE

- [ ] Site publicado e acessível pela URL do Railway.
- [ ] Todas as seções da lista de conteúdo presentes e revisadas.
- [ ] Simulador funcionando nos 4 segmentos.
- [ ] Formulário envia e retorna mensagem de sucesso/erro.
- [ ] Responsivo sem quebras visuais em mobile.
- [ ] Lighthouse mobile ≥ 90 em Performance e Acessibilidade.
- [ ] Repositório no GitHub com histórico de commits organizado.
- [ ] Nenhuma credencial sensível commitada.

Antes de começar a implementar, me apresente brevemente seu plano (arquivos
que vai tocar e ordem das tarefas) para eu confirmar.
