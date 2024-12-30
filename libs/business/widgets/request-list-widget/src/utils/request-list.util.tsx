import { Button, ColumnsType, Table } from '@oxygen/ui-kit';
import { Pagination } from '@oxygen/types';
import { getValueOrDash, ROUTES } from '@oxygen/utils';
import { TFunction } from 'i18next';
import * as S from '../components/data-table/data-table.style';
import { statusBadgeRenderer } from './status-badge.util';
import { BusinessStatusBadge } from './consts';
import { RequestListType } from '../types/common-types';

type Props = {
  t: TFunction;
  pagination: Pagination;
  userRole: string;
};

export function getDesktopColumns(props: Props): ColumnsType<RequestListType> {
  const {
    t,
    pagination: { page, rowsPerPage },
    userRole,
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
      dataIndex: 'organizationName',
      align: 'center',
      render: (_val, record) => {
        return getValueOrDash(record?.organizationName);
      },
    },
    {
      title: t('table.client_name'),
      dataIndex: 'clientName',
      align: 'center',
      render: (_val, record) => {
        return getValueOrDash(record?.clientName);
      },
    },
    {
      title: t('table.status'),
      dataIndex: 'submissionStatus',
      align: 'center',
      render: (_val, record) => {
        return statusBadgeRenderer(record?.submissionStatus, userRole, t);
      },
    },
    {
      title: t('table.registration_date'),
      dataIndex: 'createDate',
      align: 'center',
      render: (_val, record) => {
        return getValueOrDash(record?.createDate);
      },
    },
    {
      title: t('table.requested_service_count'),
      dataIndex: 'serviceCount',
      align: 'center',
      render: (_val, record) => {
        return getValueOrDash(record?.serviceCount);
      },
    },
    {
      title: t('table.companyRepresentativeName'),
      dataIndex: 'representative',
      align: 'center',
      render: (_val, record) => {
        return getValueOrDash(record?.representative);
      },
    },
    {
      width: '11.8rem',
      key: 'details',
      render: (item, record) => {
        const isApproved = record?.submissionStatus?.code === BusinessStatusBadge.APPROVED_BY_BUSINESS_UNIT;
        const colorButton = isApproved ? 'secondary' : 'primary';
        return (
          <Button
            variant={'text'}
            className={colorButton}
            href={`${ROUTES.BUSINESS.REQUEST_DETAILS}?requestId=${record?.requestId}`}
            color={colorButton}
          >
            <i className={'icon-document'} />
            {t('table.details')}
          </Button>
        );
      },
    },
  ];
}

export function getMobileColumns(props: Props) {
  const { t, userRole } = props;

  return [
    {
      title: '',
      key: 'mobile-columns',
      render: ({ organizationName, clientName, submissionStatus, createDate, serviceCount, representative }) => {
        const isApproved = submissionStatus?.code === BusinessStatusBadge.APPROVED_BY_BUSINESS_UNIT;
        const colorButton = isApproved ? 'secondary' : 'primary';

        const data = [
          { title: t('table.organization_name'), value: getValueOrDash(organizationName) },
          { title: t('table.client_name'), value: getValueOrDash(clientName) },
          { title: t('table.status'), value: statusBadgeRenderer(submissionStatus, userRole, t) },
          { title: t('table.registration_date'), value: getValueOrDash(createDate) },
          { title: t('table.requested_service_count'), value: getValueOrDash(serviceCount) },
          { title: t('table.companyRepresentativeName'), value: getValueOrDash(representative) },
          {
            title: t('table.details'),
            value: (
              <Button
                className={isApproved ? 'secondary' : 'primary'}
                href={`${ROUTES.BUSINESS.REQUEST_DETAILS}?requestId=123`}
                variant={'text'}
                color={colorButton}
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
