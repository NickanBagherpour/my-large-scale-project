import { z } from 'zod';
import { FORM_ITEM } from '../utils/consts';

export const requestRegistrationFormSchema = (t: (key: string) => string) => {
  const requiredString = z.string({ required_error: t('validation.required') }).superRefine((value, ctx) => {
    if (value.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t('validation.required'),
      });
    }
    if (value.length < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        type: 'string',
        minimum: 1,
        inclusive: true,
        message: t('validation.required'),
      });
    }
  });

  const requiredJustString = z.string({ required_error: t('validation.required') }).superRefine((value, ctx) => {
    // Check for empty or whitespace-only strings
    if (value.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t('validation.required'),
      });
    }

    // Check for minimum length
    if (value.length < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        type: 'string',
        minimum: 1,
        inclusive: true,
        message: t('validation.required'),
      });
    }

    // Check if the string contains numbers
    if (/\d/.test(value)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t('error.no_numbers_allowed'), // Update to appropriate error message key
      });
    }
  });

  const datePickerString = z
    .preprocess((input) => {
      // Ensure we are dealing with a string
      // if (input instanceof Date) {
      if (input instanceof Object) {
        return input.toString(); // Convert Date object to ISO string
      }
      return input == null ? ' ' : input; // Return as is if it's already a string
    }, z.string({ required_error: t('validation.required') }))
    .superRefine((value, ctx) => {
      if (value.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t('validation.required'),
        });
      }
      if (value.length < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          type: 'string',
          minimum: 1,
          inclusive: true,
          message: t('validation.required'),
        });
      }
    });

  const urlString = z.string({ required_error: t('validation.required') }).superRefine((value, ctx) => {
    // Check if the value is empty or only whitespace
    if (value.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t('validation.required'),
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
        message: t('validation.required'),
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

  const mobileNumber = z
    .string({ required_error: t('validation.required') })
    .trim()
    .superRefine((value, ctx) => {
      if (value.length < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          type: 'string',
          minimum: 1,
          inclusive: true,
          message: t('validation.required'),
        });
        return;
      }

      if (value.length < 11) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          type: 'string',
          minimum: 11,
          inclusive: true,
          message: t('error.min_length'),
        });
      }
    });

  const postalCode = z
    .string({ required_error: t('validation.required') })
    .trim()
    .superRefine((value, ctx) => {
      if (value.length < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          type: 'string',
          minimum: 1,
          inclusive: true,
          message: t('validation.required'),
        });
        return;
      }

      if (value.length !== 10) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          type: 'string',
          minimum: 11,
          inclusive: true,
          message: t('error.ten_digits_needed'),
        });
      }
    });

  const economyCode = z
    .string({ required_error: t('validation.required') })
    .trim()
    .superRefine((value, ctx) => {
      if (value.length < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          type: 'string',
          minimum: 1,
          inclusive: true,
          message: t('validation.required'),
        });
        return;
      }

      if (value.length !== 12) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          type: 'string',
          minimum: 11,
          inclusive: true,
          message: t('error.twelve_digits_needed'),
        });
      }
    });

  const nationalId = z
    .string({ required_error: t('validation.required') })
    .trim()
    .superRefine((value, ctx) => {
      if (value.length < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          type: 'string',
          minimum: 1,
          inclusive: true,
          message: t('validation.required'),
        });
        return;
      }

      if (value.length !== 11) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          type: 'string',
          minimum: 11,
          inclusive: true,
          message: t('error.eleven_digits_needed'),
        });
      }
    });

  const legal_person_name = z
    .string({ required_error: t('validation.required') })
    .trim()
    .superRefine((value, ctx) => {
      if (value.length < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          type: 'string',
          minimum: 1,
          inclusive: true,
          message: t('validation.required'),
        });
        return;
      }

      if (value.trim() !== '' && !/^[\u0600-\u06FF\s]+$/.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t('error.persian_only'),
        });
      }

      if (value.length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          type: 'string',
          minimum: 3,
          inclusive: true,
          message: t('error.three_characters_needed'),
        });
      }
    });

  const phoneNumber = z
    .string({ required_error: t('validation.required') })
    .trim()
    .superRefine((value, ctx) => {
      if (value.length < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          type: 'string',
          minimum: 1,
          inclusive: true,
          message: t('validation.required'),
        });
        return;
      }

      if (value.length < 7) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          type: 'string',
          minimum: 7,
          inclusive: true,
          message: t('error.seven_digits_needed'),
        });
      }
    });

  const lastRegistrationAddress = z
    .string({ required_error: t('validation.required') })
    .trim()
    .superRefine((value, ctx) => {
      if (value.length < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          type: 'string',
          minimum: 1,
          inclusive: true,
          message: t('validation.required'),
        });
        return;
      }

      if (value.trim() !== '' && !/^[\u0600-\u06FF0-9\-_.s]+$/.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t('error.persian_only'),
        });
      }
    });

  return z.object({
    [FORM_ITEM.persian_name]: requiredString.superRefine((value, ctx) => {
      if (value.trim() !== '' && !/^[\u0600-\u06FF\s]+$/.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t('error.persian_only'),
        });
      }
      if (value.length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          type: 'string',
          minimum: 3,
          inclusive: true,
          message: t('error.three_characters_needed'),
        });
      }
    }),
    [FORM_ITEM.technical_persian_name]: requiredString.superRefine((value, ctx) => {
      if (value.trim() !== '' && !/^[\u0600-\u06FF\s]+$/.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t('error.persian_only'),
        });
      }
      if (value.length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          type: 'string',
          minimum: 3,
          inclusive: true,
          message: t('error.three_characters_needed'),
        });
      }
    }),

    // Required Fields
    [FORM_ITEM.aggregator_status]: requiredString,
    [FORM_ITEM.aggregator_value]: requiredString,
    [FORM_ITEM.legal_person_name]: legal_person_name,
    [FORM_ITEM.legal_person_type]: requiredString,
    [FORM_ITEM.registration_number]: requiredString,
    [FORM_ITEM.registration_date]: datePickerString,
    [FORM_ITEM.national_id]: nationalId,
    [FORM_ITEM.economy_code]: economyCode,
    [FORM_ITEM.activity_field]: requiredString,
    [FORM_ITEM.postal_code]: postalCode,
    [FORM_ITEM.phone]: phoneNumber,
    [FORM_ITEM.last_registration_address]: lastRegistrationAddress,

    //mobile number
    [FORM_ITEM.mobile_number]: mobileNumber,
    [FORM_ITEM.phone_number]: phoneNumber,
    [FORM_ITEM.technical_mobile_number]: mobileNumber,
    [FORM_ITEM.technical_Phone_number]: phoneNumber,

    // optional URL Field
    // [FORM_ITEM.input_address]: optionalUrlString,
    // [FORM_ITEM.website_url]: optionalUrlString,

    //optional email validator
    [FORM_ITEM.email]: optionalEmailString,

    // URL Field
    // [FORM_ITEM.return_address]: urlString,
  });
};

export type FormValues = z.infer<ReturnType<typeof requestRegistrationFormSchema>>;
