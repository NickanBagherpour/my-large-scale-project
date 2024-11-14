import { z } from 'zod';
import { FORM_ITEM_NAMES } from '../utils/form-item-name';
import { REGEX_PATTERNS } from '@oxygen/utils';

export const createFormSchema = (t: (key: string) => string) =>
  z.object({
    [FORM_ITEM_NAMES.latinNameClient]: z
      .string({ required_error: t('error.required') })
      .trim()
      .min(1, { message: t('error.required') })
      .regex(REGEX_PATTERNS.isLatinText, {
        message: t('error.english_character'),
      }),
  });

export type FormValues = z.infer<ReturnType<typeof createFormSchema>>;
