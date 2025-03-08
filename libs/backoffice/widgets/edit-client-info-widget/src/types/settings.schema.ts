import { z } from 'zod';
import { FORM_ITEM_NAMES } from '../utils/form-item-name';
import { createValidationSchema } from '@oxygen/utils';
import { TFunction } from 'i18next';

export const createFormSchema = (t: TFunction, IsAuthorizationFlowSelected) => {
  const validationSchema = createValidationSchema(t);

  return z.object({
    [FORM_ITEM_NAMES.persianNameClient]: validationSchema.defaultPersianName,
    [FORM_ITEM_NAMES.clientType]: validationSchema.selectNumberRequired,
    [FORM_ITEM_NAMES.websiteUrl]: validationSchema.optionalUrl,
    [FORM_ITEM_NAMES.inputAddress]: validationSchema.optionalUrl,
    [FORM_ITEM_NAMES.returnAddress]: IsAuthorizationFlowSelected ? validationSchema.url : validationSchema.optionalUrl,
  });
};

export type FormValues = z.infer<ReturnType<typeof createFormSchema>>;
