'use server';

import { cookies } from 'next/headers';

import RequestListWidget from '@oxygen/business/widgets/request-list-widget';
import { CookieKey } from '@oxygen/types';
import { decrypt } from '@oxygen/utils';

export default async function Index(props) {
  const cookieStore = cookies();
  const role = decrypt(cookieStore.get(CookieKey.INFO)?.value);
  return <RequestListWidget parentProps={{ ...props, role }} />;
}
