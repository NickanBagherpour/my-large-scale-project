import React, { useState } from 'react'
import { Button, Table } from '@oxygen/ui-kit'
import { useTr } from '@oxygen/translation'

import * as S from './second-tab.style'
import { getDesktopColumns, getMobileColumns, Modal } from '../../utils/second-tab-table-utils'
import { useGetServicesQuery } from '../../services/second-tab/get-table-report.api'

function SecondTab() {
  const [t]=useTr()

  const { data, isFetching } = useGetServicesQuery({ page: 1, rowsPerPage: 5 });



  const [modals, setModals] = useState<Modal>({
    details: false,
    removeService: false,
  });
  const toggleModal = (modal: keyof Modal) => {
    setModals((prev) => ({ ...prev, [modal]: !prev[modal] }));
  };
  const desktopColumns = getDesktopColumns({ t, toggleModal });
  const mobileColumns = getMobileColumns({ t, toggleModal });
  const tableData = data?.list


  return (
    <>
      <S.FirstStepHeader>
        <S.FirstStepTitle>{t('second_tab.title')}</S.FirstStepTitle>
        <S.ButtonContainer>
          <Button href='/scope-history?id=test' variant='filled'  shape="circle" icon={<S.Icon className={'icon-clock'}></S.Icon>}>
          </Button>
          <Button href='' icon={<S.Icon className={'icon-edit'}  ></S.Icon>} shape="circle"></Button>
        </S.ButtonContainer>
      </S.FirstStepHeader>
      <S.Table dataSource={tableData} loading={isFetching} columns={desktopColumns} mobileColumns={mobileColumns} pagination={false} />
      
    </>  )
}

export default SecondTab