import z from 'zod';
import { TFunction } from 'i18next';

import { createValidationSchema } from '@oxygen/utils';
import { FORM_ITEM_NAMES } from '../utils/form-item-name';

export const createUpstreamType = (t: TFunction) => {
  const validationSchema = createValidationSchema(t);
  return z.object({
    [FORM_ITEM_NAMES.englishNameScope]: validationSchema.defaultEnglishName,
    [FORM_ITEM_NAMES.persianNameScope]: validationSchema.defaultPersianName,
  });
};
export type CreateUpstreamType = z.infer<ReturnType<typeof createUpstreamType>>;
