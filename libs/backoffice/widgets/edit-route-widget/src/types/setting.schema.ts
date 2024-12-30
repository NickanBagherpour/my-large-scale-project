import { z } from 'zod';
import { FORM_ITEM_NAMES } from '../utils/form-item-name';
import { REGEX_PATTERNS } from '@oxygen/utils';

export const FormSchema = (t: (key: string) => string) =>
  z.object({
    [FORM_ITEM_NAMES.action]: z
      .string({ required_error: t('error.required') })
      .trim()
      .min(1, { message: t('error.required') })
      .regex(REGEX_PATTERNS.isLatinText, {
        message: t('error.english_validation_message'),
      }),
    [FORM_ITEM_NAMES.protocol]: z
      .string({ required_error: t('error.required') })
      .trim()
      .min(1, { message: t('error.required') })
      .regex(REGEX_PATTERNS.isPersianText, {
        message: t('error.persian_validation_message'),
      }),
    [FORM_ITEM_NAMES.path]: z
      .string({ required_error: t('error.required') })
      .trim()
      .min(1, { message: t('error.required') })
      .regex(REGEX_PATTERNS.isPersianText, {
        message: t('error.persian_validation_message'),
      }),
    [FORM_ITEM_NAMES.host]: z
      .string({ required_error: t('error.required') })
      .trim()
      .min(1, { message: t('error.required') })
      .regex(REGEX_PATTERNS.isPersianText, {
        message: t('error.persian_validation_message'),
      }),
  });

export type FormValues = z.infer<ReturnType<typeof FormSchema>>;
