import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/01-app/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
