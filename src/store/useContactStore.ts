import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ContactState {
  isSubmitting: boolean;
  error: string | null;
  success: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setError: (error: string | null) => void;
  setSuccess: (success: boolean) => void;
  reset: () => void;
}

export const useContactStore = create<ContactState>()(
  devtools(
    (set) => ({
      isSubmitting: false,
      error: null,
      success: false,
      setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
      setError: (error) => set({ error }),
      setSuccess: (success) => set({ success }),
      reset: () => set({ isSubmitting: false, error: null, success: false })
    }),
    { name: 'contact-store' }
  )
);