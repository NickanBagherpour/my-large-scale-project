import z from 'zod';
import { TFunction } from 'i18next';
import { createValidationSchema } from '@oxygen/utils';

export const FORM_ITEM_NAMES = {
  domain: 'domain',
  weight: 'weight',
  healthStatus: 'health_status',
} as const;

export const createServerType = (t: TFunction) => {
  const validationSchema = createValidationSchema(t);
  return z.object({
    [FORM_ITEM_NAMES.domain]: validationSchema.upstreamServerDomain,
    [FORM_ITEM_NAMES.weight]: validationSchema.upstreamServerWeight,
  });
};
export type CreateServerType = z.infer<ReturnType<typeof createServerType>>;
