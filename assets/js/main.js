// /js/main.js

import { setupMSO } from './observerSetup.js';
import { msoConfigs } from './configs.js';

document.addEventListener('DOMContentLoaded', () => {
  Object.keys(msoConfigs).forEach(setupMSO);
});