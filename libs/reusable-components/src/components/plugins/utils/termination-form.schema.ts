import { TFunction } from 'i18next';
import z from 'zod';
import { TERMINATION_FORM_NAME } from '../utils/const';

const MAX_LENGTH = 30;

export const termaintionSchema = (t: TFunction) =>
  z.object({
    [TERMINATION_FORM_NAME.statusCode]: z
      .string({ required_error: t('validation.required') })
      .trim()
      .min(1, t('validation.min_length'))
      .max(MAX_LENGTH, t('validation.max_length')),

    [TERMINATION_FORM_NAME.echo]: z
      .string({ required_error: t('validation.required') })
      .trim()
      .min(1, t('validation.min_length'))
      .max(MAX_LENGTH, t('validation.max_length')),

    [TERMINATION_FORM_NAME.message]: z
      .string({ required_error: t('validation.required') })
      .trim()
      .min(1, t('validation.min_length'))
      .max(MAX_LENGTH, t('validation.max_length')),
  });

export type TerminationType = z.infer<ReturnType<typeof termaintionSchema>>;
