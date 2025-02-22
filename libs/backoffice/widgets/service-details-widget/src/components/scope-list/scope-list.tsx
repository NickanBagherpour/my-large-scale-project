import { useSearchParams } from 'next/navigation';

import { useTr } from '@oxygen/translation';
import { Nullable } from '@oxygen/types';
import { CONSTANTS, getValueOrDash } from '@oxygen/utils';
import { Box as UiKitBox, type ColumnsType, Table } from '@oxygen/ui-kit';

import { useGetServiceScope } from '../../services';
import { type Scope as ScopeType } from '../../types';

import * as S from './scope-list.style';

export default function Scope() {
  const [t] = useTr();
  const searchParams = useSearchParams();
  const serviceName: Nullable<string> = searchParams.get('servicename');

  const { data: serviceScope } = useGetServiceScope(serviceName);

  const desktopColumns: ColumnsType<ScopeType> = [
    {
      title: t('common.row_number'),
      key: 'rowNumber',
      align: 'center',
      width: CONSTANTS.ROW_INDEX_WIDTH,
      render: (_val, _record, idx) => idx + 1,
    },
    {
      title: t('scope_english_name'),
      dataIndex: 'name',
      align: 'center',
      ellipsis: true,
      render: (name) => getValueOrDash(name),
    },
    {
      title: t('scope_persian_name'),
      dataIndex: 'description',
      align: 'center',
      ellipsis: true,
      render: (description) => getValueOrDash(description),
    },
  ];

  const mobileColumns: ColumnsType<ScopeType> = [
    {
      title: null,
      key: 'mobileColumn',
      render: (scope: ScopeType) => (
        <UiKitBox flexDirection='column'>
          <Table.MobileColumn minHeight={'40px'} title={t('scope_english_name')} value={getValueOrDash(scope?.name)} />
          <Table.MobileColumn
            minHeight={'40px'}
            title={t('scope_persian_name')}
            value={getValueOrDash(scope?.description)}
          />
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
        dataSource={serviceScope}
        rowKey={(row) => row?.id || 'defaultKey'}
        pagination={false}
      />
    </>
  );
}
