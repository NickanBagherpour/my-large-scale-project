import { AntStyleProvider, BaseProvider } from '@oxygen/hooks';

import { StyledComponentsRegistry } from './registry';
import 'normalize.css';
import { iransans } from './fonts';
import '../../public/assets/fonts/iconly/iconly.css';
import { getInitialConfig } from '@oxygen/utils';
import '@ant-design/v5-patch-for-react-19';

export const metadata = {
  title: 'Oxygen Pro',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const validConfig = await getInitialConfig();
  return (
    <html lang='fa' className={iransans.variable}>
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
