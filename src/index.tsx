import React from 'react';
import { createRoot } from 'react-dom/client';

import 'modern-normalize/modern-normalize.css';
import './styles/reset.css';
import './styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);

root.render(
  <React.StrictMode>
    <div></div>
  </React.StrictMode>
);
