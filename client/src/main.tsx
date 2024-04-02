import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import { AutenticationProvider } from './utils/AuthenticationProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AutenticationProvider />
  </React.StrictMode>
)
