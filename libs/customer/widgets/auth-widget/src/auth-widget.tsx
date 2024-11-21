import React from 'react';

import { loadTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';

import App from './components/app/app';
import { AppProvider } from './context';
import en from './locales/en';
import fa from './locales/fa';

const AuthWidget: React.FC<PageProps> = (props) => {
  loadTr({ en, fa });

  return (
    <AppProvider>
      <App parentProps={props.parentProps} />
    </AppProvider>
  );
};

export default AuthWidget;
