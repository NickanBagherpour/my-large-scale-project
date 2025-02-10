import { TFunction } from 'i18next';

import { ColumnsType, HistoryCell } from '@oxygen/ui-kit';
import { getValueOrDash } from '@oxygen/utils';

type Props = {
  t: TFunction;
};

export function getDesktopColumns(props: Props): ColumnsType<any> {
  const { t } = props;

  return [
    {
      title: t('column.edit-date'),
      dataIndex: 'modifyDate',
      render: (item) => {
        return <div>{getValueOrDash(item?.value)}</div>;
      },
    },
    {
      title: t('column.admin-name'),
      dataIndex: 'modifyBy',
      key: 'modifyBy',
      ellipsis: true,
      render: (item) => {
        return <div>{getValueOrDash(item?.value)}</div>;
      },
    },
    {
      title: t('column.action'),
      dataIndex: 'route',
      key: 'route',
      ellipsis: true,
      className: 'right-to-left',
      render: (item) => {
        const value = item?.value?.methods?.value?.[0]?.value?.title;
        return <HistoryCell item={value} />;
      },
    },
    {
      title: t('column.path'),
      dataIndex: 'route',
      key: 'paths',
      ellipsis: true,
      className: 'right-to-left',
      render: (item) => {
        const value = item?.value?.paths?.value[0];
        return <HistoryCell item={value}></HistoryCell>;
      },
    },
    {
      title: t('column.host'),
      dataIndex: 'route',
      key: 'host',
      ellipsis: true,
      className: 'right-to-left',
      render: (item) => {
        const value = item?.value?.hosts?.value[0];
        return <HistoryCell item={value}></HistoryCell>;
      },
    },
  ];
}
