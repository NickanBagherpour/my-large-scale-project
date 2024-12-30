import React from 'react';

import { loadTr } from '@oxygen/translation';
import { WidgetWrapper } from '@oxygen/business/layouts';
import { PageProps } from '@oxygen/types';

import App from './components/app/app';
import { AppProvider } from './context';
import en from './locales/en';
import fa from './locales/fa';
import { useAuth } from '@oxygen/hooks';

const RequestListWidget: React.FC<PageProps> = (props) => {
  loadTr({ en, fa });

  const { user } = useAuth();

  console.log('user-->', user);

  return (
    <WidgetWrapper>
      <AppProvider>
        <App parentProps={props.parentProps} />
      </AppProvider>
    </WidgetWrapper>
  );
};

export default RequestListWidget;
