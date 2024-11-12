import { z } from 'zod';
import { FORM_ITEM } from '../utils/consts';

export const createFormSchema = (t: (key: string) => string) => {
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

  const urlString = z.string({ required_error: t('error.required') }).superRefine((value, ctx) => {
    // Check if the value is empty or only whitespace
    if (value.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t('error.required'),
      });
      return;
    }

    // Validate length
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

    try {
      new URL(value);
    } catch {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t('error.invalid_url'),
      });
    }
  });

  const optionalUrlString = z
    .string()
    .optional()
    .superRefine((value, ctx) => {
      if (value && value.trim().length > 0) {
        try {
          new URL(value);
        } catch {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t('error.invalid_url'),
          });
        }
      }
    });
  const optionalEmailString = z
    .string()
    .optional()
    .superRefine((value, ctx) => {
      if (value && value.trim().length > 0) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t('error.invalid_email'),
          });
        }
      }
    });

  // to do {handle z.number}
  const mobileNumber = z
    .string({ required_error: t('error.required') })
    .trim()
    .min(1, { message: t('error.required') });

  return z.object({
    // Name Fields
    [FORM_ITEM.latin_name_client]: requiredString.superRefine((value, ctx) => {
      if (value.trim() !== '' && !/^[A-Za-z\s]+$/.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t('error.english_only'),
        });
      }
    }),

    [FORM_ITEM.persian_name_client]: requiredString.superRefine((value, ctx) => {
      if (value.trim() !== '' && !/^[\u0600-\u06FF\s]+$/.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t('error.persian_only'),
        });
      }
    }),

    // Required Fields
    [FORM_ITEM.client_type]: requiredString,
    [FORM_ITEM.user_name]: requiredString,
    [FORM_ITEM.national_code]: requiredString,
    [FORM_ITEM.organization_name]: requiredString,
    [FORM_ITEM.client_id]: requiredString,
    [FORM_ITEM.identity_auth]: requiredString,

    //mobile number
    [FORM_ITEM.mobile_number]: mobileNumber,

    // optional URL Field
    [FORM_ITEM.input_address]: optionalUrlString,
    [FORM_ITEM.website_url]: optionalUrlString,

    //optional email validator
    [FORM_ITEM.email]: optionalEmailString,

    // URL Field
    [FORM_ITEM.return_address]: urlString,
  });
};

export type FormValues = z.infer<ReturnType<typeof createFormSchema>>;
