import { z } from 'zod';
import { FORM_ITEM_NAMES } from '../utils/form-item-name';
import { REGEX_PATTERNS } from '@oxygen/utils';

const requiredString = (t: (key: string) => string) =>
  z
    .string({ required_error: t('validation.required') })
    .trim()
    .min(1, { message: t('validation.required') });

const regexString = (pattern: RegExp, errorKey: string, t: (key: string) => string) =>
  requiredString(t).regex(pattern, { message: t(errorKey) });

const optionalRegexString = (pattern: RegExp, errorKey: string, t: (key: string) => string) =>
  z
    .string()
    .regex(pattern, { message: t(errorKey) })
    .optional();

export const createFormSchema = (t: (key: string) => string) =>
  z.object({
    [FORM_ITEM_NAMES.latinNameClient]: regexString(
      REGEX_PATTERNS.isLatinText,
      'validation.english_validation_message',
      t
    ),
    [FORM_ITEM_NAMES.persianNameClient]: regexString(
      REGEX_PATTERNS.isPersianText,
      'validation.persian_validation_message',
      t
    ),
    [FORM_ITEM_NAMES.clientType]: requiredString(t),
    [FORM_ITEM_NAMES.clientId]: requiredString(t),
    [FORM_ITEM_NAMES.identityAuth]: requiredString(t),
    [FORM_ITEM_NAMES.websiteUrl]: optionalRegexString(
      REGEX_PATTERNS.optionalUrlValidator,
      'validation.url_validation_message',
      t
    ),
    [FORM_ITEM_NAMES.inputAddress]: regexString(
      REGEX_PATTERNS.optionalUrlValidator,
      'validation.url_validation_message',
      t
    ),
    [FORM_ITEM_NAMES.returnAddress]: regexString(
      REGEX_PATTERNS.optionalUrlValidator,
      'validation.url_validation_message',
      t
    ),
    [FORM_ITEM_NAMES.aggregatorStatus]: z.boolean().optional(),
    [FORM_ITEM_NAMES.aggregator]: requiredString(t),
  });

export type FormValues = z.infer<ReturnType<typeof createFormSchema>>;
