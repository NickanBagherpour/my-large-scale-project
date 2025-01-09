import z from 'zod';
import { TFunction } from 'i18next';

import { REGEX_PATTERNS } from '@oxygen/utils';

export const FORM_ITEM_NAMES = {
  name: 'name',
  description: 'description',
} as const;

const requiredString = (t: (key: string) => string) =>
  z
    .string({ required_error: t('error.required') })
    .trim()
    .min(1, { message: t('error.required') });

const regexString = (pattern: RegExp, errorKey: string, t: (key: string) => string) =>
  requiredString(t).regex(pattern, { message: t(errorKey) });

export const createUpstreamType = (t: TFunction) => {
  return z.object({
    [FORM_ITEM_NAMES.name]: regexString(REGEX_PATTERNS.isLatinText, 'error.english_validation_message', t).max(
      150,
      t('validation.max_len', { val: 150 })
    ),
    [FORM_ITEM_NAMES.description]: regexString(REGEX_PATTERNS.isPersianText, 'error.persian_validation_message', t).max(
      150,
      t('validation.max_len', { val: 150 })
    ),
  });
};
export type CreateUpstreamType = z.infer<ReturnType<typeof createUpstreamType>>;
