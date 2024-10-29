import { z } from 'zod';
import { FORM_ITEM_NAMES } from '../utils/form-item-name';
import { createSchemaFieldRule } from 'antd-zod';
import { i18nBase } from '@oxygen/translation';

export const FormSchema = z.object({
  [FORM_ITEM_NAMES.userName]: z.string({ required_error: i18nBase.t('error.required') }),
  [FORM_ITEM_NAMES.nationalCode]: z.string({ required_error: i18nBase.t('error.required') }),
  [FORM_ITEM_NAMES.organizationName]: z.string({ required_error: i18nBase.t('error.required') }),
  [FORM_ITEM_NAMES.mobileNumber]: z.string({ required_error: i18nBase.t('error.required') }),
  [FORM_ITEM_NAMES.telePhone]: z.string({ required_error: i18nBase.t('error.required') }),
  [FORM_ITEM_NAMES.email]: z.string({ required_error: i18nBase.t('error.required') }),
});

export type FormValues = z.infer<typeof FormSchema>;

export const rule = createSchemaFieldRule(FormSchema);
