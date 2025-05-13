import { toast as sonnerToast, type ToastT } from "sonner";

// Create a wrapper function for toast that can handle both formats
const toast: typeof sonnerToast & {
  (title: string, options?: { description?: string; [key: string]: any }): void;
} = ((...args: any[]) => {
  // If first argument is a string and second is an object, convert to sonner format
  if (typeof args[0] === 'string' && typeof args[1] === 'object') {
    const [title, options] = args;
    return sonnerToast(title, options);
  }
  // Otherwise, pass through to sonner toast
  return (sonnerToast as any)(...args);
}) as any;

// For backwards compatibility and to match our hook pattern
export const useToast = () => {
  return {
    toast,
  };
};

export { toast };
