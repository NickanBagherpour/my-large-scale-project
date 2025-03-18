import { z } from 'zod';
import { TFunction } from 'i18next';
import { createValidationSchema } from '@oxygen/utils';
import { FORM_ITEM_NAMES } from '../utils/consts';

const MAX_LENGTH = 200;

export const serviceNameSchema = (t: TFunction) =>
  z
    .string({ required_error: t('validation.required'), invalid_type_error: t('validation.required') })
    .trim()
    .min(1, { message: t('validation.required') })
    .max(MAX_LENGTH /* Some services have long names, so this value needs to be set high to accommodate them */, {
      message: t('validation.max_length'),
    })
    .regex(/^[^\u0600-\u06FF]*$/, {
      message: t('validation.english_name_error'),
    });

export const createEditServiceFormSchema = (t: TFunction) => {
  const validationSchema = createValidationSchema(t);
  return z.object({
    [FORM_ITEM_NAMES.enName]: validationSchema.defaultEnglishName,
    [FORM_ITEM_NAMES.faName]: validationSchema.validPersianName,
    [FORM_ITEM_NAMES.access]: validationSchema.objectSingleSelection,
    [FORM_ITEM_NAMES.category]: validationSchema.idSelection,
    [FORM_ITEM_NAMES.version]: validationSchema.version,
    [FORM_ITEM_NAMES.owner]: validationSchema.owner,
    [FORM_ITEM_NAMES.tags]: validationSchema.tagsList,
  });
};
export type EditServiceFormFieldsType = z.infer<ReturnType<typeof createEditServiceFormSchema>>;
