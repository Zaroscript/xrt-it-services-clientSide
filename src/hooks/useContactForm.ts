import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactFormData } from '@/schemas/contactSchema';
import { useContactStore } from '@/store/useContactStore';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

export const useContactForm = () => {
  const { isSubmitting, error, success, setError, setSuccess, setIsSubmitting } = useContactStore();
  const router = useRouter();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      businessName: '',
      website: '',
      message: '',
      service: '',
    }
  });

  const onSubmit = useCallback(
    async (data: ContactFormData) => {
      try {
        setIsSubmitting(true);
        
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || 'Failed to send message');
        }

        setSuccess(true);
        form.reset();
        return result;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        setError(errorMessage);
        throw error;
      } finally {
        setIsSubmitting(false);
      }
    },
    [form, setError, setIsSubmitting, setSuccess]
  );

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting,
    success,
    error,
  };
};