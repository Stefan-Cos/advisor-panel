
import { toast as sonnerToast, type ToastT } from "sonner";

// Define the correct types based on the sonner library implementation
export type Toast = ToastT;

export function toast(message: string | React.ReactNode) {
  return sonnerToast(message);
}

export function useToast() {
  return {
    toast: (title: string | React.ReactNode, options?: ToastT) => {
      return sonnerToast(title, options);
    },
  };
}
