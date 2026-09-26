require('dotenv').config();
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Limita tentativas de envio do formulário (evita spam/abuso)
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: 'Muitas tentativas. Tente novamente em alguns minutos.' }
});

// Transporte de e-mail (configurado via variáveis de ambiente no Railway)
function getTransporter() {
  if (!process.env.SMTP_HOST) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
}

app.post('/api/contato', contactLimiter, async (req, res) => {
  try {
    const { nome, empresa, email, telefone, servico, mensagem } = req.body;

    if (!nome || !telefone || !email) {
      return res.status(400).json({ ok: false, error: 'Preencha nome, e-mail e telefone.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ ok: false, error: 'E-mail inválido.' });
    }

    const resumo = `
      Novo contato pelo site - Árvore da Vida
      -----------------------------------------
      Nome: ${nome}
      Empresa: ${empresa || '-'}
      E-mail: ${email}
      Telefone/WhatsApp: ${telefone}
      Serviço de interesse: ${servico || '-'}
      Mensagem: ${mensagem || '-'}
    `;

    const transporter = getTransporter();

    if (transporter && process.env.CONTACT_TO_EMAIL) {
      await transporter.sendMail({
        from: `"Site Árvore da Vida" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_TO_EMAIL,
        replyTo: email,
        subject: `Novo contato do site: ${nome} - ${servico || 'Serviço não especificado'}`,
        text: resumo
      });
    } else {
      // Sem SMTP configurado ainda: registra no log do Railway para não perder o lead.
      console.log('[LEAD RECEBIDO - SMTP não configurado]', resumo);
    }

    return res.json({ ok: true });
  } catch (err) {
    console.error('Erro ao processar contato:', err);
    return res.status(500).json({ ok: false, error: 'Erro ao enviar. Tente novamente ou use o WhatsApp.' });
  }
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => {
  console.log(`Árvore da Vida rodando na porta ${PORT}`);
});
