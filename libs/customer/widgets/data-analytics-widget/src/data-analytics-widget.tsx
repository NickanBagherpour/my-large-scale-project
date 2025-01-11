import React, { useState } from 'react';

import { loadTr } from '@oxygen/translation';
import { WidgetWrapper } from '@oxygen/customer/layouts';
import { PageProps } from '@oxygen/types';

import App from './components/app/app';
import { AppProvider } from './context';
import en from './locales/en';
import fa from './locales/fa';

const DataAnalyticsWidget: React.FC<PageProps> = (props) => {
  loadTr({ en, fa });

  return (
    <WidgetWrapper>
      <AppProvider>
        <App parentProps={props.parentProps} />
      </AppProvider>
    </WidgetWrapper>
  );
};

export default DataAnalyticsWidget;
