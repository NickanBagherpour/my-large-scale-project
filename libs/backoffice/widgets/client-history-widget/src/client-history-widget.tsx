import React, { useState } from 'react';

import { useTr, loadTr } from '@oxygen/translation';
import { WidgetWrapper } from '@oxygen/backoffice/layouts';
import { PageProps } from '@oxygen/types';

import App from './components/app/app';
import { AppProvider } from './context';
import en from './locales/en';
import fa from './locales/fa';

const ClientHistoryWidget: React.FC<PageProps> = (props) => {
  loadTr({ en, fa });
  const [t] = useTr();
  const [headerTitles, setHeaderTitles] = useState<string | string[]>([t('client')]);

  const handleTitleUpdate = (newTitles: string | string[]) => {
    setHeaderTitles(newTitles);
  };

  return (
    <WidgetWrapper>
      <AppProvider>
        <App parentProps={props.parentProps} updateHeaderTitle={handleTitleUpdate} />
      </AppProvider>
    </WidgetWrapper>
  );
};

export default ClientHistoryWidget;
