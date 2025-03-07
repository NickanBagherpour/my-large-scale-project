import z from 'zod';
import { TFunction } from 'i18next';
import { createValidationSchema } from '@oxygen/utils';
import { TIERED_TARIFF_NAMES, SPECIAL_TARIFF_NAMES } from '../utils/consts';

// TODO: ADD CREATE THE NAME OF THIS FUNCTION
export const tieredTariff = (t: TFunction) => {
  const validationSchema = createValidationSchema(t);

  return z.object({
    tiered: z
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
  });
};

export type SpecialTariffFormType = z.infer<ReturnType<typeof tieredTariff>>;

// TODO: ADD CREATE THE NAME OF THIS FUNCTION
export const specialTariff = (t: TFunction) => {
  const validationSchema = createValidationSchema(t);
  return z.object({
    special: z
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
  });
};

export type TieredTariffFormType = z.infer<ReturnType<typeof specialTariff>>;
