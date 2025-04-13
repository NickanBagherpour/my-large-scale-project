import { Tooltip } from '@oxygen/ui-kit';
import { CONSTANTS, getValueOrDash } from '@oxygen/utils';
import * as S from '../components/table-container/table-container.style';
import { TableResponseType } from '../types';
import { Nullable } from '@oxygen/types';
export type TableColumnsPropsType = {
  t: any;
  data?: Nullable<TableResponseType>;
  pagination: any;
};
export const getDesktopColumns = (props: TableColumnsPropsType) => {
  console.log('props', props);
  const { t, pagination } = props;
  const statusOptions = [
    { value: 'true', label: t('chips.commercial') },
    { value: 'false', label: t('chips.noncommercial') },
  ];
  const { page, size } = pagination;
  return [
    {
      title: t('common.row_number'),
      key: 'index',
      width: CONSTANTS.ROW_INDEX_WIDTH,
      render: (_val, _record, index) => {
        const start = page * size + 1;
        return start + index;
      },
    },
    {
      title: t('field.service_fa_name'),
      dataIndex: 'persianName',
      key: 'persianName',
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
      render: (_val, _record) => {
        console.log('_val', _val);
        return (
          <S.CustomeSelect
            options={statusOptions}
            defaultValue={_val.isCommercial ? statusOptions[0] : statusOptions[1]}
            size='middle'
            onChange={() => {
              console.log('clicked');
            }}
            $isCommercial={_val.isCommercial}
          />
        );
      },
    },
  ];
};
// export const getMobileColumns = (props: TableColumnsPropsType) => {};
