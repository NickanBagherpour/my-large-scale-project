import { z } from 'zod';
import { FORM_ITEM_NAMES } from '../utils/consts';
import { TFunction } from 'i18next';
import { REGEX_PATTERNS } from '@oxygen/utils';

const MAX_LENGTH = 200;

export const serviceNameSchema = (t: TFunction) =>
  z
    .string({ required_error: t('validation.required'), invalid_type_error: t('validation.required') })
    .trim()
    .min(1, { message: t('validation.required') })
    .max(MAX_LENGTH /* Some services have long names, so this value needs to be set high to accommodate them */, {
      message: t('validation.max_length'),
    })
    .regex(/^[^\u0600-\u06FF]*$/, {
      message: t('validation.english_name_error'),
    });

export const createEditServiceFormSchema = (t: TFunction) => {
  return z.object({
    [FORM_ITEM_NAMES.enName]: serviceNameSchema(t),
    [FORM_ITEM_NAMES.faName]: z
      .string({
        required_error: t('validation.required'),
        invalid_type_error: t('validation.required') /* if value is null */,
      })
      .trim()
      .min(1, { message: t('validation.required') })
      .regex(REGEX_PATTERNS.isPersianText, {
        message: t('validation.persian_validation_message'),
      })
      .max(MAX_LENGTH, { message: t('validation.max_length') }),
    // [FORM_ITEM_NAMES.method]: z
    //   .string({ required_error: t('validation.required') })
    //   .trim()
    //   .max(MAX_LENGTH, { message: t('validation.max_length') })
    //   .min(1, { message: t('validation.required') }),

    // [FORM_ITEM_NAMES.protocol]: z.number({ required_error: t('validation.choose_one_option') }),
    [FORM_ITEM_NAMES.access]: z.object({
      label: z.string(),
      value: z.number({ required_error: t('validation.choose_one_option') }),
      key: z.number(),
    }),
    [FORM_ITEM_NAMES.category]: z.number({ required_error: t('validation.choose_one_option') }),
    // [FORM_ITEM_NAMES.throughout]: z.string({ required_error: t('validation.required') }),
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
      .array(z.object({ key: z.number(), value: z.number(), label: z.string() }), {
        message: t('validation.choose_at_least_one_option'),
      })
      .min(1, { message: t('validation.choose_at_least_one_option') }),
  });
};
export type EditServiceFormFieldsType = z.infer<ReturnType<typeof createEditServiceFormSchema>>;
