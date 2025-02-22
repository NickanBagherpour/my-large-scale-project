import { z } from 'zod';
import { FORM_ITEM_NAMES } from '../utils/form-item-name';
import { REGEX_PATTERNS } from '@oxygen/utils';
import { ADD_SERVER_MODAL_FORM_ITEM, UPSTREAM_TAB_NAMES_FORM_ITEM } from '../utils/consts';

export const FormSchema = (t: (key: string) => string) =>
  z.object({
    [FORM_ITEM_NAMES.englishNameScope]: z
      .string({ required_error: t('validation.required') })
      .trim()
      .min(1, { message: t('validation.required') })
      .regex(REGEX_PATTERNS.isenglishText, {
        message: t('validation.english_validation_message'),
      }),
    [FORM_ITEM_NAMES.persianNameScope]: z
      .string({ required_error: t('validation.required') })
      .trim()
      .min(1, { message: t('validation.required') })
      .regex(REGEX_PATTERNS.isPersianText, {
        message: t('validation.persian_validation_message'),
      }),
  });

export type FormValues = z.infer<ReturnType<typeof FormSchema>>;

export const addServerModalSchema = (t: (key: string) => string) =>
  z.object({
    [ADD_SERVER_MODAL_FORM_ITEM.DOMAIN]: z
      .string({ required_error: t('validation.required') })
      .trim()
      .min(1, { message: t('validation.required') }),
    [ADD_SERVER_MODAL_FORM_ITEM.WEIGHT]: z
      .string({ required_error: t('validation.required') })
      .trim()
      .min(1, { message: t('validation.required') }),
  });
export type addServerModalVlaues = z.infer<ReturnType<typeof addServerModalSchema>>;
export const nameInputsSchema = (t: (key: string) => string) => {
  const requiredString = z.string({ required_error: t('validation.required') }).superRefine((value, ctx) => {
    if (value.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t('validation.required'),
      });
    }
    if (value.length < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        type: 'string',
        minimum: 1,
        inclusive: true,
        message: t('validation.required'),
      });
    }
  });

  return z.object({
    [UPSTREAM_TAB_NAMES_FORM_ITEM.ENGLISH_NAME]: requiredString.superRefine((value, ctx) => {
      if (value.trim() !== '' && !/^[A-Za-z\s]+$/.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t('error.english_only'),
        });
      }
    }),
    [UPSTREAM_TAB_NAMES_FORM_ITEM.PERSIAN_NAME]: requiredString.superRefine((value, ctx) => {
      if (value.trim() !== '' && !/^[\u0600-\u06FF\s]+$/.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t('error.persian_only'),
        });
      }
    }),
  });
};
export type nameInputsVlaues = z.infer<ReturnType<typeof nameInputsSchema>>;
