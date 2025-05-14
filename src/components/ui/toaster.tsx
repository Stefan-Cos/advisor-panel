
import { Toaster as SonnerToaster } from "sonner"

export function Toaster() {
  return (
    <SonnerToaster 
      position="bottom-right"
      closeButton
      richColors
      theme="light"
      className="toaster-with-animations"
      toastOptions={{
        duration: 5000,
        classNames: {
          toast: "animate-fade-in"
        }
      }}
    />
  )
}
