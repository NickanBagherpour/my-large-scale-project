import { useTr } from '@oxygen/translation';
import { Box, ColumnsType, Input, Table } from '@oxygen/ui-kit';
import * as S from './scope-library.style';
import { useGetScopes } from '../../services';
import { useState } from 'react';
import { type TablePaginationConfig } from 'antd';
import { Scope } from '../../types';
import { getValueOrDash } from '@oxygen/utils';

type Props = {
  closeDrawer: () => void;
  selectScope: (scope: Scope) => void;
};

type Pagination = {
  page: number;
  rowsPerPage: number;
};

export default function ScopeLibrary(props: Props) {
  const { closeDrawer, selectScope } = props;
  const [t] = useTr();
  const [{ page, rowsPerPage }, setPagination] = useState<Pagination>({ page: 1, rowsPerPage: 5 });
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isFetching } = useGetScopes({
    sort: 'asc',
    page: page - 1,
    size: rowsPerPage,
    'scope-name': searchTerm,
  });
  const [selectedRow, setSelectedRow] = useState<null | Scope>(null);

  const changePage = async (currentPagination: TablePaginationConfig) => {
    const { pageSize, current } = currentPagination;
    if (pageSize && current) {
      setPagination({
        page: pageSize === rowsPerPage ? current : 1,
        rowsPerPage: pageSize,
      });
    }
  };

  const addScope = () => {
    if (selectedRow) {
      selectScope(selectedRow);
    }
    closeDrawer();
  };

  const desktopColumns: ColumnsType<Scope> = [
    {
      title: t('choose'),
      key: 'choose',
      align: 'center',
      render: (scope) => <S.Radio checked={selectedRow?.name === scope.name} />,
    },
    {
      title: t('scope_name'),
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: t('persian_name'),
      dataIndex: 'description',
      align: 'center',
      render: (value) => getValueOrDash(value),
    },
  ];

  const mobileColumns: ColumnsType<Scope> = [
    {
      title: null,
      key: 'mobileColumn',
      render: (scope: Scope) => {
        const { name, description } = scope;
        return (
          <Box flexDirection='column'>
            <Table.MobileColumn title={t('choose')} value={<S.Radio checked={selectedRow?.name === name} />} />
            {/* Use 'px' units for min-height to ensure consistency with the 22px height of the first row, as 'rem' units vary across screen sizes */}
            <Table.MobileColumn minHeight={'22px'} title={t('persian_name')} value={description} />
            <Table.MobileColumn minHeight={'22px'} title={t('scope_name')} value={name} />
          </Box>
        );
      },
    },
  ];

  return (
    <>
      <S.FormItem label={t('search')} namne='search'>
        <Input
          value={searchTerm}
          placeholder={t('persian_or_english_name')}
          prefix={<i className='icon-search-normal' />}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </S.FormItem>

      <S.Table
        dataSource={data?.content}
        loading={isFetching}
        columns={desktopColumns}
        mobileColumns={mobileColumns}
        current={page}
        total={data?.totalElements}
        pagination={{ pageSize: rowsPerPage }}
        onChange={changePage}
        rowKey={(row) => row.idx}
        onRow={(scope) => ({
          onClick() {
            setSelectedRow(scope);
          },
        })}
      />
      <S.Button onClick={addScope} disabled={!selectedRow} color='primary'>
        {t('add')}
      </S.Button>
    </>
  );
}
