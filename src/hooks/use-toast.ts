
import { toast as sonnerToast } from "sonner";

export type ToastProps = Omit<Parameters<typeof sonnerToast>[1], "title" | "description"> & {
  title?: string;
  description?: React.ReactNode;
};

const useToast = () => {
  return {
    toast: ({ title, description, ...props }: ToastProps) => {
      sonnerToast(title, {
        description,
        ...props,
      });
    },
  };
};

export { useToast, sonnerToast as toast };
