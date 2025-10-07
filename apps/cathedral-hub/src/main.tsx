
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css'; // @ts-ignore
import { CathedralBridgeHub } from '../../../packages/cathedral-bridge-system/index.ts';

// Register this app in the unified system
CathedralBridgeHub.registerSystem('cathedral-hub', {
  type: 'app',
  nodes: [],
  layers: ['hub', 'portal', 'registry'],
  status: 'active'
});

// Make all other apps aware of this system
// @ts-ignore
(window as any).CathedralBridgeHub = CathedralBridgeHub;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)