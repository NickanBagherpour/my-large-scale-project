import React, { useState } from 'react';

import { Box, Button, Table } from '@oxygen/ui-kit';
import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { AdvanceSelector } from '@oxygen/reusable-components';

import { Modal } from '../../types/modal.type';
import RemoveModal from './modal-remove/modal-remove';
import { updateThirdStepTableAction, useAppDispatch, useAppState } from '../../context';
import { getDesktopColumns, getMobileColumns } from '../../utils/third-step-table-utils';
import { useThirdStepRequestRegistrationMutationQuery } from '../../services/third-step/third-step-data';

import * as S from './third-step.style';

type ThirdStep = PageProps & {
  setCurrentStep: any;
};

export const ThirdStep: React.FC<ThirdStep> = (props) => {
  const { setCurrentStep } = props;
  const state = useAppState();
  const dispatch = useAppDispatch();
  const [t] = useTr();
  const [modals, setModals] = useState<Modal>({
    confirm: false,
    removeService: false,
    serviceId: undefined,
    serviceName: '',
  });
  const { mutate: thirdMutate, isPending: ThirdIsPending } = useThirdStepRequestRegistrationMutationQuery();

  const toggleModal = (modal: keyof Modal, serviceName?: string, serviceId?: number) => {
    setModals((prev) => ({
      ...prev,
      serviceId: serviceId || undefined,
      serviceName: serviceName || '',
      [modal]: !prev[modal],
    }));
  };

  const handleDeleteModal = (serviceId?: number) => {
    if (serviceId) {
      updateThirdStepTableAction(dispatch, { serviceId });
      toggleModal('removeService');
    }
  };

  const handleSelect = (item) => {
    updateThirdStepTableAction(dispatch, item);
  };
  const handleReturn = () => {
    setCurrentStep((perv) => perv - 1);
  };

  const handleSubmit = () => {
    const params = {
      requestId: state.submissionId,
      servicesIdSet: state.thirdStep.table.map((item) => item.id),
    };
    thirdMutate(params, {
      onSuccess: (data) => {
        console.log('request registration first step successful:', data);
        setCurrentStep((perv) => perv + 1);
      },
      onError: (error) => {
        console.error('request registration first step  failed:', error);
      },
    });
  };
  const isDisable = state.thirdStep.table.length ? false : true;
  const desktopColumns = getDesktopColumns({ t, toggleModal });
  const mobileColumns = getMobileColumns({ t, toggleModal });
  const revertData = state.thirdStep.table;

  return (
    <S.ThirdStepContainer>
      <S.SearchField>
        <AdvanceSelector
          onSelect={handleSelect}
          label={t('search_services')}
          placeholder={t('search_by_service_name_and_code')}
          callServerAPI
        ></AdvanceSelector>
      </S.SearchField>
      <Box flexGrow={1}>
        <Table dataSource={revertData} columns={desktopColumns} mobileColumns={mobileColumns} pagination={false} />
      </Box>
      <S.Footer>
        <Button variant={'outlined'} onClick={handleReturn}>
          {t('return')}
        </Button>
        <Button disabled={isDisable} loading={ThirdIsPending} htmlType={'submit'} onClick={handleSubmit}>
          {t('submit_info')}
          <i className={'icon-arrow-left'}></i>
        </Button>
      </S.Footer>
      <RemoveModal
        isOpen={modals['removeService']}
        toggle={() => toggleModal('removeService')}
        onDelete={(id: number | undefined) => handleDeleteModal(id)}
        id={modals.serviceId}
        name={modals.serviceName}
      />
    </S.ThirdStepContainer>
  );
};
