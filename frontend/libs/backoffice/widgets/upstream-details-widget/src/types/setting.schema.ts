import { z } from 'zod';
import { FORM_ITEM_NAMES } from '../utils/form-items-name';
import { i18nBase } from '@oxygen/translation';

export const FormSchema = (t: (key: string) => string) =>
  z.object({
    [FORM_ITEM_NAMES.name]: z
      .string({ required_error: i18nBase.t('error.required') })
      .min(1, { message: i18nBase.t('error.required') }),
    [FORM_ITEM_NAMES.persianName]: z
      .string({ required_error: i18nBase.t('error.required') })
      .min(1, { message: i18nBase.t('error.required') }),
  });

export type FormValues = z.infer<ReturnType<typeof FormSchema>>;
