import { TFunction } from 'i18next';

import { ColumnsType, Table, Tooltip } from '@oxygen/ui-kit';
import { CONSTANTS, getValueOrDash } from '@oxygen/utils';

import { ClientInfo } from '../types';
import { PaginationType } from '../context/types';

type Props = {
  t: TFunction;
  modalTablePagination: Omit<PaginationType, 'sort'>;
};

export function getDesktopColumns(props: Props): ColumnsType<ClientInfo> {
  const {
    t,
    modalTablePagination: { page, rowsPerPage },
  } = props;

  return [
    {
      title: t('uikit.index'),
      align: 'center',
      key: 'index',
      width: CONSTANTS.ROW_INDEX_WIDTH,
      render: (_val, _record, index) => {
        const start = page * rowsPerPage + 1;
        return start + index;
      },
    },
    {
      title: t('table.client_name'),
      dataIndex: 'clientName',
      align: 'center',
      render: (name) => (
        <Tooltip placement='top' title={getValueOrDash(name)} arrow={true}>
          {getValueOrDash(name)}
        </Tooltip>
      ),
    },
    {
      title: t('table.client_persian_name'),
      dataIndex: 'clientPersianName',
      align: 'center',
      render: (persianName) => (
        <Tooltip placement='top' title={getValueOrDash(persianName)} arrow={true}>
          {getValueOrDash(persianName)}
        </Tooltip>
      ),
    },
  ];
}

export function getMobileColumns(props: Props) {
  const { t } = props;
  return [
    {
      title: '',
      key: 'mobile-columns',
      render(client) {
        const { clientPersianName, clientName } = client;
        const data = [
          { title: t('table.client_name'), value: clientName },
          { title: t('table.client_persian_name'), value: clientPersianName },
        ];
        return <Table.MobileColumns columns={data} minHeight={'40px'} />;
      },
    },
  ];
}
