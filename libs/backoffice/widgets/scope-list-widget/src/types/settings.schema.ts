import { z } from 'zod';
import { TFunction } from 'i18next';
import { createValidationSchema } from '@oxygen/utils';
import { FORM_ITEM_NAMES } from '../utils/form-item-name';

export const createFormSchema = (t: TFunction) => {
  const validationSchema = createValidationSchema(t);
  return z.object({
    [FORM_ITEM_NAMES.scopesName]: validationSchema.searchField,
  });
};

export type FormValues = z.infer<ReturnType<typeof createFormSchema>>;
