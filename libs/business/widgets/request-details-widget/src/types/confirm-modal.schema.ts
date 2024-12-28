import z from 'zod';
import { TFunction } from 'i18next';

import { CONFIRM_MODAL_NAMES } from '../utils/consts';

export const requestConfirmType = (t: TFunction) => {
  return z.object({
    [CONFIRM_MODAL_NAMES.expertDescription]: z.string().max(150, t('validation.max_length')).optional(),
  });
};
export type RequestConfirmType = z.infer<ReturnType<typeof requestConfirmType>>;
