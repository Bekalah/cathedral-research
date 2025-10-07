
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles.css';
import { CathedralBridgeHub } from '../../../packages/cathedral-bridge-system/index.ts';

// Register this app in the unified system
CathedralBridgeHub.registerSystem('cathedral-of-circuits', {
  type: 'app',
  nodes: [],
  layers: ['circuits', 'logic', 'portal'],
  status: 'active'
});

// Make all other apps aware of this system
window.CathedralBridgeHub = CathedralBridgeHub;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)