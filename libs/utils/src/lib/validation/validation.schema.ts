import z from 'zod';
import { TFunction } from 'i18next';
import { REGEX_PATTERNS } from '../pattern-util';
import { limits } from './constants';

export const createValidationSchema = (
  t: TFunction,
  organizationNationalIdNumber?: number,
  organizationEconomyCodedNumber?: number,
  postalCodedNumber?: number
) => {
  const validationSchema = {
    required: z
      .string({
        required_error: t('validation.required'),
        invalid_type_error: t('validation.required') /* if value is null */,
      })
      .trim()
      .min(limits.DEFAULT_MIN_LENGTH, { message: t('validation.min_length') })
      .max(limits.DEFAULT_MAX_LENGTH, { message: t('validation.max_length') }),

    simpleRequired: z
      .string({
        required_error: t('validation.required'),
        invalid_type_error: t('validation.required') /* if value is null */,
      })
      .trim()
      .min(1, { message: t('validation.min_length') })
      .max(limits.DEFAULT_MAX_LENGTH, { message: t('validation.max_length') }),

    datePicker: z.preprocess(
      (input) => {
        // Ensure we are dealing with a string
        // if (input instanceof Date) {
        if (input instanceof Object) {
          return input.toString(); // Convert Date object to ISO string
        }
        return input == null ? ' ' : input; // Return as is if it's already a string
      },
      z
        .string({ required_error: t('error.required') })
        .refine((value) => value !== '', { message: t('validation.required') })
    ),

    searchField: z
      .string()
      .max(limits.DEFAULT_MAX_LENGTH, { message: t('validation.max_length') })
      .optional(),

    idSelection: z.number({ required_error: t('validation.choose_one_option') }),

    selectNumberRequired: z.number({
      required_error: t('validation.required'),
      invalid_type_error: t('validation.required') /* if value is null */,
    }),

    objectMultipleSelection: z
      .array(z.object({ value: z.number(), label: z.string() }), {
        message: t('validation.choose_at_least_one_option'),
      })
      .min(1, { message: t('validation.choose_at_least_one_option') }),

    objectSingleSelection: z
      .object({
        value: z.number(),
        label: z.string(),
      })
      .refine((data) => data.value !== undefined, {
        message: t('validation.choose_one_option'),
      }),
    english: z
      .string({ required_error: t('validation.required'), invalid_type_error: t('validation.required') })
      .trim()
      .min(limits.DEFAULT_MIN_LENGTH, { message: t('validation.min_length') })
      .max(limits.DEFAULT_MAX_LENGTH, {
        message: t('validation.max_length'),
      })
      .regex(REGEX_PATTERNS.isenglishText, {
        message: t('validation.english_name_error'),
      }),
    englishWithoutWhitespace: z
      .string({ required_error: t('validation.required'), invalid_type_error: t('validation.required') })
      .trim()
      .min(limits.DEFAULT_MIN_LENGTH, { message: t('validation.min_length') })
      .max(limits.DEFAULT_MAX_LENGTH, {
        message: t('validation.max_length'),
      })
      .regex(REGEX_PATTERNS.isenglishText, {
        message: t('validation.english_name_error'),
      })
      .regex(REGEX_PATTERNS.noWhitespace, {
        message: t('validation.no_whitespace'),
      }),
    persian: z
      .string({ required_error: t('validation.required'), invalid_type_error: t('validation.required') })
      .trim()
      .min(limits.DEFAULT_MIN_LENGTH, { message: t('validation.min_length') })
      .max(limits.DEFAULT_MAX_LENGTH, {
        message: t('validation.max_length'),
      })
      .regex(REGEX_PATTERNS.isPersianText, {
        message: t('validation.persian_name_error'),
      }),

    organizationNumber: z
      .string({ required_error: t('validation.required'), invalid_type_error: t('validation.required') })
      .trim()
      .min(limits.ORGANIZATION_NUMBER, { message: t('validation.min_length') })
      .max(limits.ORGANIZATION_NUMBER, {
        message: t('validation.max_length'),
      })
      .regex(REGEX_PATTERNS.onlyDigit, {
        message: t('validation.organization_number_error'),
      }),

    organizationNationalIdNumber: z
      .string({ required_error: t('validation.required'), invalid_type_error: t('validation.required') })
      .trim()
      .min(limits.ORGANIZATION_NATIONAL_ID_NUMBER, {
        message: t('validation.min_len', { val: organizationNationalIdNumber }),
      })
      .max(limits.ORGANIZATION_NATIONAL_ID_NUMBER, {
        message: t('validation.max_length'),
      })
      .regex(REGEX_PATTERNS.onlyDigit, {
        message: t('validation.english_name_error'),
      })
      .refine((value) => value !== '', { message: t('validation.required') }),

    organizationEconomyCodeNumber: z
      .string({ required_error: t('validation.required'), invalid_type_error: t('validation.required') })
      .trim()
      .min(limits.ORGANIZATION_ECONOMY_CODE_NUMBER, {
        message: t('validation.min_len', { val: organizationEconomyCodedNumber }),
      })
      .max(limits.ORGANIZATION_ECONOMY_CODE_NUMBER, {
        message: t('validation.max_length'),
      })
      .regex(REGEX_PATTERNS.onlyDigit, {
        message: t('validation.english_name_error'),
      })
      .refine((value) => value !== '', { message: t('validation.required') }),

    version: z
      .string({ required_error: t('validation.required'), invalid_type_error: t('validation.required') })
      .trim()
      .max(limits.VERSION_MAX, {
        message: t('validation.max_length'),
      })
      .regex(REGEX_PATTERNS.positiveNumber, {
        message: t('validation.only_digit_message'),
      }),

    postalCode: z
      .string({ required_error: t('validation.required'), invalid_type_error: t('validation.required') })
      .trim()
      .min(limits.POSTAL_CODE_NUMBER, {
        message: t('validation.min_len', { val: postalCodedNumber }),
      })
      .max(limits.POSTAL_CODE_NUMBER, {
        message: t('validation.max_length'),
      })
      .regex(REGEX_PATTERNS.onlyDigit, {
        message: t('validation.english_name_error'),
      }),

    defaultEnglishName: z // "-", "_‌", ".", numbers, only english alphabet
      .string({ required_error: t('validation.required') })
      .trim()
      .min(limits.DEFAULT_MIN_LENGTH, { message: t('validation.min_length') })
      .max(limits.DEFAULT_MAX_LENGTH, {
        message: t('validation.max_length'),
      })
      .regex(REGEX_PATTERNS.defaultEnglishName, t('validation.english_name_error')),

    defaultPersianName: z // "-", "_‌", ".", numbers, english and persian alphabet
      .string({ required_error: t('validation.required') })
      .trim()
      .min(limits.DEFAULT_MIN_LENGTH, { message: t('validation.min_length') })
      .max(limits.DEFAULT_MAX_LENGTH, {
        message: t('validation.max_length'),
      })
      .regex(REGEX_PATTERNS.defaultPersianName, t('validation.persian_name_error'))
      .refine((value) => value !== '', { message: t('validation.required') }),

    url: z
      .string({ required_error: t('validation.required'), invalid_type_error: t('validation.required') })
      .trim()
      .min(limits.DEFAULT_MIN_LENGTH, { message: t('validation.min_length') })
      .max(limits.DEFAULT_MAX_LENGTH, {
        message: t('validation.max_length'),
      })
      .regex(REGEX_PATTERNS.url, {
        message: t('validation.url_error'),
      })
      .refine((value) => value !== '', { message: t('validation.required') }),

    optionalProtocolUrl: z //optional Protocol Url
      .string({ required_error: t('validation.required') })
      .trim()
      .min(limits.DEFAULT_MIN_LENGTH, { message: t('validation.min_length') })
      .max(limits.DEFAULT_MAX_LENGTH, {
        message: t('validation.max_length'),
      })
      .regex(REGEX_PATTERNS.optionalProtocolUrl, t('validation.url_error'))
      .refine((value) => value !== '', { message: t('validation.required') }),

    boolean: z.boolean({ required_error: t('validation.required') }),

    nationalCode: z
      .string({ required_error: t('validation.required') })
      .trim()
      .min(limits.DEFAULT_MIN_LENGTH, { message: t('validation.min_length') })
      .max(limits.DEFAULT_MAX_LENGTH, {
        message: t('validation.max_length'),
      })
      .regex(REGEX_PATTERNS.nationalCode, t('validation.national_code_error')),

    phoneNumber: z
      .string({ required_error: 'validation.required' })
      .trim()
      .min(limits.PHONE_NUMBER, { message: t('validation.min_length') })
      .max(limits.PHONE_NUMBER, {
        message: t('validation.max_length'),
      })
      .regex(REGEX_PATTERNS.phoneNumber, { message: t('validation.phone_error') }),

    email: z
      .string({ required_error: t('validation.required') })
      .trim()
      .min(limits.DEFAULT_MIN_LENGTH, { message: t('validation.min_length') })
      .max(limits.DEFAULT_MAX_LENGTH, {
        message: t('validation.max_length'),
      })
      .regex(REGEX_PATTERNS.email, t('validation.email_error')),

    positiveNumber: z
      .string({ required_error: t('validation.required') })
      .trim()
      .min(1, t('validation.min_length'))
      .max(limits.UPSTREAM_MAX_LENGTH, t('validation.max_len', { val: limits.UPSTREAM_MAX_LENGTH }))
      .regex(REGEX_PATTERNS.positiveNumber, t('validation.field_error')),

    tagsList: z
      .array(z.object({ key: z.number(), value: z.number(), label: z.string() }), {
        message: t('validation.choose_at_least_one_option'),
      })
      .min(1, { message: t('validation.choose_at_least_one_option') }),

    codeTitle: z
      .array(
        z.object({
          code: z.number(),
          title: z
            .string({
              required_error: t('validation.required'),
              invalid_type_error: t('validation.required'),
            })
            .trim()
            .min(limits.DEFAULT_MIN_LENGTH, { message: t('validation.required') })
            .max(limits.DEFAULT_MAX_LENGTH, { message: t('validation.max_length') }),
        }),
        {
          message: t('validation.choose_at_least_one_option'),
        }
      )
      .min(1, { message: t('validation.choose_at_least_one_option') }),

    path: z // "-", "_‌", ".", numbers, only english alphabet and starts with '/'
      .string({ required_error: t('validation.required') })
      .trim()
      .min(1, t('validation.min_length'))
      .max(limits.UPSTREAM_MAX_LENGTH, t('validation.max_len', { val: limits.UPSTREAM_MAX_LENGTH }))
      .regex(REGEX_PATTERNS.path, t('validation.url_error')),

    host: z // domain address without protocol or ip address
      .string({ required_error: t('validation.required') })
      .trim()
      .min(1, t('validation.min_length'))
      .max(limits.UPSTREAM_MAX_LENGTH, t('validation.max_len', { val: limits.UPSTREAM_MAX_LENGTH }))
      .regex(REGEX_PATTERNS.host, t('validation.url_error')),

    domain: z // domain address
      .string({ required_error: t('validation.required') })
      .trim()
      .min(1, t('validation.min_length'))
      .max(limits.DEFAULT_MAX_LENGTH, t('validation.max_len', { val: limits.DEFAULT_MAX_LENGTH }))
      .regex(REGEX_PATTERNS.domain, t('validation.url_error')),

    tel: z
      .string({ required_error: t('validation.required') })
      .trim()
      .min(1, t('validation.min_length'))
      .max(limits.UPSTREAM_MAX_LENGTH, t('validation.max_len', { val: limits.UPSTREAM_MAX_LENGTH }))
      .regex(REGEX_PATTERNS.tel, t('validation.tel_error')),

    description: z
      .string({ required_error: t('validation.phone_error') })
      .trim()
      .min(1, t('validation.min_length'))
      .max(limits.UPSTREAM_MAX_LENGTH, t('validation.max_len', { val: limits.UPSTREAM_MAX_LENGTH }))
      .regex(REGEX_PATTERNS.description, t('validation.field_error')),

    optionalDescription: z
      .string()
      .trim()
      .max(limits.CONFIRM_REASON_MAX_LENGTH, t('validation.max_len', { val: limits.CONFIRM_REASON_MAX_LENGTH }))
      .regex(REGEX_PATTERNS.defaultPersianName, t('validation.field_error')),

    upstreamServerWeight: z
      .string({ required_error: t('validation.required') })
      .trim()
      .min(1, t('validation.min_length'))
      .max(
        limits.UPSTREAM_SERVER_WEIGHT_MAX_LENGTH,
        t('validation.max_len', { val: limits.UPSTREAM_SERVER_WEIGHT_MAX_LENGTH })
      )
      .regex(REGEX_PATTERNS.upstreamServerWeight, t('validation.field_error'))
      .refine((value) => value !== '', { message: t('validation.required') }),

    upstreamServerDomain: z
      .string({ required_error: t('validation.required') })
      .trim()
      .min(limits.DEFAULT_MIN_LENGTH, t('validation.min_length'))
      .max(limits.UPSTREAM_MAX_LENGTH, t('validation.max_len', { val: limits.UPSTREAM_MAX_LENGTH }))
      .regex(REGEX_PATTERNS.ipOrDomainAddress, t('validation.host_domain_error'))
      .refine((value) => value !== '', { message: t('validation.required') }),

    statusCode: z
      .string({ required_error: t('validation.required') })
      .refine((value) => +value >= 300 && +value <= 599, {
        message: t('validation.status_code'),
      }),
  };

  return validationSchema;
};
