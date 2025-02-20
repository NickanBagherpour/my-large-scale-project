import { TFunction } from 'i18next';
import { z } from 'zod';
import { SERVICE_NAME } from '../utils/consts';
import { createValidationSchema, REGEX_PATTERNS } from '@oxygen/utils';

export const CreateServiceNameSchema = (t: TFunction<'translation', undefined>) => {
  const validationSchema = createValidationSchema(t);
  return z.object({
    [SERVICE_NAME.ServiceName]: validationSchema.searchField,
  });
};
export type ServiceNameType = z.infer<ReturnType<typeof CreateServiceNameSchema>>;
