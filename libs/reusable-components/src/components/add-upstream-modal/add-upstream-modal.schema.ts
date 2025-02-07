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
    [FORM_ITEM_NAMES.name]: validationSchema.defaultEnglishName.regex(
      REGEX_PATTERNS.defaultEnglishName,
      t('validation.is_not_valid', { val: t('uikit.upstream_english_name') })
    ),
    [FORM_ITEM_NAMES.description]: validationSchema.defaultPersianName.regex(
      REGEX_PATTERNS.defaultPersianName,
      t('validation.is_not_valid', { val: t('uikit.upstream_persian_name') })
    ),
  });
};
export type CreateUpstreamType = z.infer<ReturnType<typeof createUpstreamType>>;
