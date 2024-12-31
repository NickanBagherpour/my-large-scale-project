import { useState, useEffect } from 'react';
import { RadioChangeEvent } from 'antd';
import * as S from './scope-list.style';
import { useTr } from '@oxygen/translation';
import { useSearchParams } from 'next/navigation';
// import Footer from './footer/footer';
// import Box from './box/box';
// import ImportFromSso from './import-from-sso/import-from-sso';
import {
  useAppDispatch,
  useAppState,
  updateScopeMode,
  updateUpstreamAction,
  updateScopeAction,
  clearScopeAction,
} from '../../context';
import { type Scope } from '@oxygen/types';
import { Nullable } from '@oxygen/types';

import { Box as UiKitBox, Button, type ColumnsType, Table } from '@oxygen/ui-kit';
// import { Container } from './container/container.style';
import { useGetServiceScope } from '../../services';

import ScopeSelector from './scope-selector/scope-selector';
import { Modal } from '@oxygen/ui-kit';
import RemoveServiceModal from './modals/remove-sevice-modal/remove-service-modal';

export type Modal = {
  details: boolean;
  removeService: boolean;
};

export default function Scope({ updateData }) {
  const [t] = useTr();
  const state = useAppState();
  const dispatch = useAppDispatch();
  const { scopeName } = useAppState();

  useEffect(() => {
    console.log('Global scope name updated:', scopeName);
  }, [scopeName]);
  const [selectedScope, setSelectedScope] = useState<Scope | null>(null);
  const [tableData, setTableData] = useState<Scope[]>([]);
  const searchParams = useSearchParams();
  const servicename: Nullable<string> = searchParams.get('servicename');

  const params = servicename;
  const { data: serviceScope, isFetching: isFetching } = useGetServiceScope(params);
  useEffect(() => {
    const data = Array.isArray(serviceScope?.data) ? serviceScope.data : [];
    setTableData(data);
  }, [serviceScope]);

  const [modals, setModals] = useState<Modal>({
    details: false,
    removeService: false,
  });

  const toggleModal = (modal: keyof Modal) => {
    setModals((prev) => ({ ...prev, [modal]: !prev[modal] }));
  };

  const handleDeleteButton = () => {
    toggleModal('removeService');
  };

  const chooseScope = (scope: Scope) => {
    setSelectedScope(scope); // Update selected scope
    setTableData([scope]); // Update table data
    updateScopeAction(dispatch, scope?.name); // Update global context
  };

  const handleModalDeleteButton = () => {
    setSelectedScope(null); // Clear the selected scope
    clearScopeAction(dispatch); // Update global context
    setTableData([]); // Clear the table data
    toggleModal('removeService');
  };

  const desktopColumns: ColumnsType<Scope> = [
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
    },
    {
      key: 'remove',
      align: 'center',
      render: () => (
        <Button variant='link' color='error' onClick={() => toggleModal('removeService')}>
          <S.TrashIcon className='icon-trash' />
        </Button>
      ),
    },
  ];

  const mobileColumns: ColumnsType<Scope> = [
    {
      title: null,
      key: 'mobileColumn',
      render: () => {
        return (
          <UiKitBox flexDirection='column'>
            <Table.MobileColumn minHeight={'40px'} title={t('scope_english_name')} value={selectedScope?.name} />
            {/* Use 'px' units for min-height to ensure consistency with the 22px height of the first row, as 'rem' units vary across screen sizes */}
            <Table.MobileColumn minHeight={'40px'} title={t('persian_name')} value={selectedScope?.description} />
            <Table.MobileColumn
              minHeight={'40px'}
              title={t('remove')}
              value={
                <Button className='item__btn' variant='link' color='error' onClick={() => toggleModal('removeService')}>
                  <S.TrashIcon className='icon-trash' />
                </Button>
              }
            />
          </UiKitBox>
        );
      },
    },
  ];

  return (
    // <Container>
    <>
      {/* <ImportFromSso selectedScope={selectedScope} chooseScope={chooseScope} /> */}
      <ScopeSelector style={{ flex: 1 }} onSelect={chooseScope} disabled={!!selectedScope} />
      {/* <button onClick={handleSubmit}>Submit Scope</button> */}
      {console.log(serviceScope, 'serviceScope')}
      <S.Table
        columns={desktopColumns}
        mobileColumns={mobileColumns}
        dataSource={Array.isArray(tableData) ? tableData : []} // Ensure dataSource is an array
        rowKey={(row) => row?.idx || 'defaultKey'}
        pagination={false}
      />

      <RemoveServiceModal
        isOpen={modals.removeService}
        deleteToggle={handleModalDeleteButton}
        cancelToggle={() => toggleModal('removeService')}
        id={selectedScope?.name || ''}
      />
    </>
  );
}
