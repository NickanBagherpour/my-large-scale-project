import { TFunction } from 'i18next';
import { z } from 'zod';
import { REGEX_PATTERNS } from '@oxygen/utils';
import { SERVICE_NAME } from '../utils/consts';

export const CreateServiceInquirySchema = (t: TFunction<'translation', undefined>) =>
  z.object({
    [SERVICE_NAME.ServiceName]: z
      .string({ required_error: t('validation.required') })
      .trim()
      .max(100, t('error.max_len', { val: 100 }))
      .regex(REGEX_PATTERNS.isLatinText, t('validation.english_validation_message'))
      .min(1, { message: t('validation.required') }),
  });
export type ServiceNameType = z.infer<ReturnType<typeof CreateServiceInquirySchema>>;
