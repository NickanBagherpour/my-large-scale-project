import { serviceNameSchema } from '../types';

export function getServiceNameFromUrl(maybeServiceName: string | null): string {
  const serviceName = serviceNameSchema(((t: unknown) => t) as any).safeParse(maybeServiceName);
  if (serviceName.success) return serviceName.data;
  else return '';
}
