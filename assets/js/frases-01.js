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
// Os 'containerId's foram ajustados para 'item1364' e 'item1391'.
const animationConfigs = {
  // ATENÇÃO: SUBSTITUA 'nome-do-estado-da-frase01' PELO 'name' REAL DO SEU ESTADO NO HTML
  'frase01': { 
    containerId: 'item1364', // ID do div onde a animação frase01.json será renderizada
    path: './assets/frase01.json' // Caminho para o arquivo JSON da animação
  },
  // ATENÇÃO: SUBSTITUA 'nome-do-estado-da-frase02' PELO 'name' REAL DO SEU ESTADO NO HTML
  'frase02': { 
    containerId: 'item1391', // ID do div onde a animação frase02.json será renderizada
    path: './assets/frase02.json' // Caminho para o arquivo JSON da animação
  }
  // Se houver outras animações Lottie no seu projeto que usam esta mesma lógica
  // e não estão relacionadas a este MSO, mantenha-as aqui.
  // Caso contrário, você pode remover as configurações de animações não utilizadas.
};

// Função para ativar/desativar animações com base no estado ativo
function handleMultiStateChange() {
  const multiStateElement = document.getElementById('item1330'); 
  if (!multiStateElement) {
    console.warn("MSO com ID 'item1330' não encontrado.");
    return;
  }

  const states = multiStateElement.querySelectorAll('.pageItem.state');

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
  const slideshow = document.getElementById('item1330'); // ATUALIZADO: ID do MSO principal
  if (slideshow) {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes' && (mutation.attributeName === 'aria-hidden' || mutation.attributeName === 'class')) {
          const targetElement = mutation.target;
          if (targetElement.classList.contains('state')) {
            handleMultiStateChange();
          }
        }
      });
    });

    observer.observe(slideshow, {
      attributes: true,
      subtree: true,
      attributeFilter: ['aria-hidden', 'class']
    });

    // Chamada inicial para configurar as animações com base no estado ativo padrão
    handleMultiStateChange();
  }
});