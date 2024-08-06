import { z } from 'zod';

export const postSchema = z.object({
  title: z
    .string()
    .min(10, 'Title must be at least 10 characters')
    .max(100, 'Title must be 100 characters or less'),
  content: z.string().min(100, 'Content must be at least 100 characters'),
});
