import { z } from 'zod';
import { FORM_ITEM_NAMES } from '../utils/form-items-name';
import { REGEX_PATTERNS } from '@oxygen/utils';
import { TFunction } from 'i18next';

export const FormSchema = (t: TFunction<'translation', undefined>) =>
  z.object({
    [FORM_ITEM_NAMES.name]: z
      .string({ required_error: t('validation.required') })
      .trim()
      .min(1, { message: t('validation.required') })
      .max(100, { message: t('validation.min_len', { val: 100 }) })
      .regex(REGEX_PATTERNS.isLatinText, {
        message: t('validation.english_validation_message'),
      }),
    [FORM_ITEM_NAMES.persianName]: z
      .string({ required_error: t('validation.required') })
      .trim()
      .min(1, { message: t('validation.required') })
      .max(100, { message: t('validation.min_len', { val: 100 }) })
      .regex(REGEX_PATTERNS.isPersianText, {
        message: t('validation.persian_validation_message'),
      }),
  });

export const ModalFormSchema = (t: TFunction<'translation', undefined>) =>
  z.object({
    [FORM_ITEM_NAMES.domain]: z
      .string({ required_error: t('validation.required') })
      .trim()
      .min(1, { message: t('validation.required') })
      .max(100, { message: t('validation.min_len', { val: 100 }) }),
    [FORM_ITEM_NAMES.weight]: z
      .string({ required_error: t('validation.required') })
      .trim()
      .min(1, { message: t('validation.required') })
      .max(100, { message: t('validation.min_len', { val: 100 }) })
      .regex(REGEX_PATTERNS.onlyDigit, {
        message: t('validation.only_digit_message'),
      }),
  });

export type ModalFormFieldsType = z.infer<ReturnType<typeof FormSchema>>;
