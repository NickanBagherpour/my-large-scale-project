import { useTr } from '@oxygen/translation';
import { Box, ColumnsType, Input, Table } from '@oxygen/ui-kit';
import * as S from './scope-library.style';
import { useGetScopes } from '../../services';
import { Pagination, Scope } from '@oxygen/types';
import { useState } from 'react';
import { type TablePaginationConfig } from 'antd';

type Props = {
  closeDrawer: () => void;
};

export default function ScopeLibrary(props: Props) {
  const { closeDrawer } = props;
  const [t] = useTr();
  const [selectedScope, setSelectedScope] = useState<Scope | null>(null);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, rowsPerPage: 5 });
  const { page, rowsPerPage } = pagination;
  const { data, isFetching } = useGetScopes(pagination);

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
    closeDrawer();
  };

  const desktopColumns: ColumnsType<Scope> = [
    {
      title: t('choose'),
      key: 'choose',
      align: 'center',
      render: (scope) => <S.Radio checked={selectedScope?.idx === scope.idx} />,
    },
    {
      title: t('scope_name'),
      dataIndex: 'scopeName',
      align: 'center',
    },
    {
      title: t('persian_name'),
      dataIndex: 'persianName',
      align: 'center',
    },
  ];

  const mobileColumns: ColumnsType<Scope> = [
    {
      title: null,
      key: 'mobileColumn',
      render: (scope: Scope) => {
        const { persianName, scopeName, idx } = scope;
        return (
          <Box flexDirection='column'>
            <Table.MobileColumn title={t('choose')} value={<S.Radio checked={selectedScope?.idx === idx} />} />
            {/* Use 'px' units for min-height to ensure consistency with the 22px height of the first row, as 'rem' units vary across screen sizes */}
            <Table.MobileColumn minHeight={'22px'} title={t('persian_name')} value={persianName} />
            <Table.MobileColumn minHeight={'22px'} title={t('scope_name')} value={scopeName} />
          </Box>
        );
      },
    },
  ];

  return (
    <S.Form layout={'vertical'}>
      <S.FormItem label={t('search')} namnee='search'>
        <Input placeholder={t('persian_or_english_name')} prefix={<i className='icon-search-normal' />} />
      </S.FormItem>
      <S.Table
        dataSource={data?.items}
        loading={isFetching}
        columns={desktopColumns}
        mobileColumns={mobileColumns}
        current={page}
        total={data?.total}
        pagination={{ pageSize: rowsPerPage }}
        onChange={changePage}
        onRow={(scope) => ({
          onClick() {
            setSelectedScope(scope);
          },
        })}
      />
      <S.Button onClick={addScope} disabled={!selectedScope} color='primary'>
        {t('add')}
      </S.Button>
    </S.Form>
  );
}
