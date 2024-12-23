import { ColumnsType, PaginationType } from '@oxygen/ui-kit';
import { getValueOrDash } from '@oxygen/utils';
import { TFunction } from 'i18next';

import * as S from '../components/requested-services/requested-services.style';

type Props = {
  t: TFunction;
  pagination: PaginationType;
};

export function getDesktopColumns(props: Props): ColumnsType<any> {
  const {
    t,
    pagination: { page, rowsPerPage },
  } = props;
  return [
    {
      title: t('table.index'),
      align: 'center',
      key: 'index',
      render: (_val, _record, index) => {
        const start = (page - 1) * rowsPerPage + 1;
        return start + index;
      },
    },
    {
      title: t(`table.service_name`),
      dataIndex: 'serviceName',
      align: 'center',
      width: 'min-content',
      render: (value) => {
        return getValueOrDash(value);
      },
    },
    {
      title: t(`table.persian_name`),
      dataIndex: 'persianName',
      align: 'center',
      width: 'min-content',
      render: (value) => {
        return getValueOrDash(value);
      },
    },
    {
      title: '',
      dataIndex: '',
      align: 'center',
      width: 'min-content',
      render: (value) => {
        return <S.Details>{t('table.details')}</S.Details>;
      },
    },
  ];
}
