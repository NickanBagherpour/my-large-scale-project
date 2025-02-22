import { TFunction } from 'i18next';
import { z } from 'zod';
import { CLIENT_REPORT_NAME } from '../utils/consts';
import { createValidationSchema, REGEX_PATTERNS } from '@oxygen/utils';

export const ClientReportNameSchema = (t: TFunction<'translation', undefined>) => {
  const validationSchema = createValidationSchema(t);
  return z.object({
    [CLIENT_REPORT_NAME.clientReportName]: validationSchema.searchField,
  });
};
export type ClientReportNameType = z.infer<ReturnType<typeof ClientReportNameSchema>>;
