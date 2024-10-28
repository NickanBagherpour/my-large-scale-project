import React from 'react';

import { loadTr } from '@oxygen/translation';
import { WidgetWrapper } from '@oxygen/layouts';
import { PageProps } from '@oxygen/types';

import App from './components/app/app';
import { AppProvider } from './context';
import en from './locales/en';
import fa from './locales/fa';

const ServicesListWidget: React.FC<PageProps> = (props) => {
  loadTr({ en, fa });

  return (
    <WidgetWrapper>
      <AppProvider>
        <App />
      </AppProvider>
    </WidgetWrapper>
  );
};

export default ServicesListWidget;
