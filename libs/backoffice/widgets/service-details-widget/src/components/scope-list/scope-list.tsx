import { useState, useEffect } from 'react';
import * as S from './scope-list.style';
import { useTr } from '@oxygen/translation';
import { useSearchParams } from 'next/navigation';
import { useAppDispatch, clearScopeAction, useAppState } from '../../context';
import { type Scope } from '@oxygen/types';
import { Nullable } from '@oxygen/types';
import { Box as UiKitBox, Button, type ColumnsType, Table } from '@oxygen/ui-kit';
import {
  useGetServiceScope,
  usePostAssignScopeToService,
  useDeleteServiceScope,
  useAddServiceScope,
} from '../../services';
import { type Scope as ScopeType } from '../../types';
import ScopeSelector from './scope-selector/scope-selector';
import RemoveServiceModal from './modals/remove-sevice-modal/remove-service-modal';

export default function Scope() {
  const [t] = useTr();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const servicename: Nullable<string> = searchParams.get('servicename');
  const { serviceName } = useAppState();

  // Fetch service scope data
  const { data: serviceScope, isFetching } = useGetServiceScope(servicename);
  const { mutate: assignScopeToService, isPending: isAssigningScopeToService } = usePostAssignScopeToService();

  // Delete and Add APIs
  const { mutate: deleteScope } = useDeleteServiceScope();
  const { mutate: addScope } = useAddServiceScope();

  const [tableData, setTableData] = useState<ScopeType[]>([]);
  const [modals, setModals] = useState({
    removeService: false,
  });
  const [selectedScope, setSelectedScope] = useState<Scope | null>(null);

  // Set table data when serviceScope changes
  useEffect(() => {
    if (serviceScope) {
      const formattedData = Array.isArray(serviceScope.data) ? serviceScope.data : [serviceScope]; // Ensure it's an array
      setTableData(formattedData);
    }
  }, [serviceScope]);

  const toggleModal = () => {
    setModals((prev) => ({ ...prev, removeService: !prev.removeService }));
  };

  // const chooseScope = (scopeId: Scope) => {
  //   if (!servicename) {
  //     console.error('Service name is required.');
  //     return;
  //   }

  //   addScope(
  //     { servicename, scopeId },
  //     {
  //       onSuccess: () => {
  //         setTableData((prev) => [...prev, scopeId]);
  //       },
  //       onError: (error) => {
  //         console.error('Error adding scope:', error);
  //       },
  //     }
  //   );
  // };

  const chooseScope = async (scope: ScopeType) => {
    if (!serviceName) {
      console.error('Service name is required.');
      return;
    }

    assignScopeToService({ serviceName, scopeName: scope.name });
  };

  const handleDeleteScope = (scopeId: string | number) => {
    if (!servicename) {
      console.error('Service name is required.');
      return;
    }
    deleteScope(
      { servicename, scopeId },
      {
        onSuccess: () => {
          setTableData((prev) => prev.filter((item) => item.id !== scopeId));
          clearScopeAction(dispatch);
          setSelectedScope(null);
        },
        onError: (error) => {
          console.error('Error deleting scope:', error);
        },
      }
    );
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
      render: (description) => (description ? description : '-'), // Show placeholder if description is null
    },
    // {
    //   key: 'remove',
    //   align: 'center',
    //   render: (scope: Scope) => (
    //     <Button
    //       variant='link'
    //       color='error'
    //       disabled={serviceScope?.isServiceInSso}
    //       onClick={() => {
    //         setSelectedScope(scope);
    //         toggleModal();
    //       }}
    //     >
    //       <S.TrashIcon className='icon-trash' />
    //     </Button>
    //   ),
    // },
  ];

  const mobileColumns: ColumnsType<Scope> = [
    {
      title: null,
      key: 'mobileColumn',
      render: (scope: Scope) => (
        <UiKitBox flexDirection='column'>
          <Table.MobileColumn minHeight={'40px'} title={t('scope_english_name')} value={scope?.name} />
          <Table.MobileColumn
            minHeight={'40px'}
            title={t('scope_persian_name')}
            value={scope?.description || '-'} // Placeholder for null description
          />
          {/* <Table.MobileColumn
            minHeight={'40px'}
            title={t('remove')}
            value={
              <Button
                className='item__btn'
                variant='link'
                color='error'
                onClick={() => {
                  setSelectedScope(scope);
                  toggleModal();
                }}
              >
                <S.TrashIcon className='icon-trash' />
              </Button>
            }
          /> */}
        </UiKitBox>
      ),
    },
  ];

  return (
    <>
      <h3>{t('scope')}</h3>

      {/* <ScopeSelector onSelect={chooseScope} disabled={!!selectedScope || !!tableData} /> */}

      <S.Table
        columns={desktopColumns}
        mobileColumns={mobileColumns}
        dataSource={tableData} // Placeholder row for empty table
        rowKey={(row) => row?.id || 'defaultKey'}
        pagination={false}
      />

      <RemoveServiceModal
        isOpen={modals.removeService}
        deleteToggle={() => {
          if (selectedScope?.id) {
            handleDeleteScope(selectedScope.id);
          }
        }}
        cancelToggle={toggleModal}
        id={selectedScope?.name || ''}
      />
    </>
  );
}
