
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App.tsx'
import './index.css'

// Create a root for the application
const root = createRoot(document.getElementById("root")!)

// A simple fade-in transition effect
document.body.style.opacity = '0'
document.body.style.transition = 'opacity 0.5s ease-in-out'

// Render the App component
root.render(
  <StrictMode>
    <App />
  </StrictMode>
)

// Set the body to fully opaque once the app is loaded
window.addEventListener('load', () => {
  setTimeout(() => {
    document.body.style.opacity = '1'
  }, 100)
})
