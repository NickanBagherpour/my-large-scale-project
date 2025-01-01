import { Button, ColumnsType, Table } from '@oxygen/ui-kit';
import { Pagination } from '@oxygen/types';
import { getValueOrDash, ROUTES } from '@oxygen/utils';
import { TFunction } from 'i18next';
import * as S from '../components/data-table/data-table.style';

type Props = {
  t: TFunction;
  pagination: Pagination;
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
      title: t('table.service_name'),
      dataIndex: 'serviceName',
      align: 'center',
    },
    {
      title: t('table.persian_name'),
      dataIndex: 'clientName',
      align: 'center',
    },
    {
      width: '11.8rem',
      key: 'details',
      render: (item, record) => {
        // const isApproved = record?.submissionStatus?.code === BusinessStatusBadge.APPROVED_BY_BUSINESS_UNIT;
        // const colorButton = isApproved ? 'secondary' : 'primary';
        return (
          <Button
            variant={'text'}
            // className={colorButton}
            href={`${ROUTES.BUSINESS.REQUEST_DETAILS}?requestId=${record?.requestId}`}
            // color={colorButton}
          >
            asdflkj
          </Button>
        );
      },
    },
  ];
}

export function getMobileColumns(props: Props) {
  const { t } = props;

  return [
    {
      title: '',
      key: 'mobile-columns',
      render: ({
        organizationName,
        clientName,
        submissionStatus,
        createDate,
        requestId,
        serviceCount,
        representative,
      }) => {
        // const isApproved = submissionStatus?.code === BusinessStatusBadge.APPROVED_BY_BUSINESS_UNIT;
        // const colorButton = isApproved ? 'secondary' : 'primary';

        const data = [
          { title: t('table.service_name'), value: getValueOrDash(organizationName) },
          { title: t('table.persian_name'), value: getValueOrDash(clientName) },
          {
            title: t('table.details'),
            value: (
              <Button
                // className={isApproved ? 'secondary' : 'primary'}
                href={`${ROUTES.BUSINESS.REQUEST_DETAILS}?requestId=${requestId}`}
                variant={'text'}
                // color={colorButton}
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
