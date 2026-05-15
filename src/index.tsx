import React from 'react';
import GameProvider from './core/Contexts/GameProvider';
import App from './App';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <GameProvider>
    <App />
  </GameProvider>,
);
