import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { preloadTranslation } from './services/i18n';
import './assets/styles/index.css';

async function initApp() {
    await preloadTranslation();
  
    ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    );
}
  
initApp();