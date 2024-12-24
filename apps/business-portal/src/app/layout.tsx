import { AntStyleProvider, BaseProvider } from '@oxygen/hooks';

import { StyledComponentsRegistry } from './registry';
import 'normalize.css';
import { iransans } from './fonts';
import '../../public/assets/fonts/iconly/iconly.css';

export const metadata = {
  title: 'Oxygen Pro',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='fa' className={iransans.variable}>
      <body>
        <AntStyleProvider>
          <StyledComponentsRegistry>
            <BaseProvider initialConfig={null}>{children}</BaseProvider>
          </StyledComponentsRegistry>
        </AntStyleProvider>
      </body>
    </html>
  );
}
