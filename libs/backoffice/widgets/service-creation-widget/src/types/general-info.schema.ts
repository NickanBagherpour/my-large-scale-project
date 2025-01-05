import z from 'zod';
import { SERVICE_NAMES } from '../utils/consts';
import { TFunction } from 'i18next';

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

export const createGeneralInfoSchema = (t: TFunction) =>
  z.object({
    [SERVICE_NAMES.englishName]: serviceNameSchema(t),

    [SERVICE_NAMES.persianName]: z
      .string({
        required_error: t('validation.required'),
        invalid_type_error: t('validation.required') /* if value is null */,
      })
      .trim()
      .min(1, { message: t('validation.required') })
      .max(MAX_LENGTH, { message: t('validation.max_length') }),

    [SERVICE_NAMES.access]: z.number({ required_error: t('validation.choose_one_option') }),

    [SERVICE_NAMES.category]: z.number({ required_error: t('validation.choose_one_option') }),

    [SERVICE_NAMES.throughput]: z.number({ required_error: t('validation.choose_one_option') }),

    [SERVICE_NAMES.version]: z
      .string({ required_error: t('validation.required'), invalid_type_error: t('validation.required') })
      .trim()
      .max(MAX_LENGTH, { message: t('validation.max_length') })
      .min(1, { message: t('validation.required') }),

    [SERVICE_NAMES.owner]: z
      .string({ required_error: t('validation.required'), invalid_type_error: t('validation.required') })
      .trim()
      .max(MAX_LENGTH, { message: t('validation.max_length') })
      .min(1, { message: t('validation.required') }),

    [SERVICE_NAMES.tags]: z
      .array(z.object({ key: z.number(), value: z.number(), label: z.string() }), {
        message: t('validation.choose_at_least_one_option'),
      })
      .min(1, { message: t('validation.choose_at_least_one_option') }),
  });

export type GeneralInfoValuesType = z.infer<ReturnType<typeof createGeneralInfoSchema>>;
