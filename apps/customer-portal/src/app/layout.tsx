import 'normalize.css';

import { BaseProvider, AntStyleProvider } from '@oxygen/hooks';
import { iransans } from '@oxygen/ui-kit';

import { StyledComponentsRegistry } from './registry';
import { getInitialConfig } from '@oxygen/utils';

export const metadata = {
  title: 'Oxygen Pro',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const validConfig = await getInitialConfig();
  return (
    <html lang='fa' className={iransans}>
      <body>
        <AntStyleProvider>
          <StyledComponentsRegistry>
            <BaseProvider initialConfig={validConfig}>{children}</BaseProvider>
          </StyledComponentsRegistry>
        </AntStyleProvider>
      </body>
    </html>
  );
}
