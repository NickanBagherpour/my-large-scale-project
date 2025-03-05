import z from 'zod';
import { createValidationSchema } from '@oxygen/utils';
import { TFunction } from 'i18next';
import { GENERAL_INFO_NAMES, TIERED_TARIFF_NAMES, SPECIAL_TARIFF_NAMES, tariff } from '../utils';

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

    [tariff.serviceTariff]: z.discriminatedUnion(tariff.tariff, [
      z.object({
        [tariff.tariff]: z.literal('fixed'),
        [tariff.fixed]: z.object({
          [tariff.tariffPrice]: validationSchema.required,
        }),
      }),

      z.object({
        [tariff.tariff]: z.literal('special'),
        [tariff.special]: z
          .array(
            z.object(
              {
                [SPECIAL_TARIFF_NAMES.from]: validationSchema.required,
                [SPECIAL_TARIFF_NAMES.to]: validationSchema.required,
                [SPECIAL_TARIFF_NAMES.minimum]: validationSchema.required,
                [SPECIAL_TARIFF_NAMES.maximum]: validationSchema.required,
              },
              { message: t('validation.required') }
            )
          )
          .min(1, { message: t('validation.required') }),
      }),

      z.object({
        [tariff.tariff]: z.literal('tiered', { required_error: t('validation.required') }),
        [tariff.tiered]: z
          .array(
            z.object(
              {
                [TIERED_TARIFF_NAMES.from]: validationSchema.required,
                [TIERED_TARIFF_NAMES.to]: validationSchema.required,
                [TIERED_TARIFF_NAMES.tariff]: validationSchema.required,
              },
              { message: t('validation.required') }
            )
          )
          .min(1, { message: t('validation.required') }),
      }),
    ]),
  });
};

export type AppSchemaType = z.infer<ReturnType<typeof createAppSchema>>;
