import ServiceInfo from '../components/service-info/service-info';
import Route from '../components/route-info/route-info';
import ScopeList from '../components/scope-list/scope-list';
import { Documentation } from '../components/documentation/documentation';
import React from 'react';
import { UpstreamList } from '../components/upstream-list/upstream-list/upstream-list';

export const isFileInvalid = (file: File, notification, t) => {
  const isValidType = [
    'application/pdf',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ].includes(file.type);

  const isValidSize = file.size <= 6 * 1024 * 1024; // 6MB in bytes

  if (!isValidType) {
    notification.error({ message: t('file_format_error') });
    return true;
  }

  if (!isValidSize) {
    notification.error({ message: t('file_size_limit_error') });
    return true;
  }

  return false;
};

export const tabItems = (t) => {
  return [
    {
      key: 'general-information',
      label: t('general_information'),
      children: <ServiceInfo />,
    },
    {
      key: 'route',
      label: t('route'),
      children: <Route />,
    },

    {
      key: 'scopes',
      label: t('scopes'),
      children: <ScopeList />,
    },
    {
      key: 'upstream',
      label: t('upstream'),
      children: <UpstreamList />,
    },
    {
      key: 'documentation',
      label: t('documentation'),
      children: <Documentation />,
    },
  ];
};
