import { z } from 'zod';
import { FORM_ITEM_NAMES } from '../utils/form-item-name';
import { createSchemaFieldRule } from 'antd-zod';
import { message } from 'antd';

export const FormSchema = z.object({
  [FORM_ITEM_NAMES.grant_type]: z.string(),
  [FORM_ITEM_NAMES.tags]: z.string(),
  [FORM_ITEM_NAMES.latin_name_client]: z.string(),
  [FORM_ITEM_NAMES.persian_name_client]: z.string(),
  [FORM_ITEM_NAMES.client_type]: z.string(),
  [FORM_ITEM_NAMES.client_id]: z.string(),
  [FORM_ITEM_NAMES.identity_auth]: z.string(),
  [FORM_ITEM_NAMES.website_url]: z.string(),
  [FORM_ITEM_NAMES.input_address]: z.string(),
  [FORM_ITEM_NAMES.return_address]: z.string(),
  [FORM_ITEM_NAMES.aggregator_status]: z.boolean().optional(),
  [FORM_ITEM_NAMES.aggregator]: z.string(),
});

export type FormValues = z.infer<typeof FormSchema>;

export const rule = createSchemaFieldRule(FormSchema);
