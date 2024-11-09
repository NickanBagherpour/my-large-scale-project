import { TFunction } from 'i18next';
import z from 'zod';
import { UPLOAD_CLIENT_NAMES } from '../utils/consts';

export const uploadClient = (t: TFunction) =>
  z.object({
    [UPLOAD_CLIENT_NAMES.uploadClient]: z
      .string({ required_error: t('validation.required') })
      .min(1, { message: t('validation.required') }),
  });

export type UploadClientType = z.infer<ReturnType<typeof uploadClient>>;
