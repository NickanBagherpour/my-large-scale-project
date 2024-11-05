import { z } from 'zod';
import { FORM_ITEM_NAMES } from '../utils/consts';
import { TFunction } from 'i18next';

export const createGetInfoSchema = (t: TFunction) =>
  z.object({
    [FORM_ITEM_NAMES.englishName]: z
      .string({ required_error: t('error.required') })
      .min(1, { message: t('error.required') })
      .regex(/^[a-zA-Z]*$/, {
        message: t('english_name_error'),
      }),
    [FORM_ITEM_NAMES.persianName]: z
      .string({ required_error: t('validation.required') })
      .min(1, { message: t('error.required') })
      .regex(/^[\u0600-\u06FF]*$/, {
        message: t('persian_name_error'),
      }),
    [FORM_ITEM_NAMES.actionOrMethod]: z.string({ required_error: t('validation.required') }),
    [FORM_ITEM_NAMES.protocole]: z.string().optional().refine((val) => val, t('validation.choose_one_option')),
    [FORM_ITEM_NAMES.access]: z
      .string()
      .optional()
      .refine((val) => val, t('validation.choose_one_option')),
    [FORM_ITEM_NAMES.category]: z
      .string()
      .optional()
      .refine((val) => val, t('validation.choose_one_option')),
    [FORM_ITEM_NAMES.throughout]: z
      .string()
      .optional()
      .refine((val) => val, t('validation.choose_one_option')),
    [FORM_ITEM_NAMES.version]: z.string({ required_error: t('validation.required') }),
    [FORM_ITEM_NAMES.owner]: z.string({ required_error: t('validation.required') }),
    [FORM_ITEM_NAMES.tag]: z
      .string()
      .optional()
      .refine((val) => val, t('validation.choose_one_option')),
    [FORM_ITEM_NAMES.path]: z.string({ required_error: t('validation.required') }),
    [FORM_ITEM_NAMES.host]: z.string({ required_error: t('validation.required') }),
    [FORM_ITEM_NAMES.upstream]: z
      .string()
      .optional()
      .refine((val) => val, t('validation.choose_one_option')),
  });

export type GetInfoValues = z.infer<ReturnType<typeof createGetInfoSchema>>;
