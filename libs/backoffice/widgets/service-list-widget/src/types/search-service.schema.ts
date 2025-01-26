import { TFunction } from 'i18next';
import { z } from 'zod';
import { SERVICE_NAME } from '../utils/consts';
import { REGEX_PATTERNS } from '@oxygen/utils';

export const CreateServiceNameSchema = (t: TFunction<'translation', undefined>) =>
  z.object({
    [SERVICE_NAME.ServiceName]: z
      .string()
      .trim()
      .max(100, t('error.max_len', { val: 100 }))
      .regex(REGEX_PATTERNS.isLatinText, t('validation.english_validation_message'))
      .nullable()
      .optional(),
  });
export type ServiceNameType = z.infer<ReturnType<typeof CreateServiceNameSchema>>;
