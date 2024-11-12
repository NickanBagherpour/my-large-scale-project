import { z } from 'zod';
import { FORM_ITEM_NAMES } from '../utils/form-item-name';
import { i18nBase } from '@oxygen/translation';

export const FormSchema = (t: (key: string) => string) =>
  z.object({
    [FORM_ITEM_NAMES.userName]: z
      .string({ required_error: i18nBase.t('error.required') })
      .min(1, { message: i18nBase.t('error.required') }),
    [FORM_ITEM_NAMES.organizationName]: z
      .string({ required_error: i18nBase.t('error.required') })
      .min(1, { message: i18nBase.t('error.required') }),
    [FORM_ITEM_NAMES.mobileNumber]: z
      .string({ required_error: i18nBase.t('error.required') })
      .min(1, { message: i18nBase.t('error.required') }),
  });

export type FormValues = z.infer<ReturnType<typeof FormSchema>>;
