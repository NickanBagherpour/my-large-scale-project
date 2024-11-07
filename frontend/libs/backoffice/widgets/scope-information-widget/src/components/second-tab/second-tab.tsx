import React, { useState } from 'react';
import { Button, Table } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';

import { getDesktopColumns, getMobileColumns, Modal } from '../../utils/second-tab-table-utils';
import { useGetServicesQuery } from '../../services/second-tab/get-table-report.api';
import RemoveServiceModal from './modals/remove-sevice-modal/remove-service-modal';
import DetailsModal from './modals/info-service-modal/info-service-modal';

import * as S from './second-tab.style';

function SecondTab() {
  const [t] = useTr();

  const { data, isFetching } = useGetServicesQuery({ page: 1, rowsPerPage: 5 });

  const [modals, setModals] = useState<Modal>({
    details: false,
    removeService: false,
  });
  const toggleModal = (modal: keyof Modal) => {
    setModals((prev) => ({ ...prev, [modal]: !prev[modal] }));
  };

  const handlePrint = () => {
    window.print();
  };


  const desktopColumns = getDesktopColumns({ t, toggleModal });
  const mobileColumns = getMobileColumns({ t, toggleModal });
  const tableData = data?.list;

  return (
    <>
      <S.FirstStepHeader>
        <S.FirstStepTitle>{t('second_tab.title')}</S.FirstStepTitle>
        <S.ButtonContainer>
          <S.ButtonWraper background={'primary'}>
            <Button
              href=''
              onClick={handlePrint}
              variant='link'
              color='primary'
              shape='circle'
              icon={<S.Icon className={'icon-printer'}></S.Icon>}
            ></Button>
          </S.ButtonWraper>
          <S.ButtonWraper background={'secondary'}>
            <Button
              href=''
              variant='link'
              color='secondary'
              shape='circle'
              icon={<S.Icon className={'icon-excel'}></S.Icon>}
            ></Button>
          </S.ButtonWraper>
        </S.ButtonContainer>
      </S.FirstStepHeader>
      <S.Table
        dataSource={tableData}
        loading={isFetching}
        columns={desktopColumns}
        mobileColumns={mobileColumns}
        pagination={false}
      />
      <RemoveServiceModal
        isOpen={modals['removeService']}
        toggle={() => toggleModal('removeService')}
        id={'samat-lc-gutr-del'}
      />
      <DetailsModal isOpen={modals['details']} toggle={() => toggleModal('details')} />
    </>
  );
}

export default SecondTab;
