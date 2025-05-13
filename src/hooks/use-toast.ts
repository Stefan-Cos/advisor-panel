
import { toast as sonnerToast, type ToastOptions as SonnerToastOptions } from "sonner";

export type ToastProps = SonnerToastOptions & {
  title?: string;
  description?: React.ReactNode;
};

export function toast(title: string, props?: ToastProps) {
  return sonnerToast(title, props);
}

export function useToast() {
  return {
    toast,
  };
}
