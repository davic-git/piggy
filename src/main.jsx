import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ThemeProvider } from './lib/ThemeProvider'
import { ValoresOcultosProvider } from './lib/ValoresOcultosProvider'
import './styles/tokens.css'
import './styles/global.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <ValoresOcultosProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ValoresOcultosProvider>
    </ThemeProvider>
  </StrictMode>
)