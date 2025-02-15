import { z } from 'zod';
import { FORM_ITEM_NAMES } from '../utils/form-item-name';
import { REGEX_PATTERNS } from '@oxygen/utils';

export const FormSchema = (t: (key: string) => string) =>
  z.object({
    [FORM_ITEM_NAMES.englishNameScope]: z
      .string({ required_error: t('validation.required') })
      .trim()
      .min(1, { message: t('validation.required') })
      .regex(REGEX_PATTERNS.isenglishText, {
        message: t('validation.english_validation_message'),
      }),
    [FORM_ITEM_NAMES.persianNameScope]: z
      .string({ required_error: t('validation.required') })
      .trim()
      .min(1, { message: t('validation.required') })
      .regex(REGEX_PATTERNS.isPersianText, {
        message: t('validation.persian_validation_message'),
      }),
  });

export type FormValues = z.infer<ReturnType<typeof FormSchema>>;
