import { TFunction } from 'i18next';
import { z } from 'zod';
import { FILTER_FORM_ITEM_NAMES } from '../utils/consts';
import { createValidationSchema } from '@oxygen/utils';

export const searchServiceSchema = (t: TFunction<'translation', undefined>) => {
  const validationSchema = createValidationSchema(t);
  return z.object({
    [FILTER_FORM_ITEM_NAMES.search_by_name]: validationSchema.searchField,
  });
};
export type SearchServiceType = z.infer<ReturnType<typeof searchServiceSchema>>;
