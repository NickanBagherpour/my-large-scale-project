import { MobileColumnType, Table, Tooltip } from '@oxygen/ui-kit';
import { CONSTANTS, getValueOrDash } from '@oxygen/utils';
import * as S from '../components/table-container/table-container.style';

export type TableColumnsPropsType = {
  t: any;
  pagination: any;
  setModalIsOpen: any;
};
export const getDesktopColumns = (props: TableColumnsPropsType) => {
  const { t, pagination, setModalIsOpen } = props;
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
        const start = (page - 1) * size + 1;
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
        return (
          <S.CustomeSelect
            options={statusOptions}
            value={_val?.isCommercial ? statusOptions[0] : statusOptions[1]}
            size='middle'
            onSelect={() => console.log('selected')}
            onChange={() => {
              setModalIsOpen(_val);
            }}
            $isCommercial={_val.isCommercial}
          />
        );
      },
    },
  ];
};
export const getMobileColumns = (props: TableColumnsPropsType) => {
  const { t, pagination, setModalIsOpen } = props;

  const statusOptions = [
    { value: 'true', label: t('chips.commercial') },
    { value: 'false', label: t('chips.noncommercial') },
  ];

  return [
    {
      title: '',
      dataIndex: '',
      render: (_val, record, index) => {
        const columns: MobileColumnType[] = [
          {
            title: t('field.service_fa_name'),
            value: `${getValueOrDash(_val.persianName)}`,
          },
          {
            title: t('field.service_en_name'),
            value: `${getValueOrDash(_val.name)}`,
          },
          {
            title: t('commercialization_status'),
            value: (
              <S.CustomeSelect
                options={statusOptions}
                value={_val?.isCommercial ? statusOptions[0] : statusOptions[1]}
                size='middle'
                onSelect={() => console.log('selected')}
                onChange={() => {
                  setModalIsOpen(_val);
                }}
                $isCommercial={_val.isCommercial}
              />
            ),
            colon: false,
          },
        ];
        return <Table.MobileColumns columns={columns} minHeight={'4rem'} />;
      },
    },
  ];
};
