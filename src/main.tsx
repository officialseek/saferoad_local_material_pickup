import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import favicon from './assets/favicon.ico'
import './index.css'
import App from './App.tsx'

const faviconLink =
  document.querySelector<HTMLLinkElement>("link[rel='icon']") ?? document.createElement('link')
faviconLink.rel = 'icon'
faviconLink.href = favicon
document.head.appendChild(faviconLink)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
