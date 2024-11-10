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

export const ModalFormSchema = (t: (key: string) => string) =>
  z.object({
    [FORM_ITEM_NAMES.domain]: z
      .string({ required_error: i18nBase.t('error.required') })
      .min(1, { message: i18nBase.t('error.required') }),
    [FORM_ITEM_NAMES.weight]: z
      .string({ required_error: i18nBase.t('error.required') })
      // .number({ message: i18nBase.t('error.expected_number') })
      .min(1, { message: i18nBase.t('error.required2') }),
  });

export type ModalFormFieldsType = z.infer<ReturnType<typeof FormSchema>>;
