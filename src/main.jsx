import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './components'
import './assets/css/index.css'
import { AuthProvider } from './providers/AuthProvider'
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </React.StrictMode>
)
