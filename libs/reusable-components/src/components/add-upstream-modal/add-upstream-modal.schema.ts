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
      .string({ required_error: t('validation.required') })
      .trim()
      .min(1, t('validation.required'))
      .max(NAME_MAX_LENGTH, t('validation.max_len', { val: NAME_MAX_LENGTH }))
      .regex(REGEX_PATTERNS.isLatinText, t('validation.english_validation_message'))
      .regex(REGEX_PATTERNS_MORE_VALIDATION.dontAcceptNumbers, t('validation.default_validation_message'))
      .regex(REGEX_PATTERNS_MORE_VALIDATION.acceptDash, t('validation.default_validation_message')),
    [FORM_ITEM_NAMES.description]: z
      .string({ required_error: t('validation.required') })
      .trim()
      .min(1, t('validation.required'))
      .max(NAME_MAX_LENGTH, t('validation.max_len', { val: NAME_MAX_LENGTH }))
      .regex(REGEX_PATTERNS.isPersianText, t('validation.persian_validation_message'))
      .regex(REGEX_PATTERNS_MORE_VALIDATION.dontStartWithNumber, t('validation.default_validation_message'))
      .regex(REGEX_PATTERNS_MORE_VALIDATION.acceptDash, t('validation.default_validation_message')),
  });
};
export type CreateUpstreamType = z.infer<ReturnType<typeof createUpstreamType>>;
