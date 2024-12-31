import { configSchema, CookieKey } from '@oxygen/types';
import { cookies } from 'next/headers';

export const getInitialConfig = () => {
  const maybeConfig = cookies().get(CookieKey.CONFIG)?.value;
  if (!maybeConfig) return null;

  const config = configSchema.safeParse(JSON.parse(maybeConfig));

  if (config.success) return config.data;
  else return null;
};
