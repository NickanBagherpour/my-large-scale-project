import z from 'zod';
import { TFunction } from 'i18next';

import { REGEX_PATTERNS_ACCEPT_DASH } from '@oxygen/utils';

export const FORM_ITEM_NAMES = {
  name: 'name',
  description: 'description',
} as const;

export const createUpstreamType = (t: TFunction) => {
  return z.object({
    [FORM_ITEM_NAMES.name]: z
      .string({ required_error: t('error.required') })
      .trim()
      .min(1, t('error.required'))
      .max(150, t('validation.max_len', { val: 150 }))
      .regex(REGEX_PATTERNS_ACCEPT_DASH.isLatinText, t('error.english_validation_message')),
    [FORM_ITEM_NAMES.description]: z
      .string({ required_error: t('error.required') })
      .trim()
      .min(1, t('error.required'))
      .max(150, t('validation.max_len', { val: 150 }))
      .regex(REGEX_PATTERNS_ACCEPT_DASH.isPersianText, t('error.persian_validation_message')),
  });
};
export type CreateUpstreamType = z.infer<ReturnType<typeof createUpstreamType>>;
