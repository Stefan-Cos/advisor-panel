
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App.tsx'
import './index.css'
import { debugTrackingScripts } from './utils/trackingDebugger'

// Create a root for the application
const root = createRoot(document.getElementById("root")!)

// A simple fade-in transition effect
document.body.style.opacity = '0'
document.body.style.transition = 'opacity 0.5s ease-in-out'

// Inject global styles for Shepherd tour
const globalStyles = document.createElement('style')
globalStyles.innerHTML = `
  .shepherd-modal-overlay-container {
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
  }
  
  .shepherd-element {
    z-index: 10000 !important;
  }
  
  .shepherd-header {
    background-color: #001437 !important;
  }
  
  .shepherd-title {
    color: white !important;
  }
  
  .shepherd-cancel-icon {
    color: white !important;
  }
  
  .shepherd-button:not(.shepherd-button-secondary) {
    background-color: #001437 !important;
    color: white !important;
  }
  
  .shepherd-button:not(.shepherd-button-secondary):hover {
    background-color: #00204f !important;
  }
  
  .shepherd-arrow[data-popper-placement^="top"]::before {
    background-color: #001437 !important;
  }
`
document.head.appendChild(globalStyles)

// Render the App component
root.render(
  <StrictMode>
    <App />
  </StrictMode>
)

// Set the body to fully opaque once the app is loaded and debug tracking scripts
window.addEventListener('load', () => {
  setTimeout(() => {
    document.body.style.opacity = '1'
    // Debug tracking scripts after page load
    debugTrackingScripts()
  }, 100)
})
