
import { toast as sonnerToast } from "sonner";

type ToastProps = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
};

const toast = ({
  title,
  description,
  action,
  variant = "default",
  ...props
}: ToastProps) => {
  return sonnerToast(title, {
    description,
    action,
    ...props,
  });
};

export { toast };
export const useToast = () => ({ toast });
