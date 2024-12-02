import { z } from 'zod';
import { FORM_ITEM_NAMES } from '../utils/form-items-name';
import { REGEX_PATTERNS } from '@oxygen/utils';

export const authFormSchema = (t: (key: string) => string) => {
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

  const digitOnlyString = z.string({ required_error: t('error.required') }).superRefine((value, ctx) => {
    if (value.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t('error.required'),
      });
      return;
    }
    if (!REGEX_PATTERNS.onlyDigit.test(value)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t('error.only_digit_message'),
      });
    }
  });

  return z.object({
    [FORM_ITEM_NAMES.national_code]: digitOnlyString,
    [FORM_ITEM_NAMES.mobile_number]: digitOnlyString,
    [FORM_ITEM_NAMES.national_id]: digitOnlyString,
    [FORM_ITEM_NAMES.otp]: requiredString,
    [FORM_ITEM_NAMES.captcha_code]: requiredString,
  });
};

export type FormFieldsType = z.infer<ReturnType<typeof authFormSchema>>;
