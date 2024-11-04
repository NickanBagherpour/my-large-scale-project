import { z } from 'zod';
import { FORM_ITEM_NAMES } from '../utils/form-item-name';

export const createFormSchema = (t: (key: string) => string) =>
  z.object({
    [FORM_ITEM_NAMES.latinNameClient]: z
      .string({ required_error: t('error.required') })
      .min(1, { message: t('error.required') }),
  });

export type FormValues = z.infer<ReturnType<typeof createFormSchema>>;
