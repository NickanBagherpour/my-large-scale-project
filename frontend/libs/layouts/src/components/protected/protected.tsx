import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@oxygen/hooks';
import { MAIN_HREF } from '@oxygen/utils';

import ClientOnly from '../client-only/client-only';

export type ProtectedProps = {
  children: ReactNode;
};

const Protected = ({ children }: ProtectedProps) => {
  const router = useRouter();
  // const { isAuth } = useAuth();

/*   useEffect(() => {
    if (!isAuth) {
      router.replace(MAIN_HREF.AUTH);
    }
  }, []); */

  return <ClientOnly>{/* isAuth */ true && children}</ClientOnly>;
};

export default Protected;
