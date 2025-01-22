import z from 'zod';
import { TFunction } from 'i18next';
import { REGEX_PATTERNS, REGEX_PATTERNS_MORE_VALIDATION } from '../pattern-util';
import { limits } from './constants';

export const createValidationSchema = (t: TFunction) => {
  const validationSchema = {
    required: z
      .string({
        required_error: t('validation.required'),
        invalid_type_error: t('validation.required') /* if value is null */,
      })
      .trim()
      .min(limits.DEFAULT_MIN_LENGTH, { message: t('validation.required') })
      .max(limits.DEFAULT_MAX_LENGTH, { message: t('validation.max_length') }),

    idSelection: z.number({ required_error: t('validation.choose_one_option') }),

    english: z
      .string({ required_error: t('validation.required'), invalid_type_error: t('validation.required') })
      .trim()
      .min(limits.DEFAULT_MIN_LENGTH, { message: t('validation.required') })
      .max(limits.DEFAULT_MAX_LENGTH, {
        message: t('validation.max_length'),
      })
      .regex(REGEX_PATTERNS.isLatinText, {
        message: t('validation.english_name_error'),
      }),

    persian: z
      .string({ required_error: t('validation.required'), invalid_type_error: t('validation.required') })
      .trim()
      .min(limits.DEFAULT_MIN_LENGTH, { message: t('validation.required') })
      .max(limits.DEFAULT_MAX_LENGTH, {
        message: t('validation.max_length'),
      })
      .regex(REGEX_PATTERNS.isPersianText, {
        message: t('validation.english_name_error'),
      }),

    url: z
      .string({ required_error: t('validation.required'), invalid_type_error: t('validation.required') })
      .trim()
      .min(limits.DEFAULT_MIN_LENGTH, { message: t('validation.required') })
      .max(limits.DEFAULT_MAX_LENGTH, {
        message: t('validation.max_length'),
      })
      .regex(REGEX_PATTERNS.urlValidator, {
        message: t('validation.english_name_error'),
      }),

    boolean: z.boolean({ required_error: t('validation.required') }),

    mobileNumber: z
      .string({ required_error: 'validation.required' })
      .regex(REGEX_PATTERNS.mobileNumber, { message: 'error.default_validation_message' }),

    tagsList: z
      .array(z.object({ key: z.number(), value: z.number(), label: z.string() }), {
        message: t('validation.choose_at_least_one_option'),
      })
      .min(limits.DEFAULT_MIN_LENGTH, { message: t('validation.choose_at_least_one_option') }),

    upstreamName: z
      .string({ required_error: t('error.required') })
      .trim()
      .min(1, t('error.required'))
      .max(limits.UPSTREAM_MAX_LENGTH, t('validation.max_len', { val: limits.UPSTREAM_MAX_LENGTH }))
      .regex(REGEX_PATTERNS.isLatinText, t('error.english_validation_message'))
      .regex(REGEX_PATTERNS_MORE_VALIDATION.dontAcceptNumbers, t('error.default_validation_message'))
      .regex(REGEX_PATTERNS_MORE_VALIDATION.acceptDash, t('error.default_validation_message')),

    upstreamDescription: z
      .string({ required_error: t('error.required') })
      .trim()
      .min(1, t('error.required'))
      .max(limits.UPSTREAM_MAX_LENGTH, t('validation.max_len', { val: limits.UPSTREAM_MAX_LENGTH }))
      .regex(REGEX_PATTERNS.isPersianText, t('error.persian_validation_message'))
      .regex(REGEX_PATTERNS_MORE_VALIDATION.dontStartWithNumber, t('error.default_validation_message'))
      .regex(REGEX_PATTERNS_MORE_VALIDATION.acceptDash, t('error.default_validation_message')),
  };

  return validationSchema;
};
