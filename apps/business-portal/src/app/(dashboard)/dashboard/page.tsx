'use server';

import DashboardWidget from '@oxygen/business/widgets/dashboard-widget';

import { cookies } from 'next/headers';

import { CookieKey } from '@oxygen/types';
import { decrypt } from '@oxygen/utils';

export default async function Index(props) {
  const cookieStore = await cookies();
  const role = decrypt(cookieStore.get(CookieKey.INFO)?.value);

  return <DashboardWidget parentProps={{ ...props, role }} />;
}
