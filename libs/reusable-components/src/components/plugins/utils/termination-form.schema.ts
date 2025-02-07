import { TFunction } from 'i18next';
import z from 'zod';
import { TERMINATION_FORM_NAME } from '../utils/const';
import { createValidationSchema } from '@oxygen/utils';

export const termaintionSchema = (t: TFunction) => {
  const validation = createValidationSchema(t);
  return z.object({
    [TERMINATION_FORM_NAME.statusCode]: validation.required,
    [TERMINATION_FORM_NAME.echo]: validation.boolean,
    [TERMINATION_FORM_NAME.message]: validation.required,
  });
};

export type TerminationType = z.infer<ReturnType<typeof termaintionSchema>>;
