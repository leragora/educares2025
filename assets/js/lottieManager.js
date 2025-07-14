// /js/lottieManager.js

const lottieAnimations = {};

export function createLottieAnimation(containerId, animationPath) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.warn(`Contêiner com ID '${containerId}' não encontrado.`);
    return null;
  }

  // Retorna a instância já criada se existir
  if (lottieAnimations[containerId]) {
    return lottieAnimations[containerId];
  }

  const animation = lottie.loadAnimation({
    container: container,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: animationPath
  });

  animation.addEventListener('DOMLoaded', () => {
    console.log(`Animação Lottie para '${containerId}' carregada com sucesso!`);
  });

  animation.addEventListener('error', error => {
    console.error(`Erro ao carregar animação '${containerId}':`, error);
  });

  lottieAnimations[containerId] = animation;
  return animation;
}