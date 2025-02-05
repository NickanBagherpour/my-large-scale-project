import { z } from 'zod';
import { FORM_ITEM_NAMES } from '../utils/form-item-name';
import { createValidationSchema } from '@oxygen/utils';
import { TFunction } from 'i18next';

export const createFormSchema = (t: TFunction) => {
  const validationSchema = createValidationSchema(t);

  return z.object({
    [FORM_ITEM_NAMES.persianNameClient]: validationSchema.persian.min(3),
    [FORM_ITEM_NAMES.clientType]: z.number(),
    [FORM_ITEM_NAMES.websiteUrl]: validationSchema.url,
    [FORM_ITEM_NAMES.inputAddress]: validationSchema.required,
    [FORM_ITEM_NAMES.returnAddress]: validationSchema.url,
  });
};

export type FormValues = z.infer<ReturnType<typeof createFormSchema>>;
