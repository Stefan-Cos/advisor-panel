
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Adding these animations for the project creation flow
export const extendedAnimations = {
  "slide-in-right": {
    animation: "slide-in-right 0.5s ease-out forwards",
    keyframes: {
      "0%": { transform: "translateX(100%)", opacity: "0" },
      "100%": { transform: "translateX(0)", opacity: "1" }
    }
  },
  "scale-in": {
    animation: "scale-in 0.3s ease-out forwards",
    keyframes: {
      "0%": { transform: "scale(0)", opacity: "0" },
      "100%": { transform: "scale(1)", opacity: "1" }
    }
  },
  "ping": {
    animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
    keyframes: {
      "0%": { transform: "scale(1)", opacity: "1" },
      "75%, 100%": { transform: "scale(2)", opacity: "0" }
    }
  }
}
