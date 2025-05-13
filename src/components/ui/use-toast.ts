
import { toast as sonnerToast } from "sonner";

type ToastProps = {
  description?: React.ReactNode;
  duration?: number;
  action?: React.ReactNode;
};

// Define the toast function that accepts either a string or an object with title and description
export const toast = (message: string | { title: string; description?: string }, props?: ToastProps) => {
  if (typeof message === 'string') {
    return sonnerToast(message, props);
  } else {
    return sonnerToast(message.title, {
      description: message.description,
      ...props
    });
  }
};

// Re-export useToast from sonner
export const useToast = () => {
  return {
    toast
  };
};
