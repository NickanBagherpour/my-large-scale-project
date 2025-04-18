import { type ColumnsType, Table, Tooltip } from '@oxygen/ui-kit';
import { type TFunction } from 'i18next';
import { type InfoData } from '../types';
import { getValueOrDash } from '@oxygen/utils';

type Props = {
  t: TFunction;
  size: number;
  page: number;
};

export const getDesktopColumns = (props: Props): ColumnsType<InfoData['clientDataList'][number]> => {
  const { t, size, page } = props;
  return [
    {
      title: t('common.index'),
      dataIndex: 'index',
      width: '8rem',
      render: (_val, _record, index) => {
        const start = (page - 1) * size + 1;
        return start + index;
      },
    },
    {
      title: t('client'),
      dataIndex: 'name',
      render: (name) => {
        const value = getValueOrDash(name);
        return <Tooltip title={value}>{value}</Tooltip>;
      },
    },
    {
      title: t('national_id'),
      dataIndex: 'nationalCode',
      render: (id) => {
        const value = getValueOrDash(id);
        return <Tooltip title={value}>{value}</Tooltip>;
      },
    },
  ];
};

export const getMobileColumns = (props: { t: TFunction }) => {
  const { t } = props;

  return [
    {
      title: '',
      key: 'mobile-columns',
      render(record: InfoData['clientDataList'][number]) {
        const data = [
          {
            title: t('client'),
            value: record.name,
          },
          {
            title: t('national_id'),
            value: record.nationalCode,
          },
        ];

        /* using rem to have a constant height acorss all user devices */
        return <Table.MobileColumns columns={data} minHeight={'40px'} />;
      },
    },
  ];
};
