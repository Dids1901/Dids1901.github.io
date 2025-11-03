// scripts.js

// ================== TRADUÇÃO ==================
const TRANSLATIONS = {
  pt: {
    // NAV
    "nav.about": "Sobre Mim",
    "nav.projects": "Projetos",
    "nav.qualifications": "Qualificações",
    "nav.competitions": "Competições",
    "nav.education": "Formação",
    "nav.skills": "Habilidades",
    "nav.contact": "Contato",

    // LANG
    "lang.pt": "Português (Brasil)",
    "lang.en": "Inglês (EUA)",

    // HERO
    "hero.title": "Olá, sou Diogo",
    "hero.subtitle": "um entusiasta da tecnologia apaixonado por inovação e impacto",
    "hero.paragraph": "Meu maior objetivo é deixar um impacto significativo no mundo, criando projetos inovadores que beneficiem o maior número possível de pessoas. Estou comprometido em me dedicar ao máximo e enfrentar qualquer desafio para transformar essa visão em realidade.",
    "hero.cta": "Entre em Contato",

    // PROJECTS
    "projects.title": "Explore meus Projetos e Criações",
    "project.visit": "Visitar Site",

    "project.unwind.short": "Comunidade para filmes, séries e games.",
    "project.unwind.full": "O Unwind é um aplicativo social para filmes, séries e jogos. Inicialmente desenvolvido em Java com Android Studio, foi refatorado para React Native, tornando-se multiplataforma. O app combina elementos de rede social, como perfis, posts, curtidas e comentários, com organização de mídias e um sistema avançado de recomendações baseado no consumo do usuário. Para coletar as informações das mídias, utilizei Web Scraping em Python e integrei TMDB e IGDB. Todos os dados ficam no Firebase.",

    "project.flavia.title": "Flávia Advocacia",
    "project.flavia.short": "Site completo para escritório de advocacia.",
    "project.flavia.full": "Desenvolvi o site institucional da Flávia Coutinho Advocacia, focando em responsividade, identidade visual profissional e funcionalidade prática para clientes. O site inclui páginas de apresentação, áreas de atuação e um formulário de contato funcional. Fui responsável desde a criação até a compra e gerenciamento de domínio, hospedagem e configuração de e-mail profissional.",

    "project.lodge.title": "Website Lodge",
    "project.lodge.short": "Site responsivo para empresa Lodge Engenharia.",
    "project.lodge.full": "Desenvolvi o site institucional da Lodge Engenharia, meu primeiro trabalho profissional. O site apresenta a empresa, seus serviços e portfólio de projetos concluídos, garantindo uma navegação intuitiva. Criado com HTML, CSS e JavaScript, possui um design responsivo e moderno, oferecendo uma presença digital mais profissional à empresa.",

    "project.sudoku.title": "Solucionador de Sudoku",
    "project.sudoku.short": "Solucionador automático de Sudoku.",
    "project.sudoku.full": "Desenvolvi um solucionador de Sudoku em Python como desafio pessoal, exigindo raciocínio lógico e programação avançada. O software analisa as regras do jogo e resolve qualquer tabuleiro automaticamente. Para facilitar o uso, criei uma interface gráfica com Tkinter, permitindo que os usuários insiram os números manualmente e obtenham a solução de forma interativa.",

    "project.car.title": "Carrinho com Garras",
    "project.car.short": "Carrinho robótico com Bluetooth.",
    "project.car.full": "Construí um carrinho robótico com uma garra acoplada, utilizando um kit da EletroGate como base, mas realizando modificações para otimizar sua eficiência. Integrei um módulo Bluetooth HC-05 para controle via celular com o aplicativo Dabble. O projeto envolveu programação em Arduino, montagem de circuitos e adaptação de componentes como motores, microservo e módulo ponte H L298N.",

    "project.whatsapp.title": "Automação WhatsApp",
    "project.whatsapp.short": "Automação de tarefas no WhatsApp.",
    "project.whatsapp.full": "Utilizando Python, Selenium e Web Scraping, desenvolvi um sistema para automatizar o envio de mensagens no WhatsApp. O usuário pode definir uma lista de contatos, programar mensagens e escolher horários para envio automático. Esse projeto me introduziu à automação da web, conhecimento que apliquei posteriormente em projetos como conversores de moeda, extração de dados do LinkedIn e coleta das mídias mais relevantes para usar no Unwind.",

    // COMPETIÇÕES
    "competitions.title": "Minhas Conquistas em Competições",
    "competitions.tab.abb": "Visão Computacional",
    "competitions.tab.w1": "Plataforma de Holding",
    "competitions.tab.vestibular": "Bolsa por Mérito",

    "competitions.abb.badge": "🏆 Vencedor",
    "competitions.abb.projectTitle": "Plataforma de Segurança e Monitoramento de EPIs",
    "competitions.abb.description": "Criei o conceito e o protótipo de uma plataforma inovadora para aumentar a segurança do trabalho através da gamificação e monitoramento inteligente do uso de EPIs. A solução utiliza visão computacional, gestão de equipes e rastreamento em tempo real para prevenir acidentes.",
    "competitions.abb.stackTitle": "Minha Contribuição:",
    "competitions.abb.stack1": "Idealização",
    "competitions.abb.stack2": "UX/UI Design",
    "competitions.abb.stack3": "Prototipagem",
    "competitions.abb.stack4": "Business Plan",
    "competitions.abb.button": "Acessar Protótipo",

    "competitions.w1.badge": "🏅 Finalista",
    "competitions.w1.projectTitle": "Plataforma de Gestão de Holdings",
    "competitions.w1.description": "Desenvolvi uma plataforma web completa e funcional para automatizar e simplificar o processo de criação de holdings para clientes. Fui responsável pela área do cliente, desde o login até o painel de controle com chat e assistente de IA.",
    "competitions.w1.stackTitle": "Tecnologias:",
    "competitions.w1.stack1": "Django",
    "competitions.w1.stack2": "Docker",
    "competitions.w1.stack3": "JavaScript",
    "competitions.w1.stack4": "ChatGPT API",
    "competitions.w1.button": "Ver Vídeo do Projeto",

    "competitions.vest.badge": "🌟 Bolsa por Desempenho",
    "competitions.vest.projectTitle": "Aprovação com Bolsa de Estudos",
    "competitions.vest.description": "Conquistei uma bolsa de estudos no Instituto Mauá de Tecnologia por mérito, resultado de um excelente desempenho no processo seletivo para Engenharia de Computação, com destaque em exatas e ciências.",
    "competitions.vest.stackTitle": "Destaques:",
    "competitions.vest.stack1": "Nota Elevada em Ciências",
    "competitions.vest.stack2": "Ótimo Desempenho em Exatas",
    "competitions.vest.stack3": "Conquista de Bolsa por Mérito",

    // EDUCAÇÃO
    "education.title": "Minha Formação Acadêmica e Cursos",
    "education.main.title": "Bacharelado em Engenharia da Computação",
    "education.main.date": "2023 – 2027",
    "education.main.institution": "Instituto Mauá de Tecnologia",
    "education.main.desc": "Aqui aprofundei meus conhecimentos em programação (Python, Java, C), estrutura de dados e arquitetura de computadores, além de circuitos eletrônicos e matemática computacional para modelagem e análise de dados. Também estudei Cálculo e Álgebra Linear, essenciais para a resolução de problemas computacionais.",
    "education.networks.title": "Fundamentos de Redes",
    "education.networks.date": "2025",
    "education.networks.institution": "Cisco Networking Academy - 70 horas",
    "education.networks.desc": "No curso, aprendi os princípios das redes, explorando dispositivos, mídias e protocolos de comunicação. Desenvolvi também habilidades para identificar e resolver problemas básicos, com foco na certificação Cisco CCST.",
    "education.gcp.title": "Google Cloud Computing Foundations",
    "education.gcp.date": "2024",
    "education.gcp.institution": "Google Cloud - 40 horas",
    "education.gcp.desc": "Nesse curso, aprendi os fundamentos da computação em nuvem, incluindo infraestrutura, armazenamento, redes e segurança no Google Cloud. Explorei bancos de dados gerenciados, machine learning na nuvem e escalabilidade de aplicações, entendendo como integrar e otimizar serviços na plataforma.",
    "education.aws.title": "AWS Academy Cloud Foundations",
    "education.aws.date": "2024",
    "education.aws.institution": "AWS - 20 horas",
    "education.aws.desc": "No curso, aprendi os conceitos essenciais da computação em nuvem, incluindo arquitetura AWS, armazenamento, redes, segurança e escalabilidade de aplicações. Explorei serviços como EC2, S3, RDS e Lambda, entendendo como projetar soluções eficientes e seguras na nuvem.",
    "education.arduino.title": "Automação e Controle com Arduino",
    "education.arduino.date": "2023",
    "education.arduino.institution": "IMT - 40 horas",
    "education.arduino.desc": "No curso, aprendi a programar e integrar componentes com Arduino, trabalhando com sensores, motores, displays e Bluetooth para desenvolver circuitos interativos. Também aprimorei habilidades em C para microcontroladores, explorando automação e controle de dispositivos.",
    "education.dl.title": "Getting Started with Deep Learning",
    "education.dl.date": "2025",
    "education.dl.institution": "NVIDIA - 8 horas",
    "education.dl.desc": "Construí um classificador de imagens em PyTorch com mais de 92% de acurácia, aplicando técnicas de Deep Learning como Transfer Learning, Data Augmentation e Fine-Tuning. O curso também introduziu os fundamentos de Modelos de Linguagem Grandes (LLMs).",

    // SKILLS
    "skills.title": "As Ferramentas que Impulsionam minhas Criações",

    // CONTATO
    "contact.title": "Entre em Contato",
    "contact.subtitle": "Gostaria de colaborar ou discutir uma oportunidade? Estou à disposição!",
    "contact.whatsapp": "Fale comigo no WhatsApp",
    "contact.phoneLabel": "Telefone:",
    "contact.emailLabel": "Email:",
    "contact.linkedinLabel": "LinkedIn:",

    // FOOTER
    "footer.copyright": "© 2025 Diogo Musso Coutinho",
    "footer.production": "Uma produção de",

    // VIDEO
    "video.unsupported": "Seu navegador não suporta a tag de vídeo.",
    "video.close": "×",

    // CHAT
    "chat.title": "DiogoBot",
    "chat.botWelcome": "Oi! 👋 Pergunta qualquer coisa sobre o Diogo!",
    "chat.placeholder": "Digite e aperte Enter...",
    "chat.open": "Abrir chat",
    "chat.close": "Fechar chat",
    "chat.send": "Enviar mensagem",
    "chat.loading": "Digitando…",
    "chat.error": "Falhou falar com a IA 😢. Tenta de novo."
  },

  en: {
    // NAV
    "nav.about": "About Me",
    "nav.projects": "Projects",
    "nav.qualifications": "Qualifications",
    "nav.competitions": "Competitions",
    "nav.education": "Education",
    "nav.skills": "Skills",
    "nav.contact": "Contact",

    // LANG
    "lang.pt": "Portuguese (Brazil)",
    "lang.en": "English (US)",

    // HERO
    "hero.title": "Hi, I'm Diogo",
    "hero.subtitle": "a tech enthusiast passionate about innovation and impact",
    "hero.paragraph": "My main goal is to create meaningful impact in the world by building innovative projects that benefit as many people as possible. I'm committed to putting in the work and facing any challenge to make this vision real.",
    "hero.cta": "Get in touch",

    // PROJECTS
    "projects.title": "Explore my Projects and Creations",
    "project.visit": "Visit Website",

    "project.unwind.short": "Community for movies, series and games.",
    "project.unwind.full": "Unwind is a social app for movies, TV shows and games. It started in Java/Android Studio and was refactored to React Native to become multi-platform. It mixes social features (profiles, posts, likes, comments) with media organization and a recommendation system based on user activity. I used Python web scraping and TMDB/IGDB APIs, and store everything in Firebase.",

    "project.flavia.title": "Flávia Law Firm",
    "project.flavia.short": "Complete website for a law office.",
    "project.flavia.full": "I built the institutional website for Flávia Coutinho Advocacia, focusing on responsiveness, professional visual identity and client-oriented usability. The site includes presentation pages, practice areas and a working contact form. I handled everything from layout to domain, hosting and professional email.",

    "project.lodge.title": "Lodge Website",
    "project.lodge.short": "Responsive site for Lodge Engenharia.",
    "project.lodge.full": "I developed the institutional website for Lodge Engenharia, my first professional project. The site presents the company, its services and portfolio, ensuring intuitive navigation. Built with HTML, CSS and JavaScript, it delivers a modern, responsive corporate presence.",

    "project.sudoku.title": "Sudoku Solver",
    "project.sudoku.short": "Automatic Sudoku solver.",
    "project.sudoku.full": "I created a Sudoku solver in Python as a personal challenge, requiring logic and advanced programming. The software understands the puzzle rules and solves any board automatically. To make it friendly, I added a Tkinter GUI so users can type numbers and get the solution interactively.",

    "project.car.title": "Robotic Claw Car",
    "project.car.short": "Bluetooth-controlled robotic car.",
    "project.car.full": "I built a robotic car with an attached claw using an EletroGate kit as the base, but modified it to improve efficiency. I added an HC-05 Bluetooth module to control it via phone using the Dabble app. It involved Arduino programming, circuit assembly and adapting parts like motors, micro servos and an L298N H-bridge.",

    "project.whatsapp.title": "WhatsApp Automation",
    "project.whatsapp.short": "Automating tasks on WhatsApp.",
    "project.whatsapp.full": "Using Python, Selenium and web scraping, I developed a system to automate sending messages on WhatsApp. The user can define the contact list, schedule messages and pick the sending time. That project introduced me to web automation, which I later reused for currency converters, LinkedIn data extraction and media collection for Unwind.",

    // COMPETITIONS
    "competitions.title": "My Competition Achievements",
    "competitions.tab.abb": "Computer Vision",
    "competitions.tab.w1": "Holding Platform",
    "competitions.tab.vestibular": "Merit Scholarship",

    "competitions.abb.badge": "🏆 Winner",
    "competitions.abb.projectTitle": "Safety & PPE Monitoring Platform",
    "competitions.abb.description": "I designed and prototyped an innovative platform to improve workplace safety through gamification and intelligent PPE usage monitoring. The solution uses computer vision, team management and real-time tracking to prevent accidents.",
    "competitions.abb.stackTitle": "My Contribution:",
    "competitions.abb.stack1": "Ideation",
    "competitions.abb.stack2": "UX/UI Design",
    "competitions.abb.stack3": "Prototyping",
    "competitions.abb.stack4": "Business Plan",
    "competitions.abb.button": "Open Prototype",

    "competitions.w1.badge": "🏅 Finalist",
    "competitions.w1.projectTitle": "Holding Management Platform",
    "competitions.w1.description": "I developed a complete, functional web platform to automate and simplify the holding creation process for clients. I built the entire client area, from login to the dashboard with chat and AI assistant.",
    "competitions.w1.stackTitle": "Technologies:",
    "competitions.w1.stack1": "Django",
    "competitions.w1.stack2": "Docker",
    "competitions.w1.stack3": "JavaScript",
    "competitions.w1.stack4": "ChatGPT API",
    "competitions.w1.button": "Watch Project Video",

    "competitions.vest.badge": "🌟 Merit Scholarship",
    "competitions.vest.projectTitle": "Admission with Scholarship",
    "competitions.vest.description": "I earned a scholarship at Instituto Mauá de Tecnologia thanks to high performance in the admission process for Computer Engineering, especially in STEM subjects.",
    "competitions.vest.stackTitle": "Highlights:",
    "competitions.vest.stack1": "High grade in Science",
    "competitions.vest.stack2": "Strong STEM performance",
    "competitions.vest.stack3": "Merit-based scholarship",

    // EDUCATION
    "education.title": "My Academic Background and Courses",
    "education.main.title": "B.Sc. in Computer Engineering",
    "education.main.date": "2023 – 2027",
    "education.main.institution": "Instituto Mauá de Tecnologia",
    "education.main.desc": "I deepened my knowledge in programming (Python, Java, C), data structures and computer architecture, plus electronics and computational math for modeling and data analysis. I also studied Calculus and Linear Algebra, which are essential for solving computational problems.",
    "education.networks.title": "Networking Fundamentals",
    "education.networks.date": "2025",
    "education.networks.institution": "Cisco Networking Academy – 70 hours",
    "education.networks.desc": "I learned core networking concepts, exploring devices, media and communication protocols. I also practiced troubleshooting and basic configuration, aligned with the Cisco CCST certification.",
    "education.gcp.title": "Google Cloud Computing Foundations",
    "education.gcp.date": "2024",
    "education.gcp.institution": "Google Cloud – 40 hours",
    "education.gcp.desc": "I studied cloud fundamentals: infrastructure, storage, networking and security on Google Cloud. I explored managed databases, ML in the cloud, and app scalability, learning how to integrate and optimize services.",
    "education.aws.title": "AWS Academy Cloud Foundations",
    "education.aws.date": "2024",
    "education.aws.institution": "AWS – 20 hours",
    "education.aws.desc": "I learned the essentials of cloud computing: AWS architecture, storage, networking, security and app scalability. I explored services like EC2, S3, RDS and Lambda, understanding how to design efficient and secure cloud solutions.",
    "education.arduino.title": "Automation and Control with Arduino",
    "education.arduino.date": "2023",
    "education.arduino.institution": "IMT – 40 hours",
    "education.arduino.desc": "I learned to program and integrate Arduino components, working with sensors, motors, displays and Bluetooth to build interactive circuits. I also strengthened C skills for microcontrollers.",
    "education.dl.title": "Getting Started with Deep Learning",
    "education.dl.date": "2025",
    "education.dl.institution": "NVIDIA – 8 hours",
    "education.dl.desc": "I built an image classifier in PyTorch with over 92% accuracy, using transfer learning, data augmentation and fine-tuning. The course also introduced Large Language Models (LLMs).",

    // SKILLS
    "skills.title": "The Tools that Power my Creations",

    // CONTACT
    "contact.title": "Contact Me",
    "contact.subtitle": "Want to collaborate or talk about an opportunity? I'm available!",
    "contact.whatsapp": "Message me on WhatsApp",
    "contact.phoneLabel": "Phone:",
    "contact.emailLabel": "Email:",
    "contact.linkedinLabel": "LinkedIn:",

    // FOOTER
    "footer.copyright": "© 2025 Diogo Musso Coutinho",
    "footer.production": "A production by",

    // VIDEO
    "video.unsupported": "Your browser does not support the video tag.",
    "video.close": "×",

    // CHAT
    "chat.title": "DiogoBot",
    "chat.botWelcome": "Hey! 👋 Ask me anything about Diogo!",
    "chat.placeholder": "Type and press Enter...",
    "chat.open": "Open chat",
    "chat.close": "Close chat",
    "chat.send": "Send message",
    "chat.loading": "Typing…",
    "chat.error": "Couldn't reach the AI 😢. Try again."
  }
};

// idioma atual global
window.CURRENT_LANG = localStorage.getItem('siteLang') || 'pt';

document.addEventListener('DOMContentLoaded', function () {
  const langButtons = document.querySelectorAll('.lang-btn');

  function applyLanguage(lang) {
    const dict = TRANSLATIONS[lang];
    if (!dict) return;

    document.documentElement.lang = (lang === 'pt') ? 'pt-BR' : 'en';
    window.CURRENT_LANG = lang;
    localStorage.setItem('siteLang', lang);

    // textos simples
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = dict[key];
      if (!text) return;
      el.textContent = text;
    });

    // placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const text = dict[key];
      if (!text) return;
      el.placeholder = text;
    });

    // atributos
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      const raw = el.getAttribute('data-i18n-attr'); // ex: "aria-label:chat.open;title:chat.open"
      if (!raw) return;
      const pairs = raw.split(';');
      pairs.forEach(pair => {
        const [attr, k] = pair.split(':').map(s => s.trim());
        if (!attr || !k) return;
        const val = dict[k];
        if (val) el.setAttribute(attr, val);
      });
    });

    // marcar botão ativo
    langButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // atualizar mensagem inicial do bot se já estiver aberto
    const botWelcome = document.querySelector('#diogo-chat-messages .chat-message.bot[data-i18n="chat.botWelcome"]');
    if (botWelcome && dict['chat.botWelcome']) {
      botWelcome.textContent = dict['chat.botWelcome'];
    }
  }

  // clique nas bandeiras
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      applyLanguage(lang);
    });
  });

  // idioma inicial
  applyLanguage(window.CURRENT_LANG);

  // =====================================
  // JS ORIGINAL (organizado)
  // =====================================

  // cards de projeto (abre/fecha)
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('click', function () {
      projectCards.forEach(otherCard => {
        if (otherCard !== card && otherCard.classList.contains('active')) {
          otherCard.classList.remove('active');
        }
      });
      this.classList.toggle('active');
    });
  });

  // animação do logo
  const logoContainer = document.querySelector('.logo-container');
  const logoText = document.querySelector('.logo-text');
  const fullText = 'Diogo Coutinho';
  const fonts = ['Pacifico', 'Lobster', 'Cinzel', 'Monoton', 'Berkshire Swash'];
  let currentFontIndex = 0;
  let intervalId = null;
  let typingIntervalId = null;

  function typeText(fontIndex, isErasing = false) {
    logoText.classList.add('typing');
    let currentText = logoText.textContent;
    let index = isErasing ? currentText.length : 0;

    typingIntervalId = setInterval(() => {
      if (isErasing) {
        if (index > 0) {
          logoText.textContent = fullText.slice(0, index - 1);
          index--;
        } else {
          clearInterval(typingIntervalId);
          logoText.style.fontFamily = fonts[fontIndex];
          typeText(fontIndex, false);
        }
      } else {
        if (index < fullText.length) {
          logoText.textContent = fullText.slice(0, index + 1);
          index++;
        } else {
          clearInterval(typingIntervalId);
          logoText.classList.remove('typing');
        }
      }
    }, 50);
  }

  function startFontCycle() {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
      currentFontIndex = (currentFontIndex + 1) % fonts.length;
      typeText(currentFontIndex, true);
    }, 3000);
  }

  logoContainer.addEventListener('mouseenter', () => {
    startFontCycle();
    typeText(currentFontIndex, true);
  });

  logoContainer.addEventListener('mouseleave', () => {
    clearInterval(intervalId);
    clearInterval(typingIntervalId);
    logoText.style.fontFamily = 'opensans';
    logoText.textContent = fullText;
    logoText.classList.remove('typing');
    currentFontIndex = 0;
  });

  // troca de imagem do perfil
  const profileImg = document.querySelector('.profile-img');
  if (profileImg) {
    const images = [
      'diogo.jpg',
      'diogoDesenho.png',
      'diogoDisney.png',
      'diogoFuturista.png',
      'diogoPintura.png',
      'diogoAnime.png',
      'diogoHQs.png',
      'diogoCartoon.png',
      'diogoImpressionista.png'
    ];
    let currentIndex = 0;
    let imgIntervalId = null;

    function changeImage() {
      profileImg.style.opacity = '0';
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % images.length;
        profileImg.src = images[currentIndex];
        setTimeout(() => {
          profileImg.style.opacity = '1';
        }, 50);
      }, 500);
    }

    imgIntervalId = setInterval(changeImage, 4000);

    profileImg.addEventListener('mouseenter', () => {
      clearInterval(imgIntervalId);
      changeImage();
      imgIntervalId = setInterval(changeImage, 2000);
    });

    profileImg.addEventListener('mouseleave', () => {
      clearInterval(imgIntervalId);
      imgIntervalId = setInterval(changeImage, 4000);
    });
  }

  // gerenciamento dos projetos por linha
  function manageActiveProjects() {
    if (window.innerWidth > 768) {
      document.querySelectorAll('.row-1.left-card').forEach(card => card.classList.add('active'));
      document.querySelectorAll('.row-2.left-card').forEach(card => card.classList.add('active'));
      document.querySelectorAll('.row-3.left-card').forEach(card => card.classList.add('active'));

      document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function () {
          if (window.innerWidth > 768) {
            const rowClass = this.classList.contains('row-1')
              ? 'row-1'
              : this.classList.contains('row-2')
              ? 'row-2'
              : 'row-3';

            document.querySelectorAll(`.${rowClass}`).forEach(c => c.classList.remove('active'));
            this.classList.add('active');
          }
        });
      });
    }
  }

  // projeto expandido
  const expandedProject = document.querySelector('.expanded-project');
  const overlay = document.querySelector('.overlay-background') || document.createElement('div');

  if (!overlay.parentElement) {
    overlay.classList.add('overlay-background');
    document.body.appendChild(overlay);
  }

  function populateExpandedProject(card) {
    const imgSrc = card.querySelector('.project-img').src;
    const titleEl = card.querySelector('h3');
    const title = titleEl ? titleEl.textContent : '';
    const icon = card.querySelector('.hero-lamp');
    const fullDesc = card.querySelector('.full-desc').textContent;
    const link = card.querySelector('.project-link');

    expandedProject.querySelector('.expanded-img').src = imgSrc;

    const expandedTitle = expandedProject.querySelector('.expanded-title');
    expandedTitle.textContent = title;
    expandedTitle.style.fontFamily = (titleEl && titleEl.style.fontFamily) ? titleEl.style.fontFamily : 'opensans';
    expandedTitle.style.color = (titleEl && titleEl.style.color) ? titleEl.style.color : '#fff';

    if (title === 'Unwind') {
      expandedTitle.style.fontSize = '2rem';
    } else {
      expandedTitle.style.fontSize = '1.3rem';
    }

    const heroLamp = expandedProject.querySelector('.hero-lamp');
    if (icon && icon.tagName === 'IMG') {
      heroLamp.innerHTML = `<img src="${icon.src}" alt="${icon.alt}" class="hero-lamp" style="width: 30px; height: auto;">`;
    } else if (icon) {
      heroLamp.innerHTML = icon.outerHTML;
    } else {
      heroLamp.innerHTML = '';
    }

    expandedProject.querySelector('.full-desc').textContent = fullDesc;

    const expandedLink = expandedProject.querySelector('.project-link');
    if (link) {
      expandedLink.href = link.href;
      expandedLink.style.display = 'inline-block';
    } else {
      expandedLink.style.display = 'none';
    }
  }

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function (e) {
      if (e.target.classList.contains('project-link')) return;
      e.preventDefault();

      if (window.innerWidth <= 768) {
        if (expandedProject.style.display === 'flex') {
          expandedProject.style.display = 'none';
          overlay.style.display = 'none';
        } else {
          populateExpandedProject(this);
          expandedProject.style.display = 'flex';
          overlay.style.display = 'block';
        }
      } else if (expandedProject.style.display === 'flex') {
        expandedProject.style.display = 'none';
        overlay.style.display = 'none';
        return;
      } else {
        populateExpandedProject(this);
        expandedProject.style.display = 'flex';
        overlay.style.display = 'block';
      }

      overlay.onclick = () => {
        expandedProject.style.display = 'none';
        overlay.style.display = 'none';
      };
    });
  });

  manageActiveProjects();

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      manageActiveProjects();
    } else {
      document.querySelectorAll('.project-card').forEach(card => card.classList.remove('active'));
    }
  });

  // carrossel de habilidades
  const topTrack = document.querySelector('.top-carousel .skills-track');
  const bottomTrack = document.querySelector('.bottom-carousel .skills-track');

  if (topTrack && bottomTrack) {
    const trackWidth = topTrack.scrollWidth / 2;

    let topPosition = 0;
    let bottomPosition = -trackWidth / 2;

    function getSpeed() {
      return window.innerWidth <= 768 ? 0.2 : 0.3;
    }

    function animate() {
      const speed = getSpeed();

      topPosition -= speed;
      if (topPosition <= -trackWidth) topPosition = 0;
      topTrack.style.transform = `translateX(${topPosition}px)`;

      bottomPosition += speed;
      if (bottomPosition >= 0) bottomPosition = -trackWidth;
      bottomTrack.style.transform = `translateX(${bottomPosition}px)`;

      requestAnimationFrame(animate);
    }

    animate();
  }

  // animação nos cards de educação
  document.querySelectorAll('.education-item').forEach(item => {
    let isAnimating = false;
    item.addEventListener('mouseenter', (event) => {
      if (!isAnimating) {
        isAnimating = true;
        const rect = item.getBoundingClientRect();
        const mouseX = event.clientX;
        const elementCenter = rect.left + rect.width / 2;
        const direction = mouseX < elementCenter ? 'left' : 'right';

        if (direction === 'left') {
          item.style.animation = 'pendulumSwingRight 2s ease-out';
        } else {
          item.style.animation = 'pendulumSwingLeft 2s ease-out';
        }

        item.addEventListener('animationend', () => {
          item.style.animation = 'none';
          isAnimating = false;
        }, { once: true });
      }
    });
  });

  // menu mobile
  function setupMenuToggle() {
    const navbar = document.querySelector('.navbar');
    let menuToggle = document.querySelector('.menu-toggle');

    if (window.innerWidth <= 768) {
      if (!menuToggle) {
        menuToggle = document.createElement('button');
        menuToggle.classList.add('menu-toggle');
        menuToggle.innerHTML = '☰';
        navbar.appendChild(menuToggle);

        menuToggle.addEventListener('click', () => {
          document.querySelector('.nav-menu').classList.toggle('active');
        });
      }
    } else {
      if (menuToggle) {
        menuToggle.remove();
        document.querySelector('.nav-menu').classList.remove('active');
      }
    }
  }

  window.addEventListener('resize', setupMenuToggle);
  setupMenuToggle();

  document.addEventListener('click', (event) => {
    const menu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    if (navbar && !navbar.contains(event.target) && menu && menu.classList.contains('active')) {
      menu.classList.remove('active');
    }
  });

  // COMPETIÇÕES - tabs automáticas
  function initCompetitionsSection() {
    const tabs = document.querySelectorAll('.competition-tab-item');
    const contents = document.querySelectorAll('.competition-content');
    const DURATION = 16000;
    let activeIndex = 0;
    let autoAdvanceTimer = null;

    function activateTab(index) {
      clearTimeout(autoAdvanceTimer);
      activeIndex = index;

      tabs.forEach((tab, i) => {
        tab.classList.toggle('active', i === index);
        const progressBar = tab.querySelector('.progress-bar');
        tab.classList.remove('is-filling');
        if (progressBar) progressBar.style.animation = 'none';
      });

      contents.forEach((content, i) => {
        content.classList.toggle('visible', i === index);
      });

      const activeTab = tabs[index];
      if (activeTab) {
        void activeTab.offsetWidth;
        activeTab.classList.add('is-filling');
        const progressBar = activeTab.querySelector('.progress-bar');
        if (progressBar) progressBar.style.animation = '';
      }

      autoAdvanceTimer = setTimeout(() => {
        const nextIndex = (activeIndex + 1) % tabs.length;
        activateTab(nextIndex);
      }, DURATION);
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activateTab(index));
    });

    activateTab(0);
  }

  initCompetitionsSection();

  // modal vídeo
  const videoModal = document.getElementById('videoModal');
  const openVideoBtn = document.getElementById('verVideoW1Btn');
  const closeVideoBtn = document.querySelector('.close-video-modal');
  const videoPlayer = document.getElementById('w1VideoPlayer');

  if (openVideoBtn) {
    openVideoBtn.addEventListener('click', function (event) {
      event.preventDefault();
      if (videoModal) {
        videoModal.style.display = 'flex';
        videoPlayer.play();
      }
    });
  }

  function fecharModal() {
    if (videoModal) {
      videoModal.style.display = 'none';
      videoPlayer.pause();
      videoPlayer.currentTime = 0;
    }
  }

  if (closeVideoBtn) {
    closeVideoBtn.addEventListener('click', fecharModal);
  }

  if (videoModal) {
    videoModal.addEventListener('click', function (event) {
      if (event.target === videoModal) {
        fecharModal();
      }
    });
  }
});

// ===============================
//  DIOGO BOT
// ===============================
(function setupDiogoBot() {
  const WRAPPER = document.getElementById('diogo-chatbot');
  const BTN     = document.getElementById('diogo-chatbot-button');
  const WINDOW  = document.getElementById('diogo-chatbot-window');
  const CLOSE   = document.getElementById('diogo-chatbot-close');
  const MSGS    = document.getElementById('diogo-chat-messages');
  const FORM    = document.getElementById('diogo-chat-form');
  const INPUT   = document.getElementById('diogo-chat-input');

  if (!WINDOW || !FORM || !MSGS) return;

  // histórico base
  const history = []; // system vem do servidor


  function addMessage(text, from = "bot") {
    const div = document.createElement("div");
    div.className = `chat-message ${from === "user" ? "user" : "bot"}`;
    div.textContent = text;
    MSGS.appendChild(div);
    MSGS.scrollTop = MSGS.scrollHeight;
    return div;
  }

  async function sendToAI(userText) {
    const loading = addMessage(t("chat.loading"), "bot");

    const messages = [...history, { role: "user", content: userText }];

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages })
      });

      const data = await res.json();
      const reply = data.reply || t("chat.error");

      loading.remove();
      addMessage(reply, "bot");

      history.push({ role: "user", content: userText });
      history.push({ role: "assistant", content: reply });
    } catch (err) {
      console.error(err);
      loading.remove();
      addMessage(t("chat.error"), "bot");
    }
  }

  if (BTN) {
    BTN.addEventListener("click", () => {
      WINDOW.classList.toggle("chat-hidden");
      if (!WINDOW.classList.contains("chat-hidden")) {
        INPUT && INPUT.focus();
      }
    });
  } else {
    WINDOW.classList.remove("chat-hidden");
  }

  if (CLOSE) {
    CLOSE.addEventListener("click", () => {
      WINDOW.classList.add("chat-hidden");
    });
  }

  FORM.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = (INPUT.value || "").trim();
    if (!text) return;
    addMessage(text, "user");
    INPUT.value = "";
    sendToAI(text);
  });
    // quando o teclado abre no mobile, cola o chat no fundo e reduz altura
  INPUT.addEventListener("focus", () => {
    WINDOW.classList.add("chat-on-keyboard");
    // garante que a última msg apareça
    setTimeout(() => {
      MSGS.scrollTop = MSGS.scrollHeight;
    }, 100);
  });

  INPUT.addEventListener("blur", () => {
    WINDOW.classList.remove("chat-on-keyboard");
  });

})();
