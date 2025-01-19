import { useState, useEffect } from 'react';
import * as S from './scope-list.style';
import { useTr } from '@oxygen/translation';
import { useSearchParams } from 'next/navigation';
import { Nullable } from '@oxygen/types';
import { Box as UiKitBox, type ColumnsType, Table } from '@oxygen/ui-kit';
import { useGetServiceScope } from '../../services';
import { type Scope as ScopeType } from '../../types';

export default function Scope() {
  const [t] = useTr();
  const searchParams = useSearchParams();
  const servicename: Nullable<string> = searchParams.get('servicename');

  const { data: serviceScope } = useGetServiceScope(servicename);
  const [tableData, setTableData] = useState<ScopeType[]>([]);

  useEffect(() => {
    if (serviceScope) {
      const formattedData = Array.isArray(serviceScope.data) ? serviceScope.data : [serviceScope]; // Ensure it's an array
      setTableData(formattedData);
    }
  }, [serviceScope]);

  const desktopColumns: ColumnsType<ScopeType> = [
    {
      title: t('common.row_number'),
      key: 'rowNumber',
      align: 'center',
      render: (_val, _record, idx) => idx + 1,
    },
    {
      title: t('scope_english_name'),
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: t('scope_persian_name'),
      dataIndex: 'description',
      align: 'center',
      render: (description) => (description ? description : '-'),
    },
  ];

  const mobileColumns: ColumnsType<ScopeType> = [
    {
      title: null,
      key: 'mobileColumn',
      render: (scope: ScopeType) => (
        <UiKitBox flexDirection='column'>
          <Table.MobileColumn minHeight={'40px'} title={t('scope_english_name')} value={scope?.name} />
          <Table.MobileColumn minHeight={'40px'} title={t('scope_persian_name')} value={scope?.description || '-'} />
        </UiKitBox>
      ),
    },
  ];

  return (
    <>
      <h3>{t('scope')}</h3>

      <S.Table
        columns={desktopColumns}
        mobileColumns={mobileColumns}
        dataSource={tableData}
        rowKey={(row) => row?.id || 'defaultKey'}
        pagination={false}
      />
    </>
  );
}
