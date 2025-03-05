import { useSearchParams } from 'next/navigation';

import { Tooltip } from 'antd';

import { useTr } from '@oxygen/translation';
import { Nullable } from '@oxygen/types';
import { CONSTANTS, getValueOrDash } from '@oxygen/utils';
import { Box as UiKitBox, type ColumnsType, Table } from '@oxygen/ui-kit';

import { CaptionWrapper } from '../app/app.style';
import { useGetServiceScope } from '../../services';
import { type Scope as ScopeType } from '../../types';

export default function Scope() {
  const [t] = useTr();
  const searchParams = useSearchParams();
  const serviceName: Nullable<string> = searchParams.get('servicename');

  const { data: serviceScope, isFetching } = useGetServiceScope(serviceName);

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
      render: (name) => (
        <Tooltip placement='top' title={getValueOrDash(name)} arrow={true}>
          {getValueOrDash(name)}
        </Tooltip>
      ),
    },
    {
      title: t('scope_persian_name'),
      dataIndex: 'description',
      align: 'center',
      render: (description) => (
        <Tooltip placement='top' title={getValueOrDash(description)} arrow={true}>
          {getValueOrDash(description)}
        </Tooltip>
      ),
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
      <CaptionWrapper>
        <p>{t('scope')}</p>
      </CaptionWrapper>
      <Table
        // title={t('scope')}
        loading={isFetching}
        columns={desktopColumns}
        mobileColumns={mobileColumns}
        dataSource={serviceScope}
        rowKey={(row) => row?.id || 'defaultKey'}
        pagination={false}
      />
    </>
  );
}
