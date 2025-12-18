import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

import './index.css'
import App from './App.jsx'


// Usa la variable de entorno si existe, si no, usa localhost (para desarrollo)
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if(token){

    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
}
)

axios.interceptors.response.use(
  (response) => {
    // Si la respuesta es buena, déjala pasar
    return response;
  },
  (error) => {
    // Si hay un error, revisamos si es un 401 (Token inválido/vencido)
    if (error.response && error.response.status === 401) {
      
      // Borramos el token malo
      localStorage.removeItem('token');
      
      // Forzamos la recarga hacia el login
      // Usamos window.location porque aquí no tenemos acceso a 'navigate'
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>,
)
