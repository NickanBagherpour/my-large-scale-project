import z from 'zod';
import { TFunction } from 'i18next';
import { createValidationSchema } from '@oxygen/utils';
import { SPECIAL_TARIFF_NAMES, TIERED_TARIFF_NAMES } from '../utils/consts';

export const tieredTariff = (t: TFunction) => {
  const validationSchema = createValidationSchema(t);

  return z.object({
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
  });
};

export type SpecialTariffType = z.infer<ReturnType<typeof tieredTariff>>;

export const specialTariff = (t: TFunction) => {
  const validationSchema = createValidationSchema(t);

  return z
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
    .min(1, { message: t('validation.required') });
};

export type TieredTariffType = z.infer<ReturnType<typeof specialTariff>>;
