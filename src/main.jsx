// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthProvider.jsx'
import { CatalogoProvider } from './context/CatalogoProvider.jsx'
import { CarritoProvider } from './context/CarritoProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CatalogoProvider>
          <CarritoProvider>
            <App />
          </CarritoProvider>
        </CatalogoProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
