
import { toast as sonnerToast, type Toast as SonnerToast } from "sonner";

export type ToastProps = {
  title?: string;
  description?: React.ReactNode;
  [key: string]: any;
};

export function toast(props: ToastProps | string) {
  if (typeof props === 'string') {
    return sonnerToast(props);
  }
  
  const { title, description, ...rest } = props;
  return sonnerToast(title || '', {
    description,
    ...rest
  });
}

export function useToast() {
  return {
    toast
  };
}
