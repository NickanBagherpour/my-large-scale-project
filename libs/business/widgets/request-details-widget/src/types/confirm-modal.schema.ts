import z from 'zod';
import { TFunction } from 'i18next';

import { createValidationSchema } from '@oxygen/utils';

import { CONFIRM_MODAL_NAMES } from '../utils/consts';

export const requestConfirmType = (t: TFunction) => {
  const validationSchema = createValidationSchema(t);
  return z.object({
    [CONFIRM_MODAL_NAMES.expertDescription]: validationSchema.optionalDescription,
  });
};
export type RequestConfirmType = z.infer<ReturnType<typeof requestConfirmType>>;
