import { z } from 'zod';
import { TFunction } from 'i18next';
import { createValidationSchema } from '@oxygen/utils';
import { FILTER_FORM_ITEM_NAMES } from '../utils/consts';

export const SearchUpstreamSchema = (t: TFunction) => {
  const validationSchema = createValidationSchema(t);
  return z.object({
    [FILTER_FORM_ITEM_NAMES.search_by_name]: validationSchema.searchField,
  });
};

export type SearchUpstreamType = z.infer<ReturnType<typeof SearchUpstreamSchema>>;
