import { TFunction } from 'i18next';
import { DefaultTheme } from 'styled-components';

import { ColumnsType } from '@oxygen/ui-kit';
import { getValueOrDash } from '@oxygen/utils';
import { ClientHistoryData } from '@oxygen/types';

type Props = {
  t: TFunction;
  theme: DefaultTheme;
};

export function getDesktopColumns(props: Props): ColumnsType<ClientHistoryData> {
  const { t } = props;

  return [
    {
      title: t('field.modify_date'),
      dataIndex: 'modify_date',
      key: 'id',
      align: 'center',
      render: (value) => value,
    },
    {
      title: t('field.admin_name'),
      dataIndex: 'admin_name',
      key: 'id',
      align: 'center',
      render: (value) => value,
    },
    {
      title: t('field.action_method'),
      dataIndex: 'action_method',
      key: 'index',
      align: 'center',
      render: (value) => value,
    },
    {
      title: t('field.protocol'),
      dataIndex: 'protocol',
      key: 'index',
      width: 'min-content',
      render: (value) => value,
    },
    {
      title: t('field.path'),
      dataIndex: 'path',
      key: 'index',
      width: 'min-content',
      render: (value) => value,
    },
    {
      title: t('field.host'),
      dataIndex: 'host',
      key: 'index',
      width: 'min-content',
      render: (value) => value,
    },
  ];
}
