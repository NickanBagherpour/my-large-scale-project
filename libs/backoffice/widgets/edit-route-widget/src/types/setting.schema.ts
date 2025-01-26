import { z } from 'zod';
import { FORM_ITEM_NAMES } from '../utils/form-item-name';
import { REGEX_PATTERNS } from '@oxygen/utils';

export const FormSchema = (t: (key: string) => string) =>
  z.object({
    [FORM_ITEM_NAMES.method]: z.any({ required_error: t('validation.required') }),
    [FORM_ITEM_NAMES.protocol]: z.any({ required_error: t('validation.required') }),
    [FORM_ITEM_NAMES.path]: z.any(),
    // .string({ required_error: t('validation.required') })
    // .trim()
    // .min(1, { message: t('validation.required') }),
    [FORM_ITEM_NAMES.host]: z.any(),
    // .string({ required_error: t('validation.required') })
    // .trim()
    // .min(1, { message: t('validation.required') }),
  });

export type FormValues = z.infer<ReturnType<typeof FormSchema>>;
