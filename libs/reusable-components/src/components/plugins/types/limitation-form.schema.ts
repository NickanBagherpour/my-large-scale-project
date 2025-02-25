import { TFunction } from 'i18next';
import z from 'zod';
import { LIMITAION_FORM_NAME } from '../utils/const';
import { createValidationSchema } from '@oxygen/utils';

export const limitationsSchema = (t: TFunction) => {
  const validation = createValidationSchema(t);
  return z.object({
    [LIMITAION_FORM_NAME.serviceCallRate]: validation.positiveNumber,
    [LIMITAION_FORM_NAME.serviceCallRateOptions]: validation.required,
    [LIMITAION_FORM_NAME.totalCallLimit]: validation.positiveNumber,
    [LIMITAION_FORM_NAME.callLimitOptions]: validation.required,
  });
};

export type LimitationsType = z.infer<ReturnType<typeof limitationsSchema>>;
