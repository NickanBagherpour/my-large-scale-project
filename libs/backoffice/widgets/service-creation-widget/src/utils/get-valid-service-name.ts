import { createValidationSchema } from '@oxygen/utils';

export function getServiceNameFromUrl(maybeServiceName: string | null): string {
  const validationSchema = createValidationSchema(((t: unknown) => t) as any);
  const serviceName = validationSchema.english.safeParse(maybeServiceName);
  if (serviceName.success) return serviceName.data;
  else return '';
}
