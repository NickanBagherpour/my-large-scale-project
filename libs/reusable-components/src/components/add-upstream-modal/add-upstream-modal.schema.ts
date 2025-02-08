import z from 'zod';
import { TFunction } from 'i18next';

import { createValidationSchema, REGEX_PATTERNS } from '@oxygen/utils';

export const FORM_ITEM_NAMES = {
  name: 'name',
  description: 'description',
} as const;

export const createUpstreamType = (t: TFunction) => {
  const validationSchema = createValidationSchema(t);
  return z.object({
    [FORM_ITEM_NAMES.name]: validationSchema.defaultEnglishName,
    [FORM_ITEM_NAMES.description]: validationSchema.defaultPersianName,
  });
};
export type CreateUpstreamType = z.infer<ReturnType<typeof createUpstreamType>>;
