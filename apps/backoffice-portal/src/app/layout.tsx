import { BaseProvider, AntStyleProvider } from '@oxygen/hooks';

import { StyledComponentsRegistry } from './registry';
import 'normalize.css';
import { iransans } from '@oxygen/ui-kit';
import { getInitialConfig } from './get-initial-config';

export const metadata = {
  title: 'Oxygen Pro',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const validConfig = getInitialConfig();
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
