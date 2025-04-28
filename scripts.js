document.addEventListener('DOMContentLoaded', function () {
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
  });

document.addEventListener('DOMContentLoaded', function () {
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
    let intervalId = null;
  
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
  
    // Start cycling images naturally every 6 seconds
    intervalId = setInterval(changeImage, 4000);
  
    profileImg.addEventListener('mouseenter', () => {
      // Clear slow interval and start fast interval (3x faster)
      clearInterval(intervalId);
      changeImage(); // Immediate change on hover
      intervalId = setInterval(changeImage, 2000); // 6000 / 3 = 2000ms
    });
  
    profileImg.addEventListener('mouseleave', () => {
      // Clear fast interval and restart slow interval
      clearInterval(intervalId);
      intervalId = setInterval(changeImage, 4000);
    });
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

// Função para determinar a velocidade com base no tamanho da tela
function getSpeed() {
    if (window.innerWidth <= 768) {
        return 0.2; // Velocidade mais lenta para mobile
    }
    return 0.3; // Velocidade padrão para desktop
}

function animate() {
    const speed = getSpeed();

    // Animação para o topo (para a direita)
    topPosition -= speed;
    if (topPosition <= -trackWidth) topPosition = 0;
    topTrack.style.transform = `translateX(${topPosition}px)`;

    // Animação para o fundo (para a esquerda)
    bottomPosition += speed;
    if (bottomPosition >= 0) bottomPosition = -trackWidth;
    bottomTrack.style.transform = `translateX(${bottomPosition}px)`;

    requestAnimationFrame(animate);
}

// Iniciar animação
animate();

// Ajustar velocidade ao redimensionar a janela
window.addEventListener('resize', () => {});

// Animação de pêndulo para education-item
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

// Controle do menu hambúrguer
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
document.addEventListener('DOMContentLoaded', setupMenuToggle);

document.addEventListener('click', (event) => {
    const menu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    if (!navbar.contains(event.target) && menu.classList.contains('active')) {
        menu.classList.remove('active');
    }
});