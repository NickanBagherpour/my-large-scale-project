import * as S from './scope.style';
import { useTr } from '@oxygen/translation';
import Footer from '../footer/footer';
import { useAppDispatch, previousStep, nextStep, useAppState } from '../../context';
import { Button, type ColumnsType, Table } from '@oxygen/ui-kit';
import { useState } from 'react';
import { Container } from '../container/container.style';
import { ServiceScope, type Scope as ScopeType } from '../../types';
import { getValueOrDash } from '@oxygen/utils';
import ScopeSelector from '../scope-selector/scope-selector';
import {
  useDeleteUnassignFromService,
  useGetServiceScope,
  usePostAssignScopeToService,
  usePostRegisterToSso,
} from '../../services';
import ConfirmModal from '../cofirm-modal/confirm-modal';
import { ConfirmRemoveModal } from '@oxygen/reusable-components';

export default function Scope() {
  const [t] = useTr();
  const dispatch = useAppDispatch();
  const { data: selectedScopes, isFetching: isFetchingServiceScope } = useGetServiceScope();
  const { mutate: assignScopeToService, isPending: isAssigningScopeToService } = usePostAssignScopeToService();
  const { mutate: unassignScope, isPending: isUnassigning } = useDeleteUnassignFromService();
  const { mutate: registerToSso, isPending: isRegiseteringToBaam } = usePostRegisterToSso();
  const [scopeToUnassign, setScopeToUnassign] = useState<ServiceScope | null>(null);
  const [isConfirmModalOpen, setIsCofirmModalOpen] = useState(false);
  const { serviceName } = useAppState();
  const isScopeSelectorDisabled = !!selectedScopes?.some((scope) => scope.isServiceInSso);

  const chooseScope = async (scope: ScopeType) => {
    assignScopeToService({ serviceName, scopeName: scope.name });
  };

  const onReturn = () => {
    previousStep(dispatch);
  };

  const registerAndProceed = () => {
    if (!!selectedScopes?.length && serviceName) {
      registerToSso(serviceName, { onSuccess: () => nextStep(dispatch) });
    }
  };

  const onUnassign = () => {
    if (scopeToUnassign) {
      unassignScope({ scopeName: scopeToUnassign.name, serviceName }, { onSettled: () => setScopeToUnassign(null) });
    }
  };

  const onRegister = () => {
    setIsCofirmModalOpen(true);
  };

  const desktopColumns: ColumnsType<ServiceScope> = [
    {
      title: t('common.row_number'),
      key: 'rowNumber',
      align: 'center',
      width: '2rem',
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
      render: (value) => getValueOrDash(value),
    },
    {
      dataIndex: 'isServiceInSso',
      align: 'center',
      width: '2rem',
      render: (isServiceInSso, scope) => (
        <Button
          size='small'
          variant='link'
          color='error'
          onClick={() => setScopeToUnassign(scope)}
          disabled={isServiceInSso}
        >
          <S.TrashIcon className='icon-trash' />
        </Button>
      ),
    },
  ];

  const mobileColumns: ColumnsType<ServiceScope> = [
    {
      title: null,
      key: 'mobileColumn',
      render: (scope: ServiceScope) => {
        const columns = [
          { title: t('scope_english_name'), value: scope?.name },
          { title: t('persian_name'), value: scope?.description },
          {
            colon: false,
            title: '',
            value: (
              <Button
                className='item__btn'
                variant='link'
                color='error'
                onClick={() => setScopeToUnassign(scope)}
                disabled={scope.isServiceInSso}
              >
                <S.TrashIcon className='icon-trash' />
              </Button>
            ),
          },
        ];

        return <Table.MobileColumns minHeight={'40px'} columns={columns} />;
      },
    },
  ];

  return (
    <>
      <Container>
        <ScopeSelector onSelect={chooseScope} disabled={isScopeSelectorDisabled} />

        <S.Table
          pagination={false}
          columns={desktopColumns}
          rowKey={(row: ScopeType) => row.name}
          mobileColumns={mobileColumns}
          dataSource={selectedScopes}
          loading={isFetchingServiceScope}
        />

        <Footer
          registerButtonProps={{
            disabled: !selectedScopes,
            loading: isRegiseteringToBaam || isAssigningScopeToService,
          }}
          onRegister={onRegister}
          onReturn={onReturn}
        />
      </Container>

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        close={() => setIsCofirmModalOpen(false)}
        onConfirm={registerAndProceed}
      />

      {scopeToUnassign && (
        <ConfirmRemoveModal
          isLoading={isUnassigning}
          onRemove={onUnassign}
          title={t('remove_scope')}
          isOpen={!!scopeToUnassign}
          wordToHighlight={scopeToUnassign.name}
          close={() => setScopeToUnassign(null)}
          message={t('confirm_remove_msg', { name: scopeToUnassign.name })}
        />
      )}
    </>
  );
}
