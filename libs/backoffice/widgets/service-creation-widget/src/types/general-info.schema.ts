import z from 'zod';
import { SERVICE_NAMES } from '../utils/consts';
import { TFunction } from 'i18next';
import { createValidationSchema } from '@oxygen/utils';

export const createGeneralInfoSchema = (t: TFunction) => {
  const validationSchema = createValidationSchema(t);

  return z.object({
    [SERVICE_NAMES.englishName]: validationSchema.english,
    [SERVICE_NAMES.persianName]: validationSchema.required,
    [SERVICE_NAMES.access]: validationSchema.idSelection,
    [SERVICE_NAMES.category]: validationSchema.idSelection,
    [SERVICE_NAMES.throughput]: validationSchema.idSelection,
    [SERVICE_NAMES.version]: validationSchema.required,
    [SERVICE_NAMES.owner]: validationSchema.required,
    [SERVICE_NAMES.tags]: validationSchema.tagsList,
  });
};

export type GeneralInfoValuesType = z.infer<ReturnType<typeof createGeneralInfoSchema>>;
