import React, { useState } from 'react';

import { Button, Table } from '@oxygen/ui-kit';
import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';

import DetailsModal from './modals/info-service-modal/info-service-modal';
// import RemoveServiceModal from './modals/remove-sevice-modal/remove-service-modal';
import { useGetServicesQuery } from '../../services/second-tab/get-table-report.api';
import { useExcelDownloadQuery } from '../../services/second-tab/get-excel-download.api';
import { getDesktopColumns, getMobileColumns, Modal } from '../../utils/second-tab-table-utils';

import * as S from './second-tab.style';
import { useModalInfoQuery } from '../../services/second-tab/get-modal-data.api';

type SecondTabTypes = PageProps & {
  id: string;
};

const SecondTab: React.FC<SecondTabTypes> = (props) => {
  const { id } = props;

  const [t] = useTr();
  const [serviceId, setServiceId] = useState(null);
  const [modals, setModals] = useState<Modal>({
    details: false,
    removeService: false,
  });
  const { data: tableDataQuery, isFetching: tabelIsFetching } = useGetServicesQuery({
    page: 0,
    size: 10,
    id: id,
  });
  const { data: modalDataQuery, isFetching: modalIsFetching } = useModalInfoQuery(serviceId);
  const { isFetching: excelIsFetching, refetch } = useExcelDownloadQuery({ id: id });

  const updateId = (id) => {
    setServiceId(id);
  };
  const toggleModal = (modal: keyof Modal) => {
    setModals((prev) => ({ ...prev, [modal]: !prev[modal] }));
  };

  const handlePrint = () => {
    window.print();
  };
  const handleExcleDownload = () => {
    refetch();
  };

  const desktopColumns = getDesktopColumns({ t, toggleModal, updateId });
  const mobileColumns = getMobileColumns({ t, toggleModal, updateId });

  const tableData = tableDataQuery?.content;
  return (
    <>
      <S.SecondTabHeader>
        <S.SecondTabTitle>{t('second_tab.title')}</S.SecondTabTitle>
        <S.ButtonContainer>
          <S.ButtonWraper background={'primary'}>
            <Button
              onClick={handlePrint}
              variant='link'
              color='primary'
              shape='circle'
              icon={<S.Icon className={'icon-printer'}></S.Icon>}
            ></Button>
          </S.ButtonWraper>
          <S.ButtonWraper background={'secondary'}>
            <Button
              onClick={handleExcleDownload}
              loading={excelIsFetching}
              variant='link'
              color='secondary'
              shape='circle'
              icon={<S.Icon className={'icon-excel'}></S.Icon>}
            ></Button>
          </S.ButtonWraper>
        </S.ButtonContainer>
      </S.SecondTabHeader>
      <Table
        dataSource={tableData}
        loading={tabelIsFetching}
        columns={desktopColumns}
        mobileColumns={mobileColumns}
        pagination={false}
      />
      {/* uncomment when remove service is needed */}
      {/* <RemoveServiceModal
        isOpen={modals['removeService']}
        toggle={() => toggleModal('removeService')}
        id={'samat-lc-gutr-del'}
      /> */}
      <DetailsModal
        isOpen={modals['details']}
        toggle={() => toggleModal('details')}
        data={modalDataQuery}
        loading={modalIsFetching}
      />
    </>
  );
};

export default SecondTab;
