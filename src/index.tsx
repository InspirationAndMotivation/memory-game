import React, { useState } from 'react';
import ModeProvider from './core/Contexts/ModeProvider';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <ModeProvider>
    <App />
  </ModeProvider>
);
