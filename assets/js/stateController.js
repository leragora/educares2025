// /js/stateController.js

import { createLottieAnimation } from './lottieManager.js';

export function handleMultiStateChange(msObjectId, animationConfigMap) {
  const multiStateElement = document.getElementById(msObjectId);
  if (!multiStateElement) return;

  const states = multiStateElement.querySelectorAll('.pageItem.state');

  states.forEach(state => {
    const isActive = state.classList.contains('active') && state.getAttribute('aria-hidden') === 'false';
    const stateName = state.getAttribute('name');
    const config = animationConfigMap[stateName];

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