import { z } from 'zod';
import { TFunction } from 'i18next';
import { createValidationSchema } from '@oxygen/utils';
import { FORM_NAME } from '../utils/consts';

export const createFormSchema = (t: TFunction) => {
  const validationSchema = createValidationSchema(t);

  return z.object({
    [FORM_NAME.ACTIVITY_FIELD]: validationSchema.required,
    [FORM_NAME.ECONOMY_CODE]: validationSchema.required,
    [FORM_NAME.LAST_REGISTERED_ADDRESS]: validationSchema.required,
    [FORM_NAME.LEGAL_ENTITY_NAME]: validationSchema.required,
    [FORM_NAME.LEGAL_ENTITY_TYPE]: validationSchema.required,
    [FORM_NAME.NATIONAL_ID]: validationSchema.required,
    [FORM_NAME.REGISTRATION_DATE]: validationSchema.required,
    [FORM_NAME.REGISTRATION_NUMBER]: validationSchema.required,
    [FORM_NAME.TELEPHONE]: validationSchema.required,
    [FORM_NAME.ZIP_CODE]: validationSchema.required,
    [FORM_NAME.TECHNICAL_REPRESENTATIVE.MOBILE_NUMBER]: validationSchema.required,
    [FORM_NAME.TECHNICAL_REPRESENTATIVE.LANDLINE_NUMBER]: validationSchema.required,
    [FORM_NAME.TECHNICAL_REPRESENTATIVE.FIRST_AND_LAST_NAME]: validationSchema.required,
    [FORM_NAME.REPRESENTATIVE.MOBILE_NUMBER]: validationSchema.required,
    [FORM_NAME.REPRESENTATIVE.LANDLINE_NUMBER]: validationSchema.required,
    [FORM_NAME.REPRESENTATIVE.FIRST_AND_LAST_NAME]: validationSchema.required,
    //TODO : ADD VALIDATION FOR DISCRIPTION IF ITS NEEDED
    // [FORM_ITEM.DISCRIPTION]: validationSchema.
  });
};

export type FormValues = z.infer<ReturnType<typeof createFormSchema>>;
