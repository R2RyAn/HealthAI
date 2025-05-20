
import { createRoot } from 'react-dom/client';
import { Platform } from 'react-native';
import App from './App.tsx';
import './index.css';

// Only run this code on web platform
if (Platform.OS === 'web') {
  const rootElement = document.getElementById("root");
  if (rootElement) {
    createRoot(rootElement).render(<App />);
  } else {
    console.error("Root element not found");
  }
}

// For non-web platforms, App.js handles the registration
