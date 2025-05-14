
import { toast as sonnerToast } from "sonner";

type ToastProps = {
  description?: React.ReactNode;
  duration?: number;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
};

// Define the toast function that accepts either a string or an object with title and description
export const toast = (message: string | { title: string; description?: string; variant?: "default" | "destructive" }, props?: ToastProps) => {
  if (typeof message === 'string') {
    return sonnerToast(message, props);
  } else {
    const { variant, ...rest } = message;
    // Map our variant to sonner's style if present
    const style = variant === 'destructive' ? { className: 'bg-destructive text-destructive-foreground' } : {};
    
    return sonnerToast(message.title, {
      description: message.description,
      ...style,
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
