import z from 'zod';
import { createValidationSchema } from '@oxygen/utils';
import { TFunction } from 'i18next';
import { GENERAL_INFO_NAMES, SPECIAL_TARIFF_NAMES, TIERED_TARIFF_NAMES } from '../utils';

export const appSchema = (t: TFunction) => {
  const validationSchema = createValidationSchema(t);
  return z.object({
    [GENERAL_INFO_NAMES.serviceName]: validationSchema.english,
    [GENERAL_INFO_NAMES.bankingSharePct]: validationSchema.required,
    [GENERAL_INFO_NAMES.opsTeamSharePct]: validationSchema.required,

    tariff: z.union([
      z.object({
        tiered: z
          .array(
            z.object(
              {
                [SPECIAL_TARIFF_NAMES.from]: validationSchema.required,
                [SPECIAL_TARIFF_NAMES.to]: validationSchema.required,
                [SPECIAL_TARIFF_NAMES.tariff]: validationSchema.required,
              },
              { message: t('validation.required') }
            )
          )
          .min(1, { message: t('validation.required') }),
      }),

      z.object({
        special: z
          .array(
            z.object(
              {
                [TIERED_TARIFF_NAMES.from]: validationSchema.required,
                [TIERED_TARIFF_NAMES.to]: validationSchema.required,
                [TIERED_TARIFF_NAMES.minimum]: validationSchema.required,
                [TIERED_TARIFF_NAMES.maximum]: validationSchema.required,
              },
              { message: t('validation.required') }
            )
          )
          .min(1, { message: t('validation.required') }),
      }),
    ]),
  });
};
