import { z } from 'zod';
import { FORM_ITEM_NAMES } from '../utils/form-item-name';
import { createValidationSchema } from '@oxygen/utils';
import { TFunction } from 'i18next';

export const createFormSchema = (t: TFunction) => {
  const validationSchema = createValidationSchema(t);

  return z.object({
    [FORM_ITEM_NAMES.persianNameClient]: validationSchema.defaultPersianName,
    [FORM_ITEM_NAMES.clientType]: validationSchema.selectNumberRequired,
    [FORM_ITEM_NAMES.websiteUrl]: validationSchema.optionalProtocolUrl,
    [FORM_ITEM_NAMES.inputAddress]: validationSchema.optionalProtocolUrl,
    [FORM_ITEM_NAMES.returnAddress]: validationSchema.optionalProtocolUrl,
    [FORM_ITEM_NAMES.grantType]: validationSchema.objectMultipleSelection,
    [FORM_ITEM_NAMES.tags]: validationSchema.objectMultipleSelection,
  });
};

export type FormValues = z.infer<ReturnType<typeof createFormSchema>>;
