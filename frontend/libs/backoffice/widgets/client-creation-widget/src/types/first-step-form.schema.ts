import { z } from 'zod';

import { FormItem } from '../utils/consts';

export const createFormSchema = (t: (key: string) => string) =>
  z.object({
    [FormItem.latin_name_client]: z.string({ required_error: t('error.required') }).regex(/^[A-Za-z\s]+$/, {
      message: t('error.english_only'),
    }),

    [FormItem.persian_name_client]: z.string({ required_error: t('error.required') }).regex(/^[\u0600-\u06FF\s]+$/, {
      message: t('error.persian_only'),
    }),

    [FormItem.client_type]: z.string({ required_error: t('error.required') }).min(1, { message: t('error.required') }),

    [FormItem.client_id]: z.string({ required_error: t('error.required') }).min(1, { message: t('error.required') }),

    [FormItem.identity_auth]: z
      .string({ required_error: t('error.required') })
      .min(1, { message: t('error.required') }),

    [FormItem.website_url]: z.string().url('slkjhfdg').optional().or(z.literal('')),

    [FormItem.return_address]: z
      .string({ required_error: t('error.required') })
      .min(1, { message: t('error.required') }),
  });

export type FormValues = z.infer<ReturnType<typeof createFormSchema>>;
