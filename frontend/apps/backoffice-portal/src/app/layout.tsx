import { BaseProvider, AntStyleProvider } from '@oxygen/hooks';

import { StyledComponentsRegistry } from './registry';
import 'normalize.css';
import { iransans } from '@oxygen/ui-kit';
import { cookies } from 'next/headers';
import { configSchema } from '@oxygen/types';

export const metadata = {
  title: 'اکسیژن',
  description: ' پلتفرم یکپارچه خدمات مالی و سازمانی بر بستر API',
};

const getIntitialConfig = () => {
  const maybeConfig = cookies().get('configuration')?.value;
  if (!maybeConfig) return null;

  const config = configSchema.safeParse(JSON.parse(maybeConfig));

  if (config.success) return config.data;
  else return null;
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
