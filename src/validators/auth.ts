import { z } from 'zod';

export const authFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  name: z.string().nullish(),
});
