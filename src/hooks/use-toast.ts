
import { toast as sonnerToast } from "sonner";

type ToastProps = {
  description?: React.ReactNode;
  duration?: number;
  action?: React.ReactNode;
};

export const toast = (title: string, props?: ToastProps) => {
  return sonnerToast(title, props);
};

export { useToast } from "sonner";
