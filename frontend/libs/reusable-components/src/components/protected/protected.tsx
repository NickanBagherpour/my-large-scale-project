'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@oxygen/hooks';
import { MAIN_HREF } from '@oxygen/utils';

export type ProtectedProps = {
  children: ReactNode;
};

const Protected = ({ children }: ProtectedProps) => {
  const router = useRouter();
  const { isAuth } = useAuth();

  useEffect(() => {
    if (!isAuth) {
      router.replace(MAIN_HREF.AUTH);
    }
  }, []);

  return isAuth && children;
};

export default Protected;
