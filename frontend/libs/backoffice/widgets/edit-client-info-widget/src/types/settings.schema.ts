import { z } from 'zod';
import { FORM_ITEM_NAMES } from '../utils/form-item-name';
import { REGEX_PATTERNS } from '@oxygen/utils';

export const createFormSchema = (t: (key: string) => string) =>
  z.object({
    [FORM_ITEM_NAMES.latinNameClient]: z
      .string({ required_error: t('error.required') })
      .min(1, { message: t('error.required') })
      .regex(REGEX_PATTERNS.isLatinText, {
        message: t('error.english_validation_message'),
      }),
    [FORM_ITEM_NAMES.persianNameClient]: z
      .string({ required_error: t('error.required') })
      .min(1, { message: t('error.required') })
      .regex(REGEX_PATTERNS.isPersianText, {
        message: t('error.persian_validation_message'),
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
      .refine((value) => !value || REGEX_PATTERNS.urlValidator.test(value), {
        message: t('error.url_validation_message'),
      }),
    [FORM_ITEM_NAMES.inputAddress]: z
      .string({ required_error: t('error.required') })
      .url({ message: t('error.url_validation_message') }),
    [FORM_ITEM_NAMES.returnAddress]: z
      .string({ required_error: t('error.required') })
      .url({ message: t('error.url_validation_message') }),
    [FORM_ITEM_NAMES.aggregatorStatus]: z.boolean().optional(),
    [FORM_ITEM_NAMES.aggregator]: z
      .string({ required_error: t('error.required') })
      .min(1, { message: t('error.required') }),
  });

export type FormValues = z.infer<ReturnType<typeof createFormSchema>>;
