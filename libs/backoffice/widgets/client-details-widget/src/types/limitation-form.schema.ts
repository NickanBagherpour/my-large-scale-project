import { TFunction } from 'i18next';
import z from 'zod';
import { LIMITAION_FORM_NAME } from '../utils/const';

const MAX_LENGTH = 30;

export const limitationsSchema = (t: TFunction) =>
  z.object({
    [LIMITAION_FORM_NAME.serviceCallRate]: z
      .string({ required_error: t('validation.required') })
      .min(1, t('validation.min_length'))
      .max(MAX_LENGTH, t('validation.max_length')),

    [LIMITAION_FORM_NAME.serviceCallRateOptions]: z
      .string({ required_error: t('validation.required') })
      .nullable()
      .refine((val) => val, t('validation.choose_one_option')),

    [LIMITAION_FORM_NAME.totalCallLimit]: z
      .string({ required_error: t('validation.required') })
      .min(1, t('validation.min_length'))
      .max(MAX_LENGTH, t('validation.max_length')),

    [LIMITAION_FORM_NAME.callLimitOptions]: z
      .string({ required_error: t('validation.required') })
      .nullable()
      .refine((val) => val, t('validation.choose_one_option')),
  });

export type LimitationsType = z.infer<ReturnType<typeof limitationsSchema>>;
