import z from 'zod';
import { TFunction } from 'i18next';

import { REGEX_PATTERNS } from '@oxygen/utils';

import { SERVICE_NAME, UPLOAD_SERVICE_NAMES } from '../utils/consts';

export const uploadService = (t: TFunction<'translation', undefined>) =>
  z.object({
    [UPLOAD_SERVICE_NAMES.uploadService]: z
      .string({ required_error: t('validation.required') })
      .trim()
      .min(1, t('validation.required'))
      .max(30, t('error.max_len', { val: 100 }))
      .regex(REGEX_PATTERNS.isLatinText, t('validation.english_validation_message')),
  });

export type UploadServiceType = z.infer<ReturnType<typeof uploadService>>;
export const ServiceName = (t: TFunction<'translation', undefined>) =>
  z.object({
    [SERVICE_NAME.ServiceName]: z
      .string({ required_error: t('validation.required') })
      .trim()
      .min(1, t('validation.required'))
      .max(30, t('error.max_len', { val: 100 }))
      .regex(REGEX_PATTERNS.isLatinText, t('validation.english_validation_message')),
  });

export type ServiceNameType = z.infer<ReturnType<typeof ServiceName>>;
