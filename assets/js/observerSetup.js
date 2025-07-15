// observerSetup.js

import { handleMultiStateChange } from './stateController.js';
import { msoConfigs } from './configs.js'; // ✅ Importe aqui

export function setupMSO(msObjectId) {
  const config = msoConfigs[msObjectId]; // Agora funciona!
  if (!config) {
    console.warn(`Configuração não encontrada para o MSO: ${msObjectId}`);
    return;
  }

  const slideshow = document.getElementById(msObjectId);
  if (!slideshow) return;

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (
        mutation.type === 'attributes' &&
        ['aria-hidden', 'class'].includes(mutation.attributeName)
      ) {
        const target = mutation.target;
        if (target.classList.contains('state')) {
          handleMultiStateChange(msObjectId, config);
        }
      }
    });
  });

  observer.observe(slideshow, {
    attributes: true,
    subtree: true,
    attributeFilter: ['aria-hidden', 'class']
  });

  handleMultiStateChange(msObjectId, config);
}