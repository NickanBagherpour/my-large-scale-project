import { TFunction } from 'i18next';
import z from 'zod';
import { UPLOAD_SERVICE_NAMES } from '../utils/consts';
import { REGEX_PATTERNS } from '@oxygen/utils';

export const uploadService = (t: TFunction) =>
  z.object({
    [UPLOAD_SERVICE_NAMES.uploadService]: z
      .string({ required_error: t('validation.required') })
      .min(1, t('validation.required'))
      .max(30, t('validation.max_length'))
      .regex(REGEX_PATTERNS.isLatinText, t('validation.english_name_error')),
  });

export type UploadServiceType = z.infer<ReturnType<typeof uploadService>>;
