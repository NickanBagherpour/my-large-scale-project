import z from 'zod';
import { FORM_ITEM_NAMES } from '../utils/consts';
import { TFunction } from 'i18next';

const MAX_LENGTH = 30;

export const createGeneralInfoSchema = (t: TFunction) =>
  z.object({
    [FORM_ITEM_NAMES.englishName]: z
      .string({ required_error: t('validation.required') })
      .trim()
      .min(1, { message: t('validation.required') })
      .max(MAX_LENGTH, { message: t('validation.max_length') })
      .regex(/^[^\u0600-\u06FF]*$/, {
        message: t('validation.english_name_error'),
      }),

    [FORM_ITEM_NAMES.persianName]: z
      .string({ required_error: t('validation.required') })
      .trim()
      .min(1, { message: t('validation.required') })
      .max(MAX_LENGTH, { message: t('validation.max_length') })
      .regex(/^[^a-zA-Z]*$/, {
        message: t('validation.persian_name_error'),
      }),

    [FORM_ITEM_NAMES.access]: z
      .string()
      .nullable()
      .refine((val) => val, t('validation.choose_one_option')),

    [FORM_ITEM_NAMES.category]: z
      .string()
      .nullable()
      .refine((val) => val, t('validation.choose_one_option')),

    [FORM_ITEM_NAMES.throughout]: z
      .string()
      .nullable()
      .refine((val) => val, t('validation.choose_one_option')),

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

    [FORM_ITEM_NAMES.tags]: z
      .object({ id: z.number(), title: z.string() })
      .array()
      .nullable()
      .refine((val) => val, t('validation.choose_one_option')),
  });

export type GeneralInfoValuesType = z.infer<ReturnType<typeof createGeneralInfoSchema>>;
