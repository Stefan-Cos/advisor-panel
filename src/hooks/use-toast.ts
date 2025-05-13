
import { toast as sonnerToast } from "sonner";

// Re-export sonner toast directly
export const toast = sonnerToast;

// For backwards compatibility and to match our hook pattern
export const useToast = () => ({ toast: sonnerToast });
