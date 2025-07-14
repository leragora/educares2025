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
// As chaves do objeto (ex: 'frase01') podem ser usadas como identificadores lógicos
const animationConfigs = {
  frase01: { containerId: 'item1364', path: './assets/frase01.json' },
  frase02: { containerId: 'item1391', path: './assets/frase02.json' },
  frase03: { containerId: 'item1609', path: './assets/frase03.json' },
  frase04: { containerId: 'item1636', path: './assets/frase04.json' }
};

// Função para lidar com mudanças de estado dos elementos multi-estado (slideshows)
function handleMultiStateChange() {
  console.log('Multi-state element state changed. Checking Lottie animations.');

  // Verifica o estado do slideshow principal (item1330)
  const slideshow1 = document.getElementById('item1330');
  // Verifica o estado do segundo slideshow (item1553)
  const slideshow2 = document.getElementById('item1553');

  // Lógica para frase01
  const animation1 = createLottieAnimation(animationConfigs.frase01.containerId, animationConfigs.frase01.path);
  if (animation1) {
    // Exemplo: reproduzir frase01 se slideshow1 tiver um filho com a classe 'active'
    if (slideshow1 && slideshow1.querySelector('.state.active')) {
      animation1.goToAndPlay(0, true); // Reinicia e reproduz
      console.log('Reproduzindo frase01.json');
    } else {
      animation1.stop(); // Para se a condição não for atendida
    }
  }

  // Lógica para frase02
  const animation2 = createLottieAnimation(animationConfigs.frase02.containerId, animationConfigs.frase02.path);
  if (animation2) {
    // Exemplo: reproduzir frase02 se slideshow1 tiver um filho com a classe 'other_state'
    // Você precisará ajustar 'other_state' para a classe que indica o estado correto para esta animação
    if (slideshow1 && slideshow1.querySelector('.state.someOtherActiveState')) { // <<< AJUSTE ESTA CONDIÇÃO
      animation2.goToAndPlay(0, true);
      console.log('Reproduzindo frase02.json');
    } else {
      animation2.stop();
    }
  }

  // Lógica para frase03
  const animation3 = createLottieAnimation(animationConfigs.frase03.containerId, animationConfigs.frase03.path);
  if (animation3) {
    // Exemplo: reproduzir frase03 se slideshow2 tiver um filho com a classe 'active'
    if (slideshow2 && slideshow2.querySelector('.state.active')) {
      animation3.goToAndPlay(0, true);
      console.log('Reproduzindo frase03.json');
    } else {
      animation3.stop();
    }
  }

  // Lógica para frase04
  const animation4 = createLottieAnimation(animationConfigs.frase04.containerId, animationConfigs.frase04.path);
  if (animation4) {
    // Exemplo: reproduzir frase04 se slideshow2 tiver um filho com a classe 'another_state'
    // Você precisará ajustar 'another_state' para a classe que indica o estado correto para esta animação
    if (slideshow2 && slideshow2.querySelector('.state.anotherActiveState')) { // <<< AJUSTE ESTA CONDIÇÃO
      animation4.goToAndPlay(0, true);
      console.log('Reproduzindo frase04.json');
    } else {
      animation4.stop();
    }
  }
}

// Configura os MutationObservers para detectar mudanças no atributo 'aria-hidden' ou na classe 'active'
document.addEventListener('DOMContentLoaded', function() {
  const slideshow1 = document.getElementById('item1330'); // Original ID from frases-01.js
  const slideshow2 = document.getElementById('item1553'); // Original ID from frases-02.js

  if (slideshow1) {
    const observer1 = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes' && (mutation.attributeName === 'aria-hidden' || mutation.attributeName === 'class')) {
          const targetElement = mutation.target;
          // Verifica se a mudança ocorreu em um elemento com a classe 'state'
          // Isso é comum em slideshows onde 'state active' indica o slide atual
          if (targetElement.classList.contains('state')) {
            handleMultiStateChange();
          }
        }
      });
    });
    observer1.observe(slideshow1, {
      attributes: true,
      subtree: true, // Observa mudanças em elementos filhos também
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

  // Chama handleMultiStateChange uma vez na carga inicial, caso já haja um estado ativo
  // Isso garante que as animações sejam carregadas e possivelmente reproduzidas
  // se o estado inicial já satisfizer as condições.
  handleMultiStateChange();
});