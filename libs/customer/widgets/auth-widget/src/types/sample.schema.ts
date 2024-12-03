import { z } from 'zod';
import { FORM_ITEM_NAMES } from '../utils/form-items-name';
import { MOBILENUMBER_MAX_LENGTH } from '../utils/consts';

export const authFormSchema = (t: (key: string, args?: any) => string) => {
  const requiredString = z.string({ required_error: t('error.required') }).superRefine((value, ctx) => {
    if (value.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t('error.required'),
      });
    }
    if (value.length < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        type: 'string',
        minimum: 1,
        inclusive: true,
        message: t('error.required'),
      });
    }
  });
  const mobileNumber = z
    .string({ required_error: t('error.required') })
    .trim()
    .superRefine((value, ctx) => {
      if (value.length < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          type: 'string',
          minimum: 1,
          inclusive: true,
          message: t('error.required'),
        });
        return;
      }

      if (value.length < MOBILENUMBER_MAX_LENGTH) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          type: 'string',
          minimum: MOBILENUMBER_MAX_LENGTH,
          inclusive: true,
          message: t('error.min_length_mobile_number', { MOBILENUMBER_MAX_LENGTH }),
        });
      }
    });

  // const digitOnlyString = z.string({ required_error: t('error.required') }).superRefine((value, ctx) => {
  //   if (value.trim().length === 0) {
  //     ctx.addIssue({
  //       code: z.ZodIssueCode.custom,
  //       message: t('error.required'),
  //     });
  //     return;
  //   }
  //   if (!REGEX_PATTERNS.onlyDigit.test(value)) {
  //     ctx.addIssue({
  //       code: z.ZodIssueCode.custom,
  //       message: t('error.only_digit_message'),
  //     });
  //   }
  // });

  return z.object({
    [FORM_ITEM_NAMES.national_code]: requiredString,
    [FORM_ITEM_NAMES.mobile_number]: mobileNumber,
    [FORM_ITEM_NAMES.otp]: requiredString,
    [FORM_ITEM_NAMES.captcha_code]: requiredString,
  });
};

export type FormFieldsType = z.infer<ReturnType<typeof authFormSchema>>;
