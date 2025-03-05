import { TFunction } from 'i18next';

import { ColumnsType, HistoryCell, Tooltip } from '@oxygen/ui-kit';
import { convertShamsiDateFormat, getValueOrDash } from '@oxygen/utils';

import * as S from '../components/data-table/data-table.style';

type Props = {
  t: TFunction;
};

export function getDesktopColumns(props: Props): ColumnsType<any> {
  const { t } = props;

  return [
    {
      title: t('column.edit_date'),
      dataIndex: ['modifyDate', 'value'],
      render: (item) => {
        return (
          <Tooltip title={item}>
            <div>{convertShamsiDateFormat(item, true)}</div>
          </Tooltip>
        );
      },
    },
    {
      title: t('column.user_name'),
      dataIndex: 'userName',
      key: 'userName',
      render: (item) => {
        return (
          <Tooltip title={item.value}>
            <HistoryCell item={item} />
          </Tooltip>
        );
      },
    },
    {
      title: t('column.revision_type'),
      dataIndex: 'revisionDto',
      key: 'actionType',
      render: (value, record) => {
        const variant = value.revType?.code?.value;
        const isDeleted = record?.isDeleted?.value;
        return (
          <Tooltip title={value?.revType?.title?.value}>
            <S.RevisionType variant={variant} isDeleted={isDeleted}>
              {getValueOrDash(value?.revType?.title?.value)}
            </S.RevisionType>
          </Tooltip>
        );
      },
    },
    {
      title: t('column.action'),
      dataIndex: 'route',
      key: 'action',
      className: 'right-to-left',
      render: (item) => {
        const value = item?.methods.value.map((item) => item.title).join(' ,');
        const hasDifference = item?.methods.hasDifference;
        return (
          <Tooltip title={value}>
            <HistoryCell item={{ value, hasDifference }} />
          </Tooltip>
        );
      },
    },
    {
      title: t('column.protocol'),
      dataIndex: 'route',
      key: 'protocols',
      render: (item) => {
        const value = item?.protocols.value.map((item) => item.title).join(' ,');
        const hasDifference = item?.protocols.hasDifference;
        return (
          <Tooltip title={value}>
            <HistoryCell item={{ value, hasDifference }} />
          </Tooltip>
        );
      },
    },
    {
      title: t('column.path'),
      dataIndex: 'route',
      key: 'paths',
      className: 'right-to-left',
      render: (item) => {
        const value = item?.paths.value.join(',');
        const hasDifference = item?.paths.hasDifference;
        return (
          <Tooltip title={value}>
            <HistoryCell item={{ value, hasDifference }} />
          </Tooltip>
        );
      },
    },
    {
      title: t('column.host'),
      dataIndex: 'route',
      key: 'host',
      className: 'right-to-left',
      render: (item) => {
        const value = item?.hosts.value.join(' ,');
        const hasDifference = item?.hosts.hasDifference;
        return (
          <Tooltip title={value}>
            <HistoryCell item={{ value, hasDifference }} />
          </Tooltip>
        );
      },
    },
  ];
}
