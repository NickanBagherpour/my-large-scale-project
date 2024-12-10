import { Button, ColumnsType, Table } from '@oxygen/ui-kit';
import type { Pagination, Service } from '@oxygen/types';
import { TFunction } from 'i18next';
import * as S from '../components/data-table/data-table.style';

type Props = {
  t: TFunction;
  pagination: Pagination;
};

export function getDesktopColumns(props: Props): ColumnsType<Service> {
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
      title: t('table.organization_name'),
      dataIndex: 'organization_name',
      align: 'center',
    },
    {
      title: t('table.client_name'),
      dataIndex: 'client_name',
      align: 'center',
    },
    {
      title: t('table.status'),
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: t('table.registration_date'),
      dataIndex: 'registration_date',
      align: 'center',
    },
    {
      title: t('table.requested_service_count'),
      dataIndex: 'requested_service_count',
      align: 'center',
    },
    {
      title: t('table.companyRepresentativeName'),
      dataIndex: 'companyRepresentativeName',
      align: 'center',
    },
    {
      width: '11.8rem',
      key: 'details',
      render: () => (
        <Button variant={'text'} href={'scope-information?id=test'} color={'primary'}>
          {t('table.details')}
        </Button>
      ),
    },
  ];
}

export function getMobileColumns(props: Props) {
  const {
    t,
    pagination: { page, rowsPerPage },
  } = props;
  return [
    {
      title: '',
      key: 'mobile-columns',
      render: ({
        index,
        organization_name,
        client_name,
        status,
        registration_date,
        requested_service_count,
        companyRepresentativeName,
      }) => {
        const data = [
          { title: t('table.index'), value: index },
          { title: t('table.organization_name'), value: organization_name },
          { title: t('table.client_name'), value: client_name },
          { title: t('table.status'), value: status },
          { title: t('table.registration_date'), value: registration_date },
          { title: t('table.requested_service_count'), value: requested_service_count },
          { title: t('table.companyRepresentativeName'), value: companyRepresentativeName },
          {
            title: t('table.details'),
            value: (
              <Button className={'item__btn'} href={'scope-information?id=test'} variant={'text'} color={'primary'}>
                {t('table.details')}
              </Button>
            ),
          },
        ];
        return (
          <S.TableRow>
            {data.map((item, idx) => (
              <Table.MobileColumn key={idx} {...item} />
            ))}
          </S.TableRow>
        );
      },
    },
  ];
}
