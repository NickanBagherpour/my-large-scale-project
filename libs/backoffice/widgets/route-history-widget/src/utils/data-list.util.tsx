import { TFunction } from 'i18next';

import { ColumnsType, HistoryCell } from '@oxygen/ui-kit';
import { getValueOrDash } from '@oxygen/utils';
import * as S from '../components/data-table/data-table.style';

type Props = {
  t: TFunction;
};

export function getDesktopColumns(props: Props): ColumnsType<any> {
  const { t } = props;

  return [
    {
      title: t('field.edit_date'),
      dataIndex: 'modifyDate',
      render: (item) => {
        return <div>{getValueOrDash(item?.value)}</div>;
      },
    },
    {
      title: t('field.user_name'),
      dataIndex: 'modifyBy',
      key: 'modifyBy',
      ellipsis: true,
      render: (item) => {
        return <HistoryCell item={item} />;
      },
    },
    {
      title: t('field.revision_type'),
      dataIndex: 'revisionDto',
      align: 'center',
      width: 'min-content',
      render: (_value, record) => {
        const variant = record?.revisionDto?.revType?.code?.value;
        const isDeleted = record?.deleted?.value;
        return (
          <S.RevisionType variant={variant} isDeleted={isDeleted}>
            {getValueOrDash(record?.revisionDto?.revType?.title?.value)}
          </S.RevisionType>
        );
      },
    },
    {
      title: t('field.method'),
      dataIndex: 'route',
      key: 'hosts',
      ellipsis: true,
      className: 'right-to-left',
      render: (item) => {
        const value = item?.hosts?.value?.join(' ,');
        const hasDifference = item?.hosts?.hasDifference;
        return <HistoryCell item={{ value, hasDifference }} />;
      },
    },
    {
      title: t('field.protocol'),
      dataIndex: 'route',
      key: 'hosts',
      ellipsis: true,
      className: 'right-to-left',
      render: (item) => {
        const value = item?.hosts?.value?.join(' ,');
        const hasDifference = item?.hosts?.hasDifference;
        return <HistoryCell item={{ value, hasDifference }} />;
      },
    },
    {
      title: t('field.path'),
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
      title: t('field.host'),
      dataIndex: 'route',
      key: 'methods',
      ellipsis: true,
      className: 'right-to-left',
      render: (item) => {
        const value = Array.isArray(item?.methods?.value)
          ? item.methods.value.map((method) => method.title).join(' , ')
          : '-';

        const hasDifference = item?.methods?.hasDifference ?? false;

        return <HistoryCell item={{ value, hasDifference }} />;
      },
    },
  ];
}
