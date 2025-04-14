import { z } from 'zod';

export const sampleSchema = z
  .object({
    name: z.string().max(25, 'validation.max_length').nullable(),
    code: z.string().max(25, 'validation.max_length').nullable(),
    branchCode: z.string().max(6, 'validation.max_length').nullable(),
  })
  .partial();

export type FormFieldsType = z.infer<typeof sampleSchema>;
