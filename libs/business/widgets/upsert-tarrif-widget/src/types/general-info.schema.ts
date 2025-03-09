import z from 'zod';
import { GENERAL_INFO_NAMES } from '../utils';
import { TFunction } from 'i18next';
import { createValidationSchema } from '@oxygen/utils';

export const createGeneralInfoSchema = (t: TFunction) => {
  const validationSchema = createValidationSchema(t);
  return z.object({
    [GENERAL_INFO_NAMES.serviceName]: validationSchema.english,
    [GENERAL_INFO_NAMES.bankingSharePct]: validationSchema.required,
    [GENERAL_INFO_NAMES.opsTeamSharePct]: validationSchema.required,
  });
};

export type GeneralInfoValuesType = z.infer<ReturnType<typeof createGeneralInfoSchema>>;
