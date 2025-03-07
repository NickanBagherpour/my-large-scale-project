import { z } from 'zod';
import { FORM_ITEM } from '../utils/consts';
import { TFunction } from 'i18next';
import { createValidationSchema } from '@oxygen/utils';

export const createFormSchema = (t: TFunction) => {
  const validationSchema = createValidationSchema(t);

  return z.object({
    [FORM_ITEM.CLIENT_ENGLISH_NAME]: validationSchema.english,
    [FORM_ITEM.CLIENT_PERSIAN_NAME]: validationSchema.persian,
    [FORM_ITEM.CLIENT_KEY]: validationSchema.required,
    [FORM_ITEM.CLIENT_TYPE_CODE]: validationSchema.idSelection,
    [FORM_ITEM.AUTHORIZATION_KEY]: validationSchema.required,
    [FORM_ITEM.WEBSITE_URL]: validationSchema.optionalUrl,
    [FORM_ITEM.INBOUND_ADDRESS]: validationSchema.optionalUrl,
    [FORM_ITEM.REDIRECT_URL]: validationSchema.optionalUrl,
  });
};

export type FormValues = z.infer<ReturnType<typeof createFormSchema>>;
