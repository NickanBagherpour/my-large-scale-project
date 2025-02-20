import { TFunction } from 'i18next';

import { ColumnsType, HistoryCell } from '@oxygen/ui-kit';
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
      dataIndex: 'modifyDate',
      render: (item) => {
        return <div>{convertShamsiDateFormat(item?.value)}</div>;
      },
    },
    {
      title: t('column.user_name'),
      dataIndex: 'userName',
      key: 'userName',
      ellipsis: true,
      render: (item) => {
        return <HistoryCell item={item} />;
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
          <S.RevisionType variant={variant} isDeleted={isDeleted}>
            {getValueOrDash(value?.revType?.title?.value)}
          </S.RevisionType>
        );
      },
    },
    {
      title: t('column.action'),
      dataIndex: 'route',
      key: 'action',
      ellipsis: true,
      className: 'right-to-left',
      render: (item) => {
        const value = item?.methods.value.map((item) => item.title).join(' ,');
        const hasDifference = item?.methods.hasDifference;
        return <HistoryCell item={{ value, hasDifference }} />;
      },
    },
    {
      title: t('column.path'),
      dataIndex: 'route',
      key: 'paths',
      ellipsis: true,
      className: 'right-to-left',
      render: (item) => {
        const value = item?.paths.value.join(' ,');
        const hasDifference = item?.paths.hasDifference;
        return <HistoryCell item={{ value, hasDifference }} />;
      },
    },
    {
      title: t('column.host'),
      dataIndex: 'route',
      key: 'host',
      ellipsis: true,
      className: 'right-to-left',
      render: (item) => {
        const value = item?.hosts.value.join(' ,');
        const hasDifference = item?.hosts.hasDifference;
        return <HistoryCell item={{ value, hasDifference }} />;
      },
    },
  ];
}
