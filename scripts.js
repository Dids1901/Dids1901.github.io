// SEU CÓDIGO JAVASCRIPT EXISTENTE VEM PRIMEIRO...
// (coloque todo o seu JS atual aqui)

document.addEventListener('DOMContentLoaded', function () {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
  card.addEventListener('click', function() {
   // Fechar outros cartões abertos (opcional)
   projectCards.forEach(otherCard => {
    if (otherCard !== card && otherCard.classList.contains('active')) {
     otherCard.classList.remove('active');
    }
   });
   // Alternar a classe 'active' no cartão clicado
   this.classList.toggle('active');
  });
 });
    const logoContainer = document.querySelector('.logo-container');
    const logoText = document.querySelector('.logo-text');
    const fullText = 'Diogo Coutinho';
    const fonts = [
      'Pacifico',
      'Lobster',
      'Cinzel',
      'Monoton',
      'Berkshire Swash'
    ];
    let currentFontIndex = 0;
    let intervalId = null;
    let typingIntervalId = null;
  
    function typeText(fontIndex, isErasing = false) {
      logoText.classList.add('typing');
      let currentText = logoText.textContent;
      let index = isErasing ? currentText.length : 0; // Começar do zero ao escrever
  
      typingIntervalId = setInterval(() => {
        if (isErasing) {
          if (index > 0) {
            logoText.textContent = fullText.slice(0, index - 1);
            index--;
          } else {
            clearInterval(typingIntervalId);
            logoText.style.fontFamily = fonts[fontIndex];
            typeText(fontIndex, false); // Iniciar escrita
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
      }, 50); // 50ms por caractere
    }
  
    function startFontCycle() {
      clearInterval(intervalId);
      intervalId = setInterval(() => {
        currentFontIndex = (currentFontIndex + 1) % fonts.length;
        typeText(currentFontIndex, true); // Iniciar apagando
      }, 3000); // Ciclo a cada 3 segundos
    }
  
    logoContainer.addEventListener('mouseenter', () => {
      startFontCycle();
      typeText(currentFontIndex, true); // Iniciar imediatamente
    });
  
    logoContainer.addEventListener('mouseleave', () => {
      clearInterval(intervalId);
      clearInterval(typingIntervalId);
      logoText.style.fontFamily = 'opensans';
      logoText.textContent = fullText;
      logoText.classList.remove('typing');
      currentFontIndex = 0;
    });
  
    const profileImg = document.querySelector('.profile-img');
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
  
    // Função para gerenciar os projetos ativos por linha (desativada em mobile)
    function manageActiveProjects() {
        if (window.innerWidth > 768) {
            document.querySelectorAll('.row-1.left-card').forEach(card => card.classList.add('active')); // Unwind
            document.querySelectorAll('.row-2.left-card').forEach(card => card.classList.add('active')); // Sudoku
            document.querySelectorAll('.row-3.left-card').forEach(card => card.classList.add('active')); // WhatsApp
    
            document.querySelectorAll('.project-card').forEach(card => {
                card.addEventListener('mouseenter', function() {
                    if (window.innerWidth > 768) {
                        const rowClass = this.classList.contains('row-1') ? 'row-1' :
                                         this.classList.contains('row-2') ? 'row-2' : 'row-3';
                        
                        document.querySelectorAll(`.${rowClass}`).forEach(c => c.classList.remove('active'));
                        this.classList.add('active');
                    }
                });
            });
        }
    }
    
    // Selecionar o elemento expandido
    const expandedProject = document.querySelector('.expanded-project');
    const overlay = document.querySelector('.overlay-background') || document.createElement('div');
    
    if (!overlay.parentElement) {
        overlay.classList.add('overlay-background');
        document.body.appendChild(overlay);
    }
    
    // Função para preencher o projeto expandido
    function populateExpandedProject(card) {
        const imgSrc = card.querySelector('.project-img').src;
        const title = card.querySelector('h3').textContent;
        const icon = card.querySelector('.hero-lamp');
        const fullDesc = card.querySelector('.full-desc').textContent;
        const link = card.querySelector('.project-link');
    
        expandedProject.querySelector('.expanded-img').src = imgSrc;
        const expandedTitle = expandedProject.querySelector('.expanded-title');
        expandedTitle.textContent = title;
        expandedTitle.style.fontFamily = card.querySelector('h3').style.fontFamily || 'opensans';
        expandedTitle.style.color = card.querySelector('h3').style.color || '#fff';
    
        if (title === 'Unwind') {
            expandedTitle.style.fontSize = '2rem';
        } else {
            expandedTitle.style.fontSize = '1.3rem';
        }
    
        const heroLamp = expandedProject.querySelector('.hero-lamp');
        if (icon.tagName === 'IMG') {
            heroLamp.innerHTML = `<img src="${icon.src}" alt="${icon.alt}" class="hero-lamp" style="width: 30px; height: auto;">`;
        } else {
            heroLamp.innerHTML = icon.outerHTML;
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
    
    // Adicionar evento de clique para expandir
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function(e) {
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
    
    // Inicializar os projetos ativos
    manageActiveProjects();
    
    // Ajustar o estado ativo ao redimensionar a janela
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            manageActiveProjects();
        } else {
            document.querySelectorAll('.project-card').forEach(card => card.classList.remove('active'));
        }
    });
    
    // Animação do carrossel de habilidades
    const topTrack = document.querySelector('.top-carousel .skills-track');
    const bottomTrack = document.querySelector('.bottom-carousel .skills-track');
    const trackWidth = topTrack.scrollWidth / 2;
    
    let topPosition = 0;
    let bottomPosition = -trackWidth / 2;
    
    function getSpeed() {
        if (window.innerWidth <= 768) {
            return 0.2; // Velocidade mais lenta para mobile
        }
        return 0.3; // Velocidade padrão para desktop
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
    
    window.addEventListener('resize', () => {});
    
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

    // =======================================================
// == JAVASCRIPT ATUALIZADO PARA A SEÇÃO DE COMPETIÇÕES ==
// =======================================================
function initCompetitionsSection() {
    const tabs = document.querySelectorAll('.competition-tab-item');
    const contents = document.querySelectorAll('.competition-content');
    const DURATION = 16000; // Duração em milissegundos (8 segundos)
    let activeIndex = 0;
    let autoAdvanceTimer = null;

    // Função que ativa uma aba e seu conteúdo
    function activateTab(index) {
        // Para o timer anterior
        clearTimeout(autoAdvanceTimer);
        
        activeIndex = index;

        // Atualiza classes ativas para abas e conteúdos
        tabs.forEach((tab, i) => {
            tab.classList.toggle('active', i === index);
            const progressBar = tab.querySelector('.progress-bar');
            // Remove e reinicia a animação da barra de progresso
            tab.classList.remove('is-filling');
            if (progressBar) progressBar.style.animation = 'none';
        });
        contents.forEach((content, i) => {
            content.classList.toggle('visible', i === index);
        });

        const activeTab = tabs[index];
        if (activeTab) {
            // Força o reinício da animação CSS
            void activeTab.offsetWidth; 
            activeTab.classList.add('is-filling');
            const progressBar = activeTab.querySelector('.progress-bar');
            if (progressBar) progressBar.style.animation = '';
        }

        // Configura o timer para avançar para a próxima aba
        autoAdvanceTimer = setTimeout(() => {
            const nextIndex = (activeIndex + 1) % tabs.length; // Volta ao início se for a última
            activateTab(nextIndex);
        }, DURATION);
    }

    // Adiciona o evento de clique para cada aba
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            activateTab(index); // Ativa a aba clicada
        });
    });

    // Inicia o ciclo com a primeira aba
    activateTab(0);
}


    initCompetitionsSection();
    const videoModal = document.getElementById('videoModal');
    const openVideoBtn = document.getElementById('verVideoW1Btn');
    const closeVideoBtn = document.querySelector('.close-video-modal');
    const videoPlayer = document.getElementById('w1VideoPlayer');

    // Se o botão de abrir o vídeo existir
    if (openVideoBtn) {
        openVideoBtn.addEventListener('click', function(event) {
            event.preventDefault(); // Impede que o link mude de página
            if (videoModal) {
                videoModal.style.display = 'flex'; // Usa flex para alinhar ao centro (como no CSS)
                videoPlayer.play(); // Inicia o vídeo automaticamente
            }
        });
    }

    // Função para fechar o modal
    function fecharModal() {
        if (videoModal) {
            videoModal.style.display = 'none';
            videoPlayer.pause(); // Pausa o vídeo
            videoPlayer.currentTime = 0; // Reinicia o vídeo para o início
        }
    }

    // Se o botão de fechar (o "X") existir
    if (closeVideoBtn) {
        closeVideoBtn.addEventListener('click', fecharModal);
    }

    // Fecha o modal se o usuário clicar fora do conteúdo do vídeo
    videoModal.addEventListener('click', function(event) {
        if (event.target === videoModal) { // Verifica se o clique foi no fundo (overlay)
            fecharModal();
        }
    });
});