'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@oxygen/utils';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.replace(ROUTES.BUSINESS.REQUEST_LIST);
  }, [router]);

  return null;
}
