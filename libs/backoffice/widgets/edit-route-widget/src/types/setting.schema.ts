import { z } from 'zod';
import { FORM_ITEM_NAMES } from '../utils/form-item-name';
import { TFunction } from 'i18next';
import { createValidationSchema, REGEX_PATTERNS } from '@oxygen/utils';

export const EditRouteFormSchema = (t: TFunction) => {
  const validationSchema = createValidationSchema(t);

  return z.object({
    [FORM_ITEM_NAMES.method]: z.any({ required_error: t('validation.required') }),
    [FORM_ITEM_NAMES.protocol]: z.any({ required_error: t('validation.required') }),
    [FORM_ITEM_NAMES.path]: validationSchema.path,
    [FORM_ITEM_NAMES.host]: validationSchema.host,
  });
};
