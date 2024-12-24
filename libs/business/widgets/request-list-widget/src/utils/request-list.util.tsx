import { Button, ColumnsType, Table } from '@oxygen/ui-kit';
import type { Pagination, Service } from '@oxygen/types';
import { ROUTES } from '@oxygen/utils';
import { TFunction } from 'i18next';
import * as S from '../components/data-table/data-table.style';
import { statusBadgeRenderer } from './status-badge.util';

type Props = {
  t: TFunction;
  pagination: Pagination;
  clientStatus: string;
};

export function getDesktopColumns(props: Props): ColumnsType<Service> {
  const {
    t,
    pagination: { page, rowsPerPage },
    clientStatus,
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
      render: (item) => statusBadgeRenderer(item, clientStatus, t),
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
      render: (item) => {
        const colorButton = item.uploaded ? 'secondary' : 'primary';
        return (
          <Button variant={'text'} className={colorButton} href={ROUTES.BUSINESS.REQUEST_ID} color={colorButton}>
            <i className={'icon-document'} />
            {t('table.details')}
          </Button>
        );
      },
    },
  ];
}

export function getMobileColumns(props: Props) {
  const { t, clientStatus } = props;
  return [
    {
      title: '',
      key: 'mobile-columns',
      render: ({
        organization_name,
        client_name,
        status,
        registration_date,
        requested_service_count,
        companyRepresentativeName,
        uploaded,
      }) => {
        const data = [
          { title: t('table.organization_name'), value: organization_name },
          { title: t('table.client_name'), value: client_name },
          { title: t('table.status'), value: statusBadgeRenderer(status, clientStatus, t) },
          { title: t('table.registration_date'), value: registration_date },
          { title: t('table.requested_service_count'), value: requested_service_count },
          { title: t('table.companyRepresentativeName'), value: companyRepresentativeName },
          {
            title: t('table.details'),
            value: (
              <Button
                className={uploaded ? 'secondary' : 'primary'}
                href={ROUTES.BUSINESS.REQUEST_ID}
                variant={'text'}
                color={uploaded ? 'secondary' : 'primary'}
              >
                <i className={'icon-document'} />
                {t('table.details')}
              </Button>
            ),
          },
        ];
        return (
          <S.TableRow>
            {data.map((item, idx) => (
              <Table.MobileColumn minHeight={'40px'} key={idx} {...item} />
            ))}
          </S.TableRow>
        );
      },
    },
  ];
}
