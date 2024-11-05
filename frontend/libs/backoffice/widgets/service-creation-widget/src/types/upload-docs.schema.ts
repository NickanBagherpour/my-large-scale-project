import { z } from 'zod';
import { TFunction } from 'i18next';
import { isExcel } from '../utils/schema.utils';
import { UPLOAD_NAMES } from '../utils/consts';

export const MAX_FILE_SIZE = 5_000_000;

export const createFormSchema = (t: TFunction) =>
  z.object({
    [UPLOAD_NAMES.file]: z
      .any()
      .refine((data) => !!data, { message: t('validation.required') })
      .refine((data) => data?.file.size < MAX_FILE_SIZE, { message: t('max_file_size') })
      .refine(isExcel, { message: t('file_format') }),
  });

export type FormValues = z.infer<ReturnType<typeof createFormSchema>>;
