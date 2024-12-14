import { z } from 'zod';
import { FORM_ITEM_NAMES } from '../utils/consts';

const MAX_LENGTH = 30;

export const createFormSchema = (t: (key: string) => string) =>
  z.object({
    [FORM_ITEM_NAMES.enName]: z
      .string({ required_error: t('validation.required') })
      .trim()
      .min(1, { message: t('validation.required') })
      .max(MAX_LENGTH, { message: t('validation.max_length') })
      .regex(/^[^\u0600-\u06FF]*$/, {
        message: t('validation.english_name_error'),
      }),
    [FORM_ITEM_NAMES.faName]: z
      .string({ required_error: t('validation.required') })
      .trim()
      .min(1, { message: t('validation.required') })
      .max(MAX_LENGTH, { message: t('validation.max_length') })
      .regex(/^[^a-zA-Z]*$/, {
        message: t('validation.persian_name_error'),
      }),
    [FORM_ITEM_NAMES.method]: z
      .string({ required_error: t('validation.required') })
      .trim()
      .max(MAX_LENGTH, { message: t('validation.max_length') })
      .min(1, { message: t('validation.required') }),

    [FORM_ITEM_NAMES.protocol]: z
      .string()
      .nullable()
      .refine((val) => val, t('validation.choose_one_option')),
    // [FORM_ITEM_NAMES.access]: z.string({ required_error: t('error.required') }),
    [FORM_ITEM_NAMES.category]: z
      .string()
      .nullable()
      .refine((val) => val, t('validation.choose_one_option')),
    // [FORM_ITEM_NAMES.throughout]: z.string({ required_error: t('error.required') }),
    [FORM_ITEM_NAMES.version]: z
      .string({ required_error: t('validation.required') })
      .trim()
      .max(MAX_LENGTH, { message: t('validation.max_length') })
      .min(1, { message: t('validation.required') }),
    [FORM_ITEM_NAMES.owner]: z
      .string({ required_error: t('validation.required') })
      .trim()
      .max(MAX_LENGTH, { message: t('validation.max_length') })
      .min(1, { message: t('validation.required') }),
    [FORM_ITEM_NAMES.tag]: z
      .string()
      .nullable()
      .refine((val) => val, t('validation.choose_one_option')),

    [FORM_ITEM_NAMES.path]: z
      .string({ required_error: t('validation.required') })
      .trim()
      .max(MAX_LENGTH, { message: t('validation.max_length') })
      .min(1, { message: t('validation.required') }),

    [FORM_ITEM_NAMES.host]: z
      .string({ required_error: t('validation.required') })
      .trim()
      .max(MAX_LENGTH, { message: t('validation.max_length') })
      .min(1, { message: t('validation.required') }),

    [FORM_ITEM_NAMES.upstream]: z
      .string()
      .nullable()
      .refine((val) => val, t('validation.choose_one_option')),
    // [FORM_ITEM_NAMES.owner]: z.boolean().optional(),
  });

export type FormFieldsType = z.infer<ReturnType<typeof createFormSchema>>;
