import z from 'zod';
import { TFunction } from 'i18next';

import { REGEX_PATTERNS } from '@oxygen/utils';
import { createValidationSchema } from '@oxygen/utils';

export const FORM_ITEM_NAMES = {
  domain: 'domain',
  weight: 'weight',
  healthStatus: 'health_status',
} as const;

const requiredString = (t: (key: string) => string) =>
  z
    .string({ required_error: t('validation.required') })
    .trim()
    .min(1, { message: t('validation.required') });

const regexString = (pattern: RegExp, errorKey: string, t: (key: string) => string) =>
  requiredString(t).regex(pattern, { message: t(errorKey) });

export const createServerType = (t: TFunction) => {
  const validationSchema = createValidationSchema(t);
  return z.object({
    [FORM_ITEM_NAMES.domain]: validationSchema.host,
    [FORM_ITEM_NAMES.weight]: validationSchema.UpstreamServiceWeight,
  });
};
export type CreateServerType = z.infer<ReturnType<typeof createServerType>>;
