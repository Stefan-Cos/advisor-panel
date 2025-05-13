
import { toast as sonnerToast } from "sonner";

export type ToastProps = Omit<Parameters<typeof sonnerToast>[1], "title" | "description"> & {
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
