import { z } from 'zod';
import { FORM_ITEM_NAMES } from '../utils/consts';

export const createFormSchema = (t: (key: string) => string) =>
  z.object({
    [FORM_ITEM_NAMES.enName]: z.string({ required_error: t('error.required') }),
    [FORM_ITEM_NAMES.faName]: z.string({ required_error: t('error.required') }),
    [FORM_ITEM_NAMES.method]: z.string({ required_error: t('error.required') }),
    [FORM_ITEM_NAMES.protocol]: z.string({ required_error: t('error.required') }),
    [FORM_ITEM_NAMES.access]: z.string({ required_error: t('error.required') }),
    [FORM_ITEM_NAMES.category]: z.string({ required_error: t('error.required') }),
    [FORM_ITEM_NAMES.throughout]: z.string({ required_error: t('error.required') }),
    [FORM_ITEM_NAMES.version]: z.string({ required_error: t('error.required') }),
    [FORM_ITEM_NAMES.owner]: z.string({ required_error: t('error.required') }),
    [FORM_ITEM_NAMES.tag]: z.string({ required_error: t('error.required') }),
    [FORM_ITEM_NAMES.path]: z.string({ required_error: t('error.required') }),
    [FORM_ITEM_NAMES.host]: z.string({ required_error: t('error.required') }),
    [FORM_ITEM_NAMES.upstream]: z.string({ required_error: t('error.required') }),
    // [FORM_ITEM_NAMES.owner]: z.boolean().optional(),
  });

export type FormFieldsType = z.infer<ReturnType<typeof createFormSchema>>;
