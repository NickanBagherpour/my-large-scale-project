import z from 'zod';
import { createValidationSchema } from '@oxygen/utils';
import { TFunction } from 'i18next';
import { GENERAL_INFO_NAMES } from '../utils';
import { TARIFF, SPECIAL_TARIFF_NAMES, TIERED_TARIFF_NAMES } from '@oxygen/reusable-components';

// TODO: SHARE THE TYPES IN THIS
export const createAppSchema = (t: TFunction) => {
  const validationSchema = createValidationSchema(t);

  return z.object({
    [GENERAL_INFO_NAMES.serviceName]: validationSchema.english,
    [GENERAL_INFO_NAMES.bankingSharePct]: validationSchema.positiveNumber,
    [GENERAL_INFO_NAMES.opsTeamSharePct]: validationSchema.positiveNumber,

    [GENERAL_INFO_NAMES.serviceType]: validationSchema.idSelection,
    [GENERAL_INFO_NAMES.fieldNameInElastic]: validationSchema.required,
    [GENERAL_INFO_NAMES.transactionTypeInElastic]: validationSchema.required,

    [TARIFF.type]: validationSchema.required,

    [TARIFF.fixed]: z.number({
      required_error: t('validation.required'),
      invalid_type_error: t('validation.only_digit_message'),
    }),

    [TARIFF.special]: z
      .array(
        z.object(
          {
            [SPECIAL_TARIFF_NAMES.from]: z.number({
              required_error: t('validation.required'),
              invalid_type_error: t('validation.only_digit_message'),
            }),
            [SPECIAL_TARIFF_NAMES.to]: z.number({
              required_error: t('validation.required'),
              invalid_type_error: t('validation.only_digit_message'),
            }),
            [SPECIAL_TARIFF_NAMES.minimum]: z.number({
              required_error: t('validation.required'),
              invalid_type_error: t('validation.only_digit_message'),
            }),
            [SPECIAL_TARIFF_NAMES.maximum]: z.number({
              required_error: t('validation.required'),
              invalid_type_error: t('validation.only_digit_message'),
            }),
            [SPECIAL_TARIFF_NAMES.percent]: validationSchema.required,
          },
          { message: t('validation.required') }
        )
      )
      .min(1, { message: t('validation.required') }),

    [TARIFF.tiered]: z
      .array(
        z.object(
          {
            [TIERED_TARIFF_NAMES.from]: validationSchema.required,
            [TIERED_TARIFF_NAMES.to]: validationSchema.required,
            [TIERED_TARIFF_NAMES.tariff]: z.number({
              required_error: t('validation.required'),
              invalid_type_error: t('validation.only_digit_message'),
            }),
          },
          { message: t('validation.required') }
        )
      )
      .min(1, { message: t('validation.required') }),
  });
};

export type AppSchemaType = z.infer<ReturnType<typeof createAppSchema>>;
