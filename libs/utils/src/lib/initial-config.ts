'use server';

import { configSchema, CookieKey } from '@oxygen/types';
import { cookies } from 'next/headers';

export const getInitialConfig = async () => {
  // Get the config from the cookie
  const cookieStore = await cookies();
  const maybeConfig = cookieStore.get(CookieKey.CONFIG)?.value;

  if (!maybeConfig) return null;

  const config = configSchema.safeParse(JSON.parse(maybeConfig));

  if (config.success) return config.data;
  else return null;
};
