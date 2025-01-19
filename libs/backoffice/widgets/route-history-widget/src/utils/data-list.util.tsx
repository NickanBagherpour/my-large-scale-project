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
      key: 'method',
      ellipsis: true,
      className: 'right-to-left',
      render: (item) => {
        return <HistoryCell item={item.value.method.value.title}></HistoryCell>;
      },
    },
    {
      title: t('column.path'),
      dataIndex: 'route',
      key: 'path',
      ellipsis: true,
      className: 'right-to-left',
      render: (item) => {
        return <HistoryCell item={item.value.path}></HistoryCell>;
      },
    },
    {
      title: t('column.host'),
      dataIndex: 'route',
      key: 'host',
      ellipsis: true,
      className: 'right-to-left',
      render: (item) => {
        return <HistoryCell item={item.value.host}></HistoryCell>;
      },
    },
  ];
}
