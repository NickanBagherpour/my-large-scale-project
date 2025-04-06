import { Tooltip } from '@oxygen/ui-kit';
import { CONSTANTS, getValueOrDash } from '@oxygen/utils';

export type TableColumnsPropsType = {
  t: any;
  data?: any[];
  pagination: any;
};

export const getDesktopColumns = (props: TableColumnsPropsType) => {
  const { t, pagination } = props;
  const { page, rowsPerPage } = pagination;
  return [
    {
      title: t('common.row_number'),
      key: 'index',
      width: CONSTANTS.ROW_INDEX_WIDTH,
      render: (_val, _record, index) => {
        const start = (page - 1) * rowsPerPage + 1;
        return start + index;
      },
    },
    {
      title: t('field.service_fa_name'),
      dataIndex: 'name',
      key: 'name',
      render: (value) => (
        <Tooltip placement='top' title={getValueOrDash(value)}>
          {`${getValueOrDash(value)}`}
        </Tooltip>
      ),
    },
    {
      title: t('field.service_en_name'),
      dataIndex: 'name',
      key: 'name',
      render: (value) => (
        <Tooltip placement='top' title={getValueOrDash(value)}>
          {`${getValueOrDash(value)}`}
        </Tooltip>
      ),
    },
    {
      title: t('commercialization_status'),
      width: '20rem',
      ellipsis: false,
      render: () => <a>Delete</a>,
    },
  ];
};
// export const getMobileColumns = (props: TableColumnsPropsType) => {};
