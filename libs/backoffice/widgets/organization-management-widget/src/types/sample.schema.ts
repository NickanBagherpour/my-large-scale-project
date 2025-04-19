import { z } from 'zod';
import { TFunction } from 'i18next';
import { createValidationSchema } from '@oxygen/utils';
import { FORM_ITEMS_NAME } from '../utils/consts';

export const createFormSchema = (t: TFunction) => {
  const organizationNationalIdNumber = 11;
  const organizationEconomyCodeNumber = 12;
  const postalCodeNumber = 10;
  const validationSchema = createValidationSchema(
    t,
    organizationNationalIdNumber,
    organizationEconomyCodeNumber,
    postalCodeNumber
  );

  return z.object({
    [FORM_ITEMS_NAME.NATIONAL_ID]: validationSchema.organizationNationalIdNumber,
    [FORM_ITEMS_NAME.LEGAL_ENTITY_NAME]: validationSchema.defaultPersianName,
    [FORM_ITEMS_NAME.LEGAL_ENTITY_TYPE]: validationSchema.simpleRequired,
    [FORM_ITEMS_NAME.REGISTRATION_NUMBER]: validationSchema.required,
    [FORM_ITEMS_NAME.REGISTRATION_DATE]: validationSchema.datePicker,
    [FORM_ITEMS_NAME.ECONOMY_CODE]: validationSchema.organizationEconomyCodeNumber,
    [FORM_ITEMS_NAME.ACTIVITY_FIELD]: validationSchema.required,
    [FORM_ITEMS_NAME.ZIP_CODE]: validationSchema.postalCode,
    [FORM_ITEMS_NAME.TELEPHONE]: validationSchema.tel,
    [FORM_ITEMS_NAME.LAST_REGISTERED_ADDRESS]: validationSchema.defaultPersianName,
    [FORM_ITEMS_NAME.REPRESENTATIVE.FIRST_AND_LAST_NAME]: validationSchema.defaultPersianName,
    [FORM_ITEMS_NAME.REPRESENTATIVE.MOBILE_NUMBER]: validationSchema.phoneNumber,
    [FORM_ITEMS_NAME.REPRESENTATIVE.LANDLINE_NUMBER]: validationSchema.tel,
    [FORM_ITEMS_NAME.TECHNICAL_REPRESENTATIVE.FIRST_AND_LAST_NAME]: validationSchema.defaultPersianName,
    [FORM_ITEMS_NAME.TECHNICAL_REPRESENTATIVE.MOBILE_NUMBER]: validationSchema.phoneNumber,
    [FORM_ITEMS_NAME.TECHNICAL_REPRESENTATIVE.LANDLINE_NUMBER]: validationSchema.tel,
  });
};

export type FormFieldsType = z.infer<ReturnType<typeof createFormSchema>>;
