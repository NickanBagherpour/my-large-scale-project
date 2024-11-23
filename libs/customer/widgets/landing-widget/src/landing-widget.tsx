import React from 'react';

import { loadTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';

import App from './components/app/app';
import { AppProvider } from './context';
import en from './locales/en';
import fa from './locales/fa';

const LandingWidget: React.FC<PageProps> = (_) => {
  loadTr({ en, fa });

  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
};

export default LandingWidget;
