'use server';

import { cookies } from 'next/headers';

import EditRequestListWidget from '@oxygen/business/widgets/edit-request-list-widget';
import { CookieKey } from '@oxygen/types';
import { decrypt } from '@oxygen/utils';

export default async function Index(props) {
  const cookieStore = await cookies();
  const role = decrypt(cookieStore.get(CookieKey.INFO)?.value);

  return <EditRequestListWidget parentProps={{ ...props, role }} />;
}
