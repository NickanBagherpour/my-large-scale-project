import { TFunction } from 'i18next';
import z from 'zod';
import { REGEX_PATTERNS } from '@oxygen/utils';
import { LIMITAION_FORM_NAME } from '../utils/const';

export const uploadClient = (t: TFunction) =>
  z.object({
    [LIMITAION_FORM_NAME.totalCallLimit]: z
      .string({ required_error: t('validation.required') })
      .min(1, t('validation.required'))
      .max(30, t('validation.max_length'))
      .regex(REGEX_PATTERNS.isLatinText, t('validation.english_name_error')),
  });

export type UploadClientType = z.infer<ReturnType<typeof uploadClient>>;
