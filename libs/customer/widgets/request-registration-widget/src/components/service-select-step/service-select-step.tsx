import React, { useState } from 'react';

import { Box, Button, Table } from '@oxygen/ui-kit';
import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { AdvanceSelector } from '@oxygen/reusable-components';

import { Modal } from '../../types';
import RemoveModal from './modal-confirm-remove/modal-confirm-remove';
import { updateServiceSelectStepTableAction, useAppDispatch, useAppState } from '../../context';
import { getDesktopColumns, getMobileColumns } from '../../utils/service-select-table-utils';
import { useThirdStepRequestRegistrationMutationQuery } from '../../services';

import * as S from './select-service-step.style';

type ServiceSelectStepType = PageProps & {
  setCurrentStep: any;
};

const ServiceSelectStep: React.FC<ServiceSelectStepType> = (props) => {
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
      updateServiceSelectStepTableAction(dispatch, { serviceId });
      toggleModal('removeService');
    }
  };

  const handleSelect = (item) => {
    updateServiceSelectStepTableAction(dispatch, item);
  };
  const handleReturn = () => {
    setCurrentStep((perv) => perv - 1);
  };

  const handleSubmit = () => {
    const params = {
      submissionId: state.submissionId,
      servicesIdSet: state.serviceSelectStep.table.map((item) => item.id),
    };
    thirdMutate(params, {
      onSuccess: (data) => {
        console.log('request registration service select step successful:', data);
        setCurrentStep((perv) => perv + 1);
      },
      onError: (error) => {
        console.error('request registration service select step  failed:', error);
      },
    });
  };
  const isDisable = state.serviceSelectStep.table.length ? false : true;
  const desktopColumns = getDesktopColumns({ t, toggleModal });
  const mobileColumns = getMobileColumns({ t, toggleModal });
  const revertData = state.serviceSelectStep.table;

  return (
    <S.ServiceSelectStepContainer>
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
    </S.ServiceSelectStepContainer>
  );
};

export default ServiceSelectStep;
