import { TFunction } from 'i18next';

import { ColumnsType, Table, Tooltip } from '@oxygen/ui-kit';
import { Pagination } from '@oxygen/types';
import { getValueOrDash } from '@oxygen/utils';

import * as S from '../components/data-table/data-table.style';

type Props = {
  t: TFunction;
  pagination: Pagination;
  handleApi: (serviceName: string, serviceId: number) => void;
};

export function getDesktopColumns(props: Props): ColumnsType<any> {
  const {
    t,
    pagination: { page, rowsPerPage },
    handleApi,
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
      dataIndex: 'name',
      render: (value) => {
        return <Tooltip title={value}>{value}</Tooltip>;
      },
    },
    {
      title: t('table.persian_name'),
      dataIndex: 'persianName',
      render: (value) => {
        return <Tooltip title={value}>{value}</Tooltip>;
      },
    },
    {
      width: '11.8rem',
      key: 'details',
      ellipsis: false,
      render: (_val, _record, index) => {
        return (
          <S.Button
            variant={'link'}
            color={'error'}
            className={'table_button'}
            onClick={() => handleApi(_record.name, _record.id)}
          >
            <i className={'icon-trash icon-remove'}></i>
          </S.Button>
        );
      },
    },
  ];
}

export function getMobileColumns(props: Props) {
  const { t, handleApi } = props;

  return [
    {
      title: '',
      key: 'mobile-columns',
      render: ({ id, name, persianName }) => {
        const data = [
          { title: t('table.service_name'), value: getValueOrDash(name) },
          { title: t('table.persian_name'), value: getValueOrDash(persianName) },
          {
            title: t('table.delete_service'),
            value: (
              <S.Button variant={'link'} color={'error'} onClick={() => handleApi(name, id)}>
                <i className={'icon-trash icon-remove'}></i>
              </S.Button>
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
