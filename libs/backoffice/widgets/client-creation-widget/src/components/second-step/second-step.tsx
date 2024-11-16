import React, { useState } from 'react';

import { Button } from '@oxygen/ui-kit';
import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { AdvanceSelector } from '@oxygen/reusable-components';

import DetailModal from './modal-detail/modal-detail';
import { Modal } from '../../types/modal.type';
import RemoveModal from './modal-remove/modal-remove';
import { updateSecondStepTableAction, useAppDispatch, useAppState } from '../../context';
import { getDesktopColumns, getMobileColumns } from '../../utils/second-step-table-utils';

import * as S from './second-step.style';

type SecondStep = PageProps & {
  setCurrentStep: any;
};

export const SecondStep: React.FC<SecondStep> = (props) => {
  const { setCurrentStep } = props;
  const state = useAppState();
  const dispatch = useAppDispatch();
  const [t] = useTr();
  const [data, setData] = useState([]);
  const [modals, setModals] = useState<Modal>({
    details: false,
    removeService: false,
  });

  const toggleModal = (modal: keyof Modal) => {
    setModals((prev) => ({ ...prev, [modal]: !prev[modal] }));
  };

  const handleSelect = (item) => {
    updateSecondStepTableAction(dispatch, item);
  };
  const handleReturn = () => {
    setCurrentStep((perv) => perv - 1);
  };

  const handleSubmit = () => {
    setCurrentStep((perv) => perv + 1);
  };
  const isDisable = state.secondStep.table.length ? false : true;
  const desktopColumns = getDesktopColumns({ t, toggleModal });
  const mobileColumns = getMobileColumns({ t, toggleModal });
  const revertData = state.secondStep.table;
  return (
    <S.SecondStepContainer>
      <S.SearchField>
        <p className={'auto-complete-p'}>{t('step_two.client_services')}</p>
        <AdvanceSelector onSelect={handleSelect}></AdvanceSelector>
      </S.SearchField>

      <S.Table dataSource={revertData} columns={desktopColumns} mobileColumns={mobileColumns} pagination={false} />
      <S.Footer>
        <Button variant={'outlined'} onClick={handleReturn}>
          {t('return')}
        </Button>
        <Button disabled={isDisable} htmlType={'submit'} onClick={handleSubmit}>
          {t('submit_info')}
          <i className={'icon-arrow-left'}></i>
        </Button>
      </S.Footer>
      <RemoveModal
        isOpen={modals['removeService']}
        toggle={() => toggleModal('removeService')}
        id={'samat-lc-gutr-del'}
      />
      <DetailModal isOpen={modals['details']} toggle={() => toggleModal('details')} />
    </S.SecondStepContainer>
  );
};
