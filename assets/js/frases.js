// Objeto para armazenar as instâncias das animações Lottie
const lottieAnimations = {};

// Função para carregar e retornar uma instância de animação Lottie
function createLottieAnimation(containerId, animationPath) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.warn(`Contêiner com ID '${containerId}' não encontrado.`);
    return null;
  }

  // Se a animação já foi carregada para este contêiner, retorna a instância existente
  if (lottieAnimations[containerId]) {
    return lottieAnimations[containerId];
  }

  const animation = lottie.loadAnimation({
    container: container,
    renderer: 'svg', // 'svg', 'canvas' ou 'html'
    loop: false, // Queremos controlar o loop manualmente se necessário
    autoplay: false, // NÃO queremos que a animação toque automaticamente ao carregar
    path: animationPath
  });

  animation.addEventListener('DOMLoaded', function() {
    console.log(`Animação Lottie para '${containerId}' carregada com sucesso!`);
  });

  animation.addEventListener('error', function(error) {
    console.error(`Erro ao carregar a animação para '${containerId}':`, error);
  });

  lottieAnimations[containerId] = animation; // Armazena a instância
  return animation;
}

// Configuração das animações Lottie
// As chaves do objeto (ex: 'frase01-state', 'frase02-state') devem corresponder
// ao atributo 'name' das divs de estado dentro do seu MSO no HTML.
// Os 'containerId's foram ajustados para 'item1364', 'item1391', 'item1609', 'item1636'.
const animationConfigs = {
  'frase01': { containerId: 'item1364', path: './assets/frase01.json' },
  'frase02': { containerId: 'item1391', path: './assets/frase02.json' },

  'frase03': { containerId: 'item1609', path: './assets/frase03.json' },
  'frase04': { containerId: 'item1636', path: './assets/frase04.json' }
};

// Função para manipular a mudança de estado do MSO e reproduzir a animação Lottie correspondente
function handleMultiStateChange() {
  const states = document.querySelectorAll('.pageItem.state');

  states.forEach(state => {
    const isActive = state.classList.contains('active') && state.getAttribute('aria-hidden') === 'false';
    const stateName = state.getAttribute('name');
    const config = animationConfigs[stateName];

    if (config) {
      const animation = createLottieAnimation(config.containerId, config.path);

      if (animation) {
        if (isActive) {
          animation.play();
        } else {
          animation.stop();
        }
      }
    }
  });
}

// Observador de mutação para detectar mudanças no atributo 'aria-hidden' ou na classe 'active'
document.addEventListener('DOMContentLoaded', function() {
  const slideshow1 = document.getElementById('item1330'); // Original ID from frases-01.js
  const slideshow2 = document.getElementById('item1553'); // Original ID from frases-02.js

  if (slideshow1) {
    const observer1 = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes' && (mutation.attributeName === 'aria-hidden' || mutation.attributeName === 'class')) {
          const targetElement = mutation.target;
          if (targetElement.classList.contains('state')) {
            handleMultiStateChange();
          }
        }
      });
    });
    observer1.observe(slideshow1, {
      attributes: true,
      subtree: true,
      attributeFilter: ['aria-hidden', 'class']
    });
  }

  if (slideshow2) {
    const observer2 = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes' && (mutation.attributeName === 'aria-hidden' || mutation.attributeName === 'class')) {
          const targetElement = mutation.target;
          if (targetElement.classList.contains('state')) {
            handleMultiStateChange();
          }
        }
      });
    });
    observer2.observe(slideshow2, {
      attributes: true,
      subtree: true,
      attributeFilter: ['aria-hidden', 'class']
    });
  }
});