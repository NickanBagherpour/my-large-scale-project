import { BaseProvider, AntStyleProvider } from '@oxygen/hooks';

import { StyledComponentsRegistry } from './registry';
import 'normalize.css';
import { iransans } from '@oxygen/ui-kit';

export const metadata = {
  title: 'اکسیژن',
  description: ' پلتفرم یکپارچه خدمات مالی و سازمانی بر بستر API',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='fa' className={iransans}>
      <body>
        <AntStyleProvider>
          <StyledComponentsRegistry>
            <BaseProvider>{children}</BaseProvider>
          </StyledComponentsRegistry>
        </AntStyleProvider>
      </body>
    </html>
  );
}
