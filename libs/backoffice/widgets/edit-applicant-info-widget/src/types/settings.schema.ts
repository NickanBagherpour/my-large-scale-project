import { z } from 'zod';
import { FORM_ITEM_NAMES } from '../utils/form-item-name';
import { REGEX_PATTERNS } from '@oxygen/utils';


const requiredString = (t: (key: string) => string, messageKey = 'error.required') =>
  z.string({ required_error: t(messageKey) })
    .trim()
    .min(1, { message: t(messageKey) });





const regexString = (
  pattern: RegExp,
  t: (key: string) => string,
  errorKey: string,
  requiredMessageKey = 'error.required'
) =>
  requiredString(t, requiredMessageKey).regex(pattern, { message: t(errorKey) });



export const FormSchema = (t: (key: string) => string) =>
  z.object({
    [FORM_ITEM_NAMES.userName]: requiredString(t),
    [FORM_ITEM_NAMES.organizationName]: requiredString(t),
    [FORM_ITEM_NAMES.mobileNumber]: requiredString(t),
    [FORM_ITEM_NAMES.email]: regexString(
      REGEX_PATTERNS.optionalEmailValidator,
      t,
      'error.email_validation_message'
    ),
  });

export type FormValues = z.infer<ReturnType<typeof FormSchema>>;
