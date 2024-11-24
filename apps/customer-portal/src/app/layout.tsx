import { SessionProvider } from 'next-auth/react';
import 'normalize.css';

import { BaseProvider, AntStyleProvider } from '@oxygen/hooks';
import { auth } from '@oxygen/customer/auth';
import { iransans } from '@oxygen/ui-kit';

import { StyledComponentsRegistry } from './registry';
import { getIntitialConfig } from './get-initial-config';

export const metadata = {
  title: 'Oxygen Pro',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const validConfig = getIntitialConfig();
  const session = await auth();

  return (
    <html lang="fa" className={iransans}>
    <body>
    <AntStyleProvider>
      <StyledComponentsRegistry>
        <SessionProvider session={session}>
          <BaseProvider initialConfig={validConfig}>{children}</BaseProvider>
        </SessionProvider>
      </StyledComponentsRegistry>
    </AntStyleProvider>
    </body>
    </html>
  );
}
