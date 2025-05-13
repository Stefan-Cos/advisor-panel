
import { toast as sonnerToast, type ToastT } from "sonner"

export type ToasterToast = ToastT

const toast = sonnerToast;

export { toast, type ToasterToast as Toast }
export const useToast = () => ({ toast })
