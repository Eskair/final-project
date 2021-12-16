import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './index.css';

// auth provider
import { AuthProvider } from './hooks/useAuth';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
