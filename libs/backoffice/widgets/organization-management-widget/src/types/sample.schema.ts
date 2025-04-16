import { z } from 'zod';
import { TFunction } from 'i18next';
import { createValidationSchema } from '@oxygen/utils';
import { FORM_ITEMS_NAME } from '../utils/consts';

export const createFormSchema = (t: TFunction) => {
  const validationSchema = createValidationSchema(t);

  return z.object({
    [FORM_ITEMS_NAME.ACTIVITY_FIELD]: validationSchema.required,
    [FORM_ITEMS_NAME.ECONOMY_CODE]: validationSchema.required,
    [FORM_ITEMS_NAME.LAST_REGISTERED_ADDRESS]: validationSchema.required,
    [FORM_ITEMS_NAME.LEGAL_ENTITY_NAME]: validationSchema.required,
    [FORM_ITEMS_NAME.LEGAL_ENTITY_TYPE]: validationSchema.required,
    [FORM_ITEMS_NAME.NATIONAL_ID]: validationSchema.required,
    [FORM_ITEMS_NAME.REGISTRATION_DATE]: validationSchema.required,
    [FORM_ITEMS_NAME.REGISTRATION_NUMBER]: validationSchema.required,
    [FORM_ITEMS_NAME.TELEPHONE]: validationSchema.required,
    [FORM_ITEMS_NAME.ZIP_CODE]: validationSchema.required,
    [FORM_ITEMS_NAME.TECHNICAL_REPRESENTATIVE.MOBILE_NUMBER]: validationSchema.required,
    [FORM_ITEMS_NAME.TECHNICAL_REPRESENTATIVE.LANDLINE_NUMBER]: validationSchema.required,
    [FORM_ITEMS_NAME.TECHNICAL_REPRESENTATIVE.FIRST_AND_LAST_NAME]: validationSchema.required,
    [FORM_ITEMS_NAME.REPRESENTATIVE.MOBILE_NUMBER]: validationSchema.required,
    [FORM_ITEMS_NAME.REPRESENTATIVE.LANDLINE_NUMBER]: validationSchema.required,
    [FORM_ITEMS_NAME.REPRESENTATIVE.FIRST_AND_LAST_NAME]: validationSchema.required,
  });
};

export type FormFieldsType = z.infer<ReturnType<typeof createFormSchema>>;
