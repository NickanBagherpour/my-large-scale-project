import { z } from 'zod';
import { FormItem } from '../utils/consts';

export const createFormSchema = (t: (key: string) => string) => {
  const requiredString = z.string({ required_error: t('error.required') }).min(1, { message: t('error.required') });

  return z.object({
    // Name Fields
    [FormItem.latin_name_client]: requiredString.regex(/^[A-Za-z\s]+$/, {
      message: t('error.english_only'),
    }),

    [FormItem.persian_name_client]: requiredString.regex(/^[\u0600-\u06FF\s]+$/, {
      message: t('error.persian_only'),
    }),

    // Required Fields
    [FormItem.client_type]: requiredString,
    [FormItem.user_name]: requiredString,
    [FormItem.national_code]: requiredString,
    [FormItem.organization_name]: requiredString,
    [FormItem.mobile_number]: requiredString,
    [FormItem.client_id]: requiredString,
    [FormItem.identity_auth]: requiredString,

    // URL Field
    [FormItem.return_address]: requiredString.url(t('error.invalid_url')),
  });
};

export type FormValues = z.infer<ReturnType<typeof createFormSchema>>;
