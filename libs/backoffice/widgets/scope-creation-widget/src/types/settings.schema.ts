import z from 'zod';
import { TFunction } from 'i18next';

import { createValidationSchema, REGEX_PATTERNS } from '@oxygen/utils';

export const FORM_ITEM_NAMES = {
  latinNameScope: 'name',
  persianNameScope: 'description',
} as const;

export const createUpstreamType = (t: TFunction) => {
  const validationSchema = createValidationSchema(t);
  return z.object({
    [FORM_ITEM_NAMES.latinNameScope]: validationSchema.defaultEnglishName,
    [FORM_ITEM_NAMES.persianNameScope]: validationSchema.defaultPersianName,
  });
};
export type CreateUpstreamType = z.infer<ReturnType<typeof createUpstreamType>>;
