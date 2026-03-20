import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/index.css'
import App from './app/App.jsx'
import Approutes from "./app/App.routes.jsx";

createRoot(document.getElementById('root')).render(
  <Approutes>
    <App />
  </Approutes>
)
