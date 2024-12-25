import { z } from 'zod';
import { FORM_ITEM_NAMES } from '../utils/form-item-name';
import { REGEX_PATTERNS } from '@oxygen/utils';

export const createFormSchema = (t: (key: string) => string) =>
  z.object({
    [FORM_ITEM_NAMES.scopesName]: z
      .string()
      .trim()
      .regex(REGEX_PATTERNS.isLatinText, {
        message: t('error.english_character'),
      })
      .optional(),
  });

export type FormValues = z.infer<ReturnType<typeof createFormSchema>>;
