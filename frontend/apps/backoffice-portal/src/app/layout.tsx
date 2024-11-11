import { BaseProvider, AntStyleProvider } from '@oxygen/hooks';

import { StyledComponentsRegistry } from './registry';
import 'normalize.css';
import { iransans } from '@oxygen/ui-kit';
import { getIntitialConfig } from './get-initial-config';

export const metadata = {
  title: 'Oxygen Plus',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const validConfig = getIntitialConfig();
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
