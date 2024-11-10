import { z } from 'zod';
import { FORM_ITEM_NAMES } from '../utils/form-items-name';
import { i18nBase } from '@oxygen/translation';
import { REGEX_PATTERNS } from '@oxygen/utils';

export const FormSchema = (t: (key: string) => string) =>
  z.object({
    [FORM_ITEM_NAMES.name]: z
      .string({ required_error: i18nBase.t('error.required') })
      .min(1, { message: i18nBase.t('error.required') })
      .regex(REGEX_PATTERNS.isLatinText, {
        message: t('error.english_validation_message'),
      }),
    [FORM_ITEM_NAMES.persianName]: z
      .string({ required_error: i18nBase.t('error.required') })
      .min(1, { message: i18nBase.t('error.required') })
      .regex(REGEX_PATTERNS.isPersianText, {
        message: t('error.persian_validation_message'),
      }),
  });

export const ModalFormSchema = (t: (key: string) => string) =>
  z.object({
    [FORM_ITEM_NAMES.domain]: z
      .string({ required_error: i18nBase.t('error.required') })
      .min(1, { message: i18nBase.t('error.required') }),
    [FORM_ITEM_NAMES.weight]: z
      .string({ required_error: i18nBase.t('error.required') })
      .min(1, { message: i18nBase.t('error.required') })
      .regex(REGEX_PATTERNS.onlyDigit, {
        message: t('error.only_digit_message'),
      }),
  });

export type ModalFormFieldsType = z.infer<ReturnType<typeof FormSchema>>;
