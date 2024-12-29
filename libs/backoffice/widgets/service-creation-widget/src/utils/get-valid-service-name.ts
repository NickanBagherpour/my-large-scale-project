import { serviceNameSchema } from '../types';

export function getServiceNameFromUrl(maybeServiceName: string | undefined): string {
  const serviceName = serviceNameSchema(((t: unknown) => t) as any).safeParse(maybeServiceName);
  if (serviceName.success) return serviceName.data;
  else return '';
}
