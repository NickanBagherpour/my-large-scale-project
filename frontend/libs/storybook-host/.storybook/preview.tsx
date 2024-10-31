import type { Preview } from '@storybook/react';

import { TestProvider } from '@oxygen/hooks';
import { StorybookLayout } from '@oxygen/backoffice/layouts';
import '../../../apps/backoffice-portal/public/assets/fonts/font.css';
import '../../../apps/backoffice-portal/public/assets/fonts/iconly/iconly.css';

const preview: Preview = {
  decorators: [
    (Story, { parameters }) => {
      const { pageLayout } = parameters;

      switch (pageLayout) {
        case 'page':
          return (
            <div className='page-layout'>
              <Story />
            </div>
          );
        case 'page-mobile':
          return (
            <div className='page-mobile-layout'>
              <Story />
            </div>
          );
        default:
          return (
            <TestProvider>
              <StorybookLayout>
                <Story />
              </StorybookLayout>
            </TestProvider>
          );
      }
    },
  ],
};

export default preview;
