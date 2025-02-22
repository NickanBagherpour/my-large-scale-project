'use server';

import { cookies } from 'next/headers';

import RequestDetailsWidget from '@oxygen/business/widgets/request-details-widget';
import { CookieKey } from '@oxygen/types';
import { decrypt } from '@oxygen/utils';

export default async function Index(props) {
  const cookieStore = await cookies();
  const role = decrypt(cookieStore.get(CookieKey.INFO)?.value);
  return <RequestDetailsWidget parentProps={{ ...props, role }} />;
}
