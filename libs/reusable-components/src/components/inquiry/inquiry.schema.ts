import { TFunction } from 'i18next';
import { z } from 'zod';
import { createValidationSchema } from '@oxygen/utils';
import { INQUIRY } from './consts';

export const CreateInquirySchema = (t: TFunction<'translation', undefined>) => {
  const validationSchema = createValidationSchema(t);

  return z.object({
    [INQUIRY.ItemName]: validationSchema.validEnglishName(t('element.service')),
  });
};
export type InquiryItemNameType = z.infer<ReturnType<typeof CreateInquirySchema>>;
