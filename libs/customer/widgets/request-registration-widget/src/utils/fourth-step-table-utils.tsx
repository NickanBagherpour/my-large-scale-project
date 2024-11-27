import { ColumnsType, Table } from '@oxygen/ui-kit';
import { getValueOrDash } from '@oxygen/utils';
import * as S from '../components/fourth-step/fourth-step.style';
import type { Service } from '@oxygen/types';
import Link from 'next/link';
import { TFunction } from 'i18next';
type Props = {
  t: TFunction;
};
export function getDesktopColumns(props: Props): ColumnsType<Service> {
  const { t } = props;

  return [
    {
      title: t('table_header.row'),
      align: 'center',
      key: 'index',
      width: '5rem',
      render: (_val, _record, index) => {
        const start = 1;
        return start + index;
      },
    },
    {
      title: t('table_header.name'),
      dataIndex: 'serviceName',
      align: 'center',
      render: (serviceName) => getValueOrDash(serviceName),
    },
    {
      title: t('table_header.persian_name'),
      dataIndex: 'persianName',
      align: 'center',
      render: (persianName) => getValueOrDash(persianName),
    },
    {
      title: '',
      dataIndex: 'details',
      key: 'details',
      render: (url) => <S.Details href=''>{t('detailed')}</S.Details>,
    },
  ];
}

export function getMobileColumns(props) {
  const { t } = props;

  return [
    {
      title: '',
      key: 'mobile-columns',
      render({ scope, url, version, persianName, serviceName }: Service) {
        const data = [
          { title: t('table_header.name'), value: serviceName, render: (serviceName) => getValueOrDash(serviceName) },
          {
            title: t('table_header.persian_name'),
            value: persianName,
            render: (persianName) => getValueOrDash(persianName),
          },
        ];
        return <Table.MobileColumns columns={data} minHeight={'44px'}></Table.MobileColumns>;
      },
    },
  ];
}
