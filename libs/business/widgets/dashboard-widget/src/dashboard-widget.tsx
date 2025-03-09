'use client';

import React from 'react';

import { loadTr } from '@oxygen/translation';
import { WidgetWrapper } from '@oxygen/business/layouts';
import { PageProps } from '@oxygen/types';

import App from './components/app/app';
import { AppProvider } from './context';
import en from './locales/en';
import fa from './locales/fa';
import { withRoleCheck } from '@oxygen/reusable-components';
import { ALLOWED_ROLES } from './utils/consts';

const DashboardWidget: React.FC<PageProps> = (props) => {
  loadTr({ en, fa });
  const GuardedApp = withRoleCheck(App);
  return (
    <WidgetWrapper>
      <AppProvider>
        <GuardedApp
          parentProps={props.parentProps}
          role={props.parentProps?.role as string}
          allowedRoles={ALLOWED_ROLES}
        />
      </AppProvider>
    </WidgetWrapper>
  );
};

export default DashboardWidget;
