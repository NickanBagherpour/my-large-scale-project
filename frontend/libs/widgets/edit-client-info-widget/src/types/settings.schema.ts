import { z } from 'zod';
import { FORM_ITEM_NAMES } from '../utils/form-item-name';
import { createSchemaFieldRule } from 'antd-zod';
import { i18nBase } from '@oxygen/translation';

export const FormSchema = z.object({
  // [FORM_ITEM_NAMES.grantType]: z.string({required_error: i18nBase.t("error.required")}),
  // [FORM_ITEM_NAMES.tags]: z.string({required_error: i18nBase.t("error.required")}),
  [FORM_ITEM_NAMES.latinNameClient]: z.string({ required_error: i18nBase.t('error.required') }),
  [FORM_ITEM_NAMES.persianNameClient]: z.string({ required_error: i18nBase.t('error.required') }),
  [FORM_ITEM_NAMES.clientType]: z.string({ required_error: i18nBase.t('error.required') }),
  [FORM_ITEM_NAMES.clientId]: z.string({ required_error: i18nBase.t('error.required') }),
  [FORM_ITEM_NAMES.identityAuth]: z.string({ required_error: i18nBase.t('error.required') }),
  [FORM_ITEM_NAMES.websiteUrl]: z.string({ required_error: i18nBase.t('error.required') }),
  [FORM_ITEM_NAMES.inputAddress]: z.string({ required_error: i18nBase.t('error.required') }),
  [FORM_ITEM_NAMES.returnAddress]: z.string({ required_error: i18nBase.t('error.required') }),
  [FORM_ITEM_NAMES.aggregatorStatus]: z.boolean().optional(),
  [FORM_ITEM_NAMES.aggregator]: z.string({ required_error: i18nBase.t('error.required') }),
});

export type FormValues = z.infer<typeof FormSchema>;

export const rule = createSchemaFieldRule(FormSchema);
