import { z } from 'zod';
import { FORM_ITEM_NAMES } from '../utils/form-item-name';

export const createFormSchema = (t: (key: string) => string) =>
  z.object({
    [FORM_ITEM_NAMES.latinNameClient]: z
      .string({ required_error: t('error.required') })
      .min(1, { message: t('error.required') })
      .regex(/^[^\u0600-\u06FF]*$/, {
        message: t('error.english_name_error'),
      }),
    [FORM_ITEM_NAMES.persianNameClient]: z
      .string({ required_error: t('error.required') })
      .min(1, { message: t('error.required') })
      .regex(/^[^a-zA-Z]*$/, {
        message: t('error.persian_name_error'),
      }),
    [FORM_ITEM_NAMES.clientType]: z.string({ required_error: t('error.required') }),
    [FORM_ITEM_NAMES.clientId]: z
      .string({ required_error: t('error.required') })
      .min(1, { message: t('error.required') }),
    [FORM_ITEM_NAMES.identityAuth]: z
      .string({ required_error: t('error.required') })
      .min(1, { message: t('error.required') }),
    [FORM_ITEM_NAMES.websiteUrl]: z
      .string()
      .optional()
      .refine((value) => !value || /^https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value), {
        message: t('error.error_website_url'),
      }),
    [FORM_ITEM_NAMES.inputAddress]: z
      .string({ required_error: t('error.required') })
      .url({ message: t('error.error_website_url') }),
    [FORM_ITEM_NAMES.returnAddress]: z
      .string({ required_error: t('error.required') })
      .url({ message: t('error.error_website_url') }),
    [FORM_ITEM_NAMES.aggregatorStatus]: z.boolean().optional(),
    [FORM_ITEM_NAMES.aggregator]: z
      .string({ required_error: t('error.required') })
      .min(1, { message: t('error.required') }),
  });

export type FormValues = z.infer<ReturnType<typeof createFormSchema>>;
