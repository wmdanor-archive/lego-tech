import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import 'modern-normalize/modern-normalize.css';
import './styles/reset.css';
import './styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRouter from './components/app-router';
import { setupStore } from './store';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);

const store = setupStore();

root.render(
  <React.StrictMode>
    <Provider store={store} >
      <AppRouter />
    </Provider>
  </React.StrictMode>
);
