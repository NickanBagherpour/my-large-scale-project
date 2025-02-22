import { z } from 'zod';
import { FORM_ITEM } from '../utils/consts';
import { TFunction } from 'i18next';
import { createValidationSchema } from '@oxygen/utils';

export const requestRegistrationFormSchema = (t: TFunction) => {
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
    [FORM_ITEM.persian_name]: validationSchema.defaultPersianName,
    [FORM_ITEM.technical_persian_name]: validationSchema.defaultPersianName,
    [FORM_ITEM.aggregator_status]: validationSchema.simpleRequired,
    [FORM_ITEM.aggregator_value]: validationSchema.simpleRequired,
    [FORM_ITEM.legal_person_name]: validationSchema.defaultPersianName,
    [FORM_ITEM.legal_person_type]: validationSchema.simpleRequired,
    [FORM_ITEM.registration_number]: validationSchema.required,
    [FORM_ITEM.registration_date]: validationSchema.datePicker,
    [FORM_ITEM.national_id]: validationSchema.organizationNationalIdNumber,
    [FORM_ITEM.economy_code]: validationSchema.organizationEconomyCodeNumber,
    [FORM_ITEM.activity_field]: validationSchema.required,
    [FORM_ITEM.postal_code]: validationSchema.postalCode,
    [FORM_ITEM.phone]: validationSchema.tel,
    [FORM_ITEM.last_registration_address]: validationSchema.defaultPersianName,
    [FORM_ITEM.mobile_number]: validationSchema.phoneNumber,
    [FORM_ITEM.phone_number]: validationSchema.tel,
    [FORM_ITEM.technical_mobile_number]: validationSchema.phoneNumber,
    [FORM_ITEM.technical_Phone_number]: validationSchema.tel,
  });
};

export type FormValues = z.infer<ReturnType<typeof requestRegistrationFormSchema>>;
