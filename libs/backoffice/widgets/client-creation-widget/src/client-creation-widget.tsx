import React, { useState } from 'react';

import { useTr, loadTr } from '@oxygen/translation';
import { WidgetWrapper } from '@oxygen/backoffice/layouts';
import { PageProps } from '@oxygen/types';

import App from './components/app/app';
import { AppProvider } from './context';
import en from './locales/en';
import fa from './locales/fa';

const ClientCreationWidget: React.FC<PageProps> = (props) => {
  loadTr({ en, fa });
  const [t] = useTr();

  return (
    <WidgetWrapper>
      <AppProvider>
        <App parentProps={props.parentProps} />
      </AppProvider>
    </WidgetWrapper>
  );
};

export default ClientCreationWidget;
