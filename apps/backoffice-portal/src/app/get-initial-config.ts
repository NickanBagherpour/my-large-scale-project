import { configSchema } from '@oxygen/types';
import { cookies } from 'next/headers';

export const getIntitialConfig = () => {
  const maybeConfig = cookies().get('configuration')?.value;
  if (!maybeConfig) return null;

  const config = configSchema.safeParse(JSON.parse(maybeConfig));

  if (config.success) return config.data;
  else return null;
};
