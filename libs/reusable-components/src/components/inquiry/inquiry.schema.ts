import { TFunction } from 'i18next';
import { z } from 'zod';
import { INQUIRY } from './consts';
import { REGEX_PATTERNS } from '@oxygen/utils';

export const CreateInquirySchema = (t: TFunction<'translation', undefined>) =>
  z.object({
    [INQUIRY.ItemName]: z
      .string({ required_error: t('validation.required') })
      .trim()
      .max(100, t('validation.max_len', { val: 100 }))
      .regex(REGEX_PATTERNS.isLatinText, t('validation.english_validation_message'))
      .min(1, { message: t('validation.required') }),
  });
export type InquiryItemNameType = z.infer<ReturnType<typeof CreateInquirySchema>>;
