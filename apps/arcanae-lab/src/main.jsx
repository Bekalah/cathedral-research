/* eslint-disable no-unused-vars */
import { createRoot } from 'react-dom/client';
import App from './App.jsx'; // Used in JSX below

// Wait for fonts to load
document.fonts.ready.then(() => {
  // Fade out loading screen
  setTimeout(() => {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
      loadingScreen.style.opacity = '0';
      loadingScreen.style.transition = 'opacity 1s ease-out';

      setTimeout(() => {
        loadingScreen.remove();
      }, 1000);
    }
  }, 1000);
});

// Mount the React app
const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);