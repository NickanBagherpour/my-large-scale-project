import React, { useState } from 'react';
import { Button, Table } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';

import { getDesktopColumns, getMobileColumns, Modal } from '../../utils/second-tab-table-utils';
import { useGetServicesQuery } from '../../services/second-tab/get-table-report.api';
import RemoveServiceModal from './modals/remove-sevice-modal/remove-service-modal';
import DetailsModal from './modals/info-service-modal/info-service-modal';

import * as S from './second-tab.style';
import { PageProps } from '@oxygen/types';
import { useExcelDownloadQuery } from '../../services/second-tab/get-excel-download.api';
type SecondTabTypes = PageProps & {
  id: string;
};

const SecondTab: React.FC<SecondTabTypes> = (props) => {
  const { id } = props;
  const [t] = useTr();

  const { data:tableDataQuery, isFetching:tabelIsFetching } = useGetServicesQuery({ page: 1, rowsPerPage: 5,id:id });
  const { data, isFetching:excelIsFetching , refetch } = useExcelDownloadQuery({ id:id});

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
  const handleExcleDownload = () => {
    refetch
  };

  const desktopColumns = getDesktopColumns({ t, toggleModal });
  const mobileColumns = getMobileColumns({ t, toggleModal });
  const tableData = tableDataQuery?.list;

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
              onClick={handleExcleDownload}
              loading={excelIsFetching}
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
        loading={tabelIsFetching}
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
};

export default SecondTab;
