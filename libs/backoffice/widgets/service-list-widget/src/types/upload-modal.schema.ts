import z from 'zod';
import { TFunction } from 'i18next';

import { REGEX_PATTERNS } from '@oxygen/utils';

import { Search_SERVICE_NAMES, UPLOAD_SERVICE_NAMES } from '../utils/consts';

export const uploadService = (t: TFunction<'translation', undefined>) =>
  z.object({
    [UPLOAD_SERVICE_NAMES.uploadService]: z
      .string({ required_error: t('error.required') })
      .trim()
      .min(1, t('error.required'))
      .max(30, t('error.max_len', { val: 100 }))
      .regex(REGEX_PATTERNS.isLatinText, t('error.english_validation_message')),
  });

export type UploadServiceType = z.infer<ReturnType<typeof uploadService>>;
export const SearchService = (t: TFunction<'translation', undefined>) =>
  z.object({
    [Search_SERVICE_NAMES.SearchService]: z
      .string({ required_error: t('error.required') })
      .trim()
      .min(1, t('error.required'))
      .max(30, t('error.max_len', { val: 100 }))
      .regex(REGEX_PATTERNS.isLatinText, t('error.english_validation_message')),
  });

export type SearchServiceType = z.infer<ReturnType<typeof SearchService>>;
