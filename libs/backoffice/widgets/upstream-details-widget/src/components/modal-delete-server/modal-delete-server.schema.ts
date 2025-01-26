import z from 'zod';
import { TFunction } from 'i18next';

import { REGEX_PATTERNS } from '@oxygen/utils';

export const FORM_ITEM_NAMES = {
  domain: 'domain',
  weight: 'weight',
  healthStatus: 'health_status',
} as const;

const requiredString = (t: (key: string) => string) =>
  z
    .string({ required_error: t('validation.required') })
    .trim()
    .min(1, { message: t('validation.required') });

const regexString = (pattern: RegExp, errorKey: string, t: (key: string) => string) =>
  requiredString(t).regex(pattern, { message: t(errorKey) });

export const createServerType = (t: TFunction) => {
  return z.object({
    // [FORM_ITEM_NAMES.domain]: regexString(REGEX_PATTERNS.isLatinText, 'validation.english_validation_message', t).max(
    //   150,
    //   t('validation.max_len', { val: 150 })
    // ),
    // [FORM_ITEM_NAMES.weight]: regexString(REGEX_PATTERNS.isPersianText, 'validation.persian_validation_message', t).max(
    //   150,
    //   t('validation.max_len', { val: 150 })
    // ),
  });
};
export type CreateServerType = z.infer<ReturnType<typeof createServerType>>;
