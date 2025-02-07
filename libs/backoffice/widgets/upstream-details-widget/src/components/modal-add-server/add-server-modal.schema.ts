import z from 'zod';
import { TFunction } from 'i18next';

import { createValidationSchema, REGEX_PATTERNS } from '@oxygen/utils';

export const FORM_ITEM_NAMES = {
  domain: 'domain',
  weight: 'weight',
  healthStatus: 'health_status',
} as const;

export const createServerType = (t: TFunction) => {
  const validationSchema = createValidationSchema(t);
  return z.object({
    [FORM_ITEM_NAMES.domain]: validationSchema.required.regex(
      REGEX_PATTERNS.ipOrDomainAddress,
      t('validation.is_not_valid', { val: t('host_address') })
    ),
    [FORM_ITEM_NAMES.weight]: validationSchema.simpleRequired.regex(
      REGEX_PATTERNS.upstreamServerWeight,
      t('validation.is_not_valid', { val: t('domain') })
    ),
  });
};
export type CreateServerType = z.infer<ReturnType<typeof createServerType>>;
