import { Tooltip } from '@oxygen/ui-kit';
import { CONSTANTS, getValueOrDash } from '@oxygen/utils';
import * as S from '../components/table-container/table-container.style';
export type TableColumnsPropsType = {
  t: any;
  data?: any[];
  pagination: any;
};
export const getDesktopColumns = (props: TableColumnsPropsType) => {
  const { t, pagination } = props;
  const statusOptions = [
    { value: 'true', label: t('chips.commercial') },
    { value: 'false', label: t('chips.noncommercial') },
  ];
  const { page, limit } = pagination;
  return [
    {
      title: t('common.row_number'),
      key: 'index',
      width: CONSTANTS.ROW_INDEX_WIDTH,
      render: (_val, _record, index) => {
        const start = page * limit + 1;
        return start + index;
      },
    },
    {
      title: t('field.service_fa_name'),
      dataIndex: 'key',
      key: 'key',
      render: (value) => (
        <Tooltip placement='top' title={getValueOrDash(value)}>
          {`${getValueOrDash(value)}`}
        </Tooltip>
      ),
    },
    {
      title: t('field.service_en_name'),
      dataIndex: 'value',
      key: 'value',
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
      render: (_val, _record) => {
        return (
          <S.CustomeSelect
            options={statusOptions}
            defaultValue={_val.isComertial ? statusOptions[0] : statusOptions[1]}
            size='middle'
            onChange={() => {
              console.log('clicked');
            }}
            $isComertial={_val.isComertial}
          />
        );
      },
    },
  ];
};
// export const getMobileColumns = (props: TableColumnsPropsType) => {};
