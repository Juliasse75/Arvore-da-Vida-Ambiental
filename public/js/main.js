document.getElementById('year').textContent = new Date().getFullYear();

/* ---------------- Menu mobile ---------------- */
const navToggle = document.getElementById('navToggle');
const primaryNav = document.getElementById('primaryNav');
navToggle.addEventListener('click', () => {
  const isOpen = primaryNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});
primaryNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  primaryNav.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}));

/* ---------------- Simulador de diagnóstico ---------------- */
const SIM_DATA = {
  industria: {
    label: 'Indústria / Fábrica',
    needs: [
      {
        id: 'nova-licenca',
        title: 'Preciso abrir ou renovar uma licença',
        desc: 'Empresas que ainda não têm LP/LI/LO ou precisam renovar uma licença vencida.',
        result: {
          title: 'Licenciamento Ambiental + PGRS',
          desc: 'Para indústrias, o caminho passa por três frentes: a licença em si (LP, LI ou LO), o Plano de Gerenciamento de Resíduos Sólidos e o Cadastro Técnico Federal junto ao IBAMA.',
          items: ['Licenciamento Ambiental (LP, LI, LO)', 'PGRS — Plano de Gerenciamento de Resíduos Sólidos', 'CTF/APP IBAMA']
        }
      },
      {
        id: 'residuos',
        title: 'Preciso organizar o descarte de resíduos',
        desc: 'Sua empresa já opera, mas não tem um plano formal de resíduos.',
        result: {
          title: 'PGRS + Gestão de Condicionantes',
          desc: 'Mapeamos a geração, armazenamento e destinação correta dos resíduos, e assumimos a gestão contínua das exigências vinculadas à sua licença.',
          items: ['PGRS — Plano de Gerenciamento de Resíduos Sólidos', 'Gestão de Condicionantes de Licença']
        }
      },
      {
        id: 'autuacao',
        title: 'Fui autuado ou recebi uma multa ambiental',
        desc: 'Você precisa de defesa técnica ou de auditoria de conformidade.',
        result: {
          title: 'Perícia Ambiental + Auditoria de Conformidade',
          desc: 'Atuamos como assistente técnico para refutar ou validar laudos do órgão ambiental, e avaliamos toda a operação contra a legislação vigente.',
          items: ['Perícia Ambiental Judicial e Extrajudicial', 'Auditoria de Conformidade Legal (ISO 14001)']
        }
      },
      {
        id: 'due-diligence',
        title: 'Vou comprar, vender ou expandir uma planta',
        desc: 'Você quer conhecer os riscos ambientais antes de fechar negócio.',
        result: {
          title: 'Due Diligence Ambiental',
          desc: 'Auditoria documental profunda para identificar passivos ambientais e contaminações ocultas antes da transação.',
          items: ['Due Diligence Ambiental', 'Investigação de Passivos e Áreas Contaminadas']
        }
      }
    ]
  },
  construcao: {
    label: 'Construção Civil / Loteamento',
    needs: [
      {
        id: 'supressao',
        title: 'Vou suprimir vegetação para a obra',
        desc: 'O terreno tem vegetação nativa que precisa ser avaliada antes do corte.',
        result: {
          title: 'Inventário Florístico + Licenciamento',
          desc: 'Fazemos o levantamento arbóreo para autorização de supressão e conduzimos o processo de licenciamento da obra em paralelo.',
          items: ['Inventário / Censo Florístico', 'Licenciamento Ambiental (LP, LI, LO)']
        }
      },
      {
        id: 'licenca-obra',
        title: 'Preciso da licença da obra ou loteamento',
        desc: 'Você está no início do projeto e precisa da LP, LI ou LO.',
        result: {
          title: 'Licenciamento Ambiental',
          desc: 'Conduzimos o processo completo junto ao INEA ou à Secretaria Municipal, da licença prévia até a de operação.',
          items: ['Licenciamento Ambiental (LP, LI, LO)', 'Laudo de Cobertura Vegetal']
        }
      },
      {
        id: 'pea',
        title: 'A licença exige programa de educação ambiental',
        desc: 'A LI da sua obra tem como condicionante um PEA para os trabalhadores.',
        result: {
          title: 'PEA — Programa de Educação Ambiental',
          desc: 'Elaboramos e executamos as palestras e treinamentos exigidos como condicionante, com registro de comprovação para o órgão ambiental.',
          items: ['PEA — Programa de Educação Ambiental']
        }
      },
      {
        id: 'recuperacao',
        title: 'O terreno já foi degradado e precisa ser recuperado',
        desc: 'Erosão, corte irregular ou passivo anterior à sua aquisição.',
        result: {
          title: 'PRAD — Plano de Recuperação de Áreas Degradadas',
          desc: 'Projeto técnico de plantio e engenharia para recompor a área e regularizar a situação junto ao órgão ambiental.',
          items: ['PRAD — Plano de Recuperação de Áreas Degradadas']
        }
      }
    ]
  },
  rural: {
    label: 'Produtor Rural / Agropecuária',
    needs: [
      {
        id: 'car',
        title: 'Preciso regularizar minha propriedade',
        desc: 'A propriedade ainda não tem CAR ativo ou precisa de um Programa de Regularização Ambiental.',
        result: {
          title: 'CAR e PRA — Regularização Fundiária Rural',
          desc: 'Cadastramos a propriedade e estruturamos a regularização de Reserva Legal e Área de Preservação Permanente.',
          items: ['CAR — Cadastro Ambiental Rural', 'PRA — Programa de Regularização Ambiental']
        }
      },
      {
        id: 'outorga',
        title: 'Quero outorga de água ou perfurar um poço',
        desc: 'Uso de água superficial ou subterrânea para irrigação ou consumo.',
        result: {
          title: 'Outorga de Recursos Hídricos',
          desc: 'Conduzimos o processo de autorização de uso da água junto ao órgão gestor estadual.',
          items: ['Outorga de Recursos Hídricos']
        }
      },
      {
        id: 'autuacao-rural',
        title: 'Fui autuado pelo IBAMA ou pelo INEA',
        desc: 'Multa ou embargo relacionado a desmatamento ou uso irregular do solo.',
        result: {
          title: 'PRAD + Perícia Ambiental',
          desc: 'Elaboramos o plano de recuperação da área e, quando necessário, atuamos tecnicamente na defesa do processo.',
          items: ['PRAD — Plano de Recuperação de Áreas Degradadas', 'Perícia Ambiental Judicial e Extrajudicial']
        }
      },
      {
        id: 'carbono',
        title: 'Quero acessar crédito de carbono ou certificação',
        desc: 'Sua propriedade tem potencial para monetizar práticas sustentáveis.',
        result: {
          title: 'Inventário de GEE + Créditos de Carbono',
          desc: 'Avaliamos o potencial da propriedade para o mercado voluntário de carbono e estruturamos a documentação necessária.',
          items: ['Inventário de GEE e Créditos de Carbono', 'CAR e PRA — Regularização Fundiária Rural']
        }
      }
    ]
  },
  comercio: {
    label: 'Comércio / Serviços / Saúde',
    needs: [
      {
        id: 'pgrs-com',
        title: 'Preciso do PGRS obrigatório',
        desc: 'Estabelecimentos comerciais, clínicas e oficinas com obrigação de plano de resíduos.',
        result: {
          title: 'PGRS — Plano de Gerenciamento de Resíduos Sólidos',
          desc: 'Elaboramos o plano adequado ao seu tipo de atividade e ao volume gerado.',
          items: ['PGRS — Plano de Gerenciamento de Resíduos Sólidos']
        }
      },
      {
        id: 'laudo-imovel',
        title: 'Quero um laudo antes de comprar um imóvel',
        desc: 'Você está avaliando um terreno ou imóvel e quer entender os riscos ambientais.',
        result: {
          title: 'Laudo de Cobertura Vegetal + Due Diligence',
          desc: 'Avaliamos o bioma, o estado de conservação e eventuais passivos ambientais antes da sua decisão de compra.',
          items: ['Laudo de Cobertura Vegetal', 'Due Diligence Ambiental']
        }
      },
      {
        id: 'esg-treino',
        title: 'Preciso de treinamento ESG para a equipe',
        desc: 'Sua empresa busca um selo verde ou quer engajar o time em práticas sustentáveis.',
        result: {
          title: 'Treinamentos Corporativos em Sustentabilidade',
          desc: 'Workshops sobre descarte correto, redução de consumo e práticas ESG, presenciais ou online.',
          items: ['Treinamentos Corporativos em Sustentabilidade']
        }
      },
      {
        id: 'nao-sei',
        title: 'Não sei exatamente o que preciso',
        desc: 'Prefiro conversar com um consultor antes de decidir.',
        result: {
          title: 'Diagnóstico Gratuito com um Consultor',
          desc: 'Sem problema — fale diretamente com a nossa equipe pelo formulário abaixo e indicaremos o melhor caminho para o seu caso.',
          items: ['Reunião de diagnóstico inicial sem compromisso']
        }
      }
    ]
  }
};

const steps = document.querySelectorAll('.sim-step');
const segmentOptions = document.getElementById('segmentOptions');
const needOptions = document.getElementById('needOptions');
const resultTitle = document.getElementById('resultTitle');
const resultDesc = document.getElementById('resultDesc');
const resultList = document.getElementById('resultList');
const resultCta = document.getElementById('resultCta');
const servicoSelect = document.getElementById('servico');

function goToStep(n) {
  steps.forEach(s => s.classList.toggle('active', Number(s.dataset.step) === n));
}

segmentOptions.querySelectorAll('.sim-option').forEach(btn => {
  btn.addEventListener('click', () => {
    const segment = btn.dataset.segment;
    const data = SIM_DATA[segment];
    needOptions.innerHTML = '';
    data.needs.forEach(need => {
      const el = document.createElement('button');
      el.className = 'sim-option';
      el.innerHTML = `<strong>${need.title}</strong><span>${need.desc}</span>`;
      el.addEventListener('click', () => showResult(need.result));
      needOptions.appendChild(el);
    });
    goToStep(2);
  });
});

function showResult(result) {
  resultTitle.textContent = result.title;
  resultDesc.textContent = result.desc;
  resultList.innerHTML = result.items.map(i => `<li>${i}</li>`).join('');
  resultCta.href = '#contato';
  if (servicoSelect) {
    const match = [...servicoSelect.options].find(o => result.items[0] && o.value && result.items[0].includes(o.value.split(' —')[0]));
    servicoSelect.value = match ? match.value : servicoSelect.value;
  }
  goToStep(3);
}

document.getElementById('simRestart').addEventListener('click', () => goToStep(1));

/* ---------------- Formulário de contato ---------------- */
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  formStatus.className = 'form-status';
  formStatus.textContent = '';

  const payload = Object.fromEntries(new FormData(form).entries());
  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando...';

  try {
    const res = await fetch('/api/contato', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();

    if (data.ok) {
      formStatus.textContent = 'Mensagem enviada! Em breve nossa equipe entrará em contato.';
      formStatus.className = 'form-status ok';
      form.reset();
    } else {
      throw new Error(data.error || 'Erro ao enviar.');
    }
  } catch (err) {
    formStatus.textContent = 'Não foi possível enviar agora. Fale com a gente pelo WhatsApp: (21) 96688-1291.';
    formStatus.className = 'form-status err';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Enviar mensagem';
  }
});
