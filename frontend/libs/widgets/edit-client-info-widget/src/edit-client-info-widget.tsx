import React, { useState } from 'react';

import { useTr, loadTr } from '@oxygen/translation';
import { WidgetWrapper } from '@oxygen/layouts';
import { PageProps } from '@oxygen/types';

import App from './components/app/app';
import { AppProvider } from './context';
import en from './locales/en';
import fa from './locales/fa';

const EditClientInfoWidget: React.FC<PageProps> = (props) => {
  loadTr({ en, fa });
  const [t] = useTr();
  const [headerTitles, setHeaderTitles] = useState<string | string[]>([t('widget_name')]);

  const handleTitleUpdate = (newTitles: string | string[]) => {
    setHeaderTitles(newTitles);
  };

  return (
    <WidgetWrapper headerTitle={headerTitles}>
      <AppProvider>
        <App parentProps={props.parentProps} updateHeaderTitle={handleTitleUpdate} />
      </AppProvider>
    </WidgetWrapper>
  );
};

export default EditClientInfoWidget;
