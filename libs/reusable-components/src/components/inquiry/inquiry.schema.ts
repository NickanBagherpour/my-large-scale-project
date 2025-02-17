import { TFunction } from 'i18next';
import { z } from 'zod';
import { createValidationSchema } from '@oxygen/utils';
import { INQUIRY } from './consts';
import { InquiryType } from './types';

export const CreateInquirySchema = (t: TFunction<'translation', undefined>, type: InquiryType) => {
  const validationSchema = createValidationSchema(t);
  if (type === 'service') {
    return z.object({
      [INQUIRY.ItemName]: validationSchema.english,
    });
  } else {
    return z.object({
      [INQUIRY.ItemName]: validationSchema.englishWithoutWhitespace,
    });
  }
};
export type InquiryItemNameType = z.infer<ReturnType<typeof CreateInquirySchema>>;
