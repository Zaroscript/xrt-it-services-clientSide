import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number').optional(),
  businessName: z.string().optional(),
  website: z.string().url('Please enter a valid URL').or(z.literal('')).optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  service: z.string().optional()
});

export type ContactFormData = z.infer<typeof contactSchema>;