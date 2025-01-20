import z from 'zod';
import { TFunction } from 'i18next';

import { REGEX_PATTERNS, REGEX_PATTERNS_MORE_VALIDATION } from '@oxygen/utils';

export const FORM_ITEM_NAMES = {
  name: 'name',
  description: 'description',
} as const;

export const NAME_MAX_LENGTH = 150;

export const createUpstreamType = (t: TFunction) => {
  return z.object({
    [FORM_ITEM_NAMES.name]: z
      .string({ required_error: t('error.required') })
      .trim()
      .min(1, t('error.required'))
      .max(NAME_MAX_LENGTH, t('validation.max_len', { val: NAME_MAX_LENGTH }))
      .regex(REGEX_PATTERNS.isLatinText, t('error.english_validation_message'))
      .regex(REGEX_PATTERNS_MORE_VALIDATION.dontAcceptNumbers, t('error.default_validation_message'))
      .regex(REGEX_PATTERNS_MORE_VALIDATION.acceptDash, t('error.default_validation_message')),
    [FORM_ITEM_NAMES.description]: z
      .string({ required_error: t('error.required') })
      .trim()
      .min(1, t('error.required'))
      .max(NAME_MAX_LENGTH, t('validation.max_len', { val: NAME_MAX_LENGTH }))
      .regex(REGEX_PATTERNS.isPersianText, t('error.persian_validation_message'))
      .regex(REGEX_PATTERNS_MORE_VALIDATION.dontStartWithNumber, t('error.default_validation_message'))
      .regex(REGEX_PATTERNS_MORE_VALIDATION.acceptDash, t('error.default_validation_message')),
  });
};
export type CreateUpstreamType = z.infer<ReturnType<typeof createUpstreamType>>;
