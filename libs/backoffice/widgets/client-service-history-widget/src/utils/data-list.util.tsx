import { TFunction } from 'i18next';

import { ColumnsType, HistoryCell } from '@oxygen/ui-kit';

import { convertShamsiDateFormat, getValueOrDash } from '@oxygen/utils';

import * as S from '../components/data-list/data-list.style';

type Props = {
  t: TFunction;
};

export function getDesktopColumns(props: Props): ColumnsType<any> {
  const { t } = props;

  return [
    {
      title: t('table.edit_time'),
      dataIndex: 'clientServiceDto',
      render: (item) => {
        return <div>{convertShamsiDateFormat(item?.modifyDate.value, true)}</div>;
      },
    },
    {
      title: t('table.user_name'),
      dataIndex: 'clientServiceDto',
      key: 'userName',
      ellipsis: true,
      render: (item) => {
        return <HistoryCell item={item?.userName}></HistoryCell>;
      },
    },
    {
      title: t('table.operation_type'),
      dataIndex: 'revisionDto',
      key: 'method',
      ellipsis: true,
      render: (item, record) => {
        const revType = item.revType;

        return (
          <S.OperationTypeStyle variant={revType?.code.value} $isDeleted={record?.clientServiceDto.isDeleted.value}>
            {getValueOrDash(revType?.title.value)}
          </S.OperationTypeStyle>
        );
      },
    },
    {
      title: t('table.service_name'),
      dataIndex: 'clientServiceDto',
      key: 'path',
      ellipsis: true,
      className: 'right-to-left',
      render: (item) => {
        return <HistoryCell item={item?.serviceName}></HistoryCell>;
      },
    },
    {
      title: t('table.persian_service_name'),
      dataIndex: 'clientServiceDto',
      key: 'host',
      ellipsis: true,
      render: (item) => {
        return <HistoryCell item={item?.persianServiceName}></HistoryCell>;
      },
    },
  ];
}
