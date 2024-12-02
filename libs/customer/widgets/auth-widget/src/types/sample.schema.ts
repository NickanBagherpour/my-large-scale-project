import { z } from 'zod';
import { FORM_ITEM_NAMES } from '../utils/form-items-name';
import { REGEX_PATTERNS } from '@oxygen/utils';

export const sampleSchema = z
  .object({
    name: z.string().max(25, 'validation.max_length').nullable(),
    code: z.string().max(25, 'validation.max_length').nullable(),
    branchCode: z.string().max(6, 'validation.max_length').nullable(),
  })
  .partial();

export type FormFieldsType = z.infer<typeof sampleSchema>;

export const RegisterFormSchema = (t: (key: string) => string) =>
  // const mobileNumber = z
  //   .string({ required_error: t('error.required') })
  //   .trim()
  //   .superRefine((value, ctx) => {
  //     if (value.length < 1) {
  //       ctx.addIssue({
  //         code: z.ZodIssueCode.too_small,
  //         type: 'string',
  //         minimum: 1,
  //         inclusive: true,
  //         message: t('error.required'),
  //       });
  //       return;
  //     }

  //     if (value.length < 11) {
  //       ctx.addIssue({
  //         code: z.ZodIssueCode.too_small,
  //         type: 'string',
  //         minimum: 11,
  //         inclusive: true,
  //         message: t('min_length_11'),
  //       });
  //     }
  //   });
  // return
  z.object({
    [FORM_ITEM_NAMES.national_code]: z
      .string({ required_error: t('error.required') })
      .min(1, { message: t('error.required') })
      .regex(REGEX_PATTERNS.onlyDigit, {
        message: t('error.only_digit_message'),
      }),
    [FORM_ITEM_NAMES.mobile_number]: z
      .string({ required_error: t('error.required') })
      .min(1, { message: t('error.required') })
      .regex(REGEX_PATTERNS.onlyDigit, {
        message: t('error.only_digit_message'),
      }),
    [FORM_ITEM_NAMES.national_id]: z
      .string({ required_error: t('error.required') })
      .min(1, { message: t('error.required') })
      .regex(REGEX_PATTERNS.onlyDigit, {
        message: t('error.only_digit_message'),
      }),
    [FORM_ITEM_NAMES.otp]: z.string({ required_error: t('error.required') }).min(1, { message: t('error.required') }),
    [FORM_ITEM_NAMES.captcha_code]: z
      .string({ required_error: t('error.required') })
      .min(1, { message: t('error.required') }),
  });
