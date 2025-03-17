import z from 'zod';
import { createValidationSchema } from '@oxygen/utils';
import { TFunction } from 'i18next';
import { GENERAL_INFO_NAMES } from '../utils';
import { TARIFF, SPECIAL_TARIFF_NAMES, TIERED_TARIFF_NAMES } from '@oxygen/reusable-components';

export const createAppSchema = (t: TFunction) => {
  const validationSchema = createValidationSchema(t);

  const limit = 19;
  const num = validationSchema.englishOrPersianPositiveNumber.max(limit, {
    message: t('validation.max_len', { val: limit }),
  });

  return z.object({
    [GENERAL_INFO_NAMES.serviceName]: validationSchema.english,
    [GENERAL_INFO_NAMES.persianServiceName]: validationSchema.required,
    [GENERAL_INFO_NAMES.bankingSharePct]: num,
    [GENERAL_INFO_NAMES.opsTeamSharePct]: num,

    [GENERAL_INFO_NAMES.serviceType]: validationSchema.idSelection,
    [GENERAL_INFO_NAMES.fieldNameInElastic]: validationSchema.required,
    [GENERAL_INFO_NAMES.transactionTypeInElastic]: validationSchema.required,
    [GENERAL_INFO_NAMES.transferTypeParamElastic]: validationSchema.required,

    [TARIFF.type]: validationSchema.required,

    [TARIFF.fixed]: validationSchema.money,

    [TARIFF.special]: z
      .array(
        z.object(
          {
            [SPECIAL_TARIFF_NAMES.from]: validationSchema.money,
            [SPECIAL_TARIFF_NAMES.to]: validationSchema.money,
            [SPECIAL_TARIFF_NAMES.minimum]: validationSchema.money,
            [SPECIAL_TARIFF_NAMES.maximum]: validationSchema.money,
            [SPECIAL_TARIFF_NAMES.percent]: validationSchema.percent,
          },
          { message: t('validation.required') }
        )
      )
      .min(1, { message: t('validation.required') }),

    [TARIFF.tiered]: z
      .array(
        z.object(
          {
            [TIERED_TARIFF_NAMES.from]: validationSchema.count,
            [TIERED_TARIFF_NAMES.to]: validationSchema.count,
            [TIERED_TARIFF_NAMES.tariff]: validationSchema.money,
          },
          { message: t('validation.required') }
        )
      )
      .min(1, { message: t('validation.required') }),
  });
};

export type AppSchemaType = z.infer<ReturnType<typeof createAppSchema>>;
