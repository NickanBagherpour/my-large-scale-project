// import React, { useState } from 'react';
// import * as S from './upstream-list.style';
// import type { Pagination, Service } from '@oxygen/types';
// import { v4 as uuid } from 'uuid'; // import uuid if needed
// import { TablePaginationConfig } from 'antd';
// import { useTr } from '@oxygen/translation';
// import { PageProps } from '@oxygen/types';

// import { getDesktopColumns, getMobileColumns } from '../../utils/services-table.util';
// import { Button, Loading, Table } from '@oxygen/ui-kit';
// import DetailsModal from './modals/info-service-modal/info-service-modal';
// import RemoveServiceModal from './modals/remove-sevice-modal/remove-service-modal';
// import { useAppDispatch, useAppState } from '../../context';
// import { useGetServiceClientsListQuery } from '../../services';

// export type Modal = {
//   details: boolean;
//   removeService: boolean;
// };

// type Props = {
//   t: (key: string) => string; // Assuming 't' is a function for translations
//   filteredClients: Service[];
//   pagination: { page: number; rowsPerPage: number };
//   isClientsFetching: boolean;
//   handlePageChange: (pagination: TablePaginationConfig) => void;
// };

// type AppProps = PageProps & {
//   //
// };

// const UpstreamList: React.FC<AppProps> = (props) => {
//   const { data: clientsList, isFetching: isClientsFetching } = useGetServiceClientsListQuery();
//   const clientsLists = Array.isArray(clientsList) ? clientsList : [];
//   console.log(clientsList, 'clientsList');
//   const state = useAppState();
//   const dispatch = useAppDispatch();

//   const [t] = useTr();
//   const [pagination, setPagination] = useState<Pagination>({ page: 1, rowsPerPage: 5 });

//   const [modals, setModals] = useState<Modal>({
//     details: false,
//     removeService: false,
//   });

//   const toggleModal = (modal: keyof Modal) => {
//     setModals((prev) => ({ ...prev, [modal]: !prev[modal] }));
//   };

//   const handlePageChange = (pagination: any) => {
//     setPagination({
//       page: pagination.current,
//       rowsPerPage: pagination.pageSize,
//     });
//   };

//   const desktopColumns = getDesktopColumns({ t, toggleModal });
//   const mobileColumns = getMobileColumns({ t, toggleModal });

//   return (
//     <S.ItemsContainer className='clients-list'>
//       <h3>{t('scopes_list')}</h3>

//       <S.DataTableContainer>
//         <S.Buttons>
//           <S.Button href='/load-client' className='excel-icon' color='primary' variant='filled'>
//             <i className='icon-excel' />
//           </S.Button>
//           <S.Button href='/create-client' className='printer-icon' color='secondary' variant='filled'>
//             <i className='icon-printer' />
//           </S.Button>
//         </S.Buttons>
//       </S.DataTableContainer>

//       <div>
//         {isClientsFetching ? (
//           <Loading spinning={isClientsFetching} />
//         ) : (
//           <Table
//             dataSource={clientsLists}
//             columns={desktopColumns}
//             mobileColumns={mobileColumns}
//             loading={isClientsFetching}
//             pagination={{
//               current: pagination.page,
//               pageSize: pagination.rowsPerPage,
//               total: clientsList.length,
//             }}
//             onChange={handlePageChange}
//             rowKey={(record) => record.id || uuid()}
//           />
//         )}
//         {/* <>
//             {clientsLists?.content.length > 0 ? (
//               <Table
//                 dataSource={clientsLists?.content} // Pass 'content' to the Table
//                 columns={desktopColumns} // Define your columns elsewhere
//                 mobileColumns={mobileColumns} // Define your mobile columns elsewhere
//                 pagination={{
//                   current: pagination.page,
//                   pageSize: pagination.rowsPerPage,
//                   total: clientsLists.length,
//                 }}
//                 onChange={handlePageChange} // Define the pagination handler
//                 rowKey={(record) => record.id || uuid()} // Use unique ID for row key
//               />
//             ) : (
//               <div>No clients found</div> // Handle the case where no data is available
//             )}
//           </> */}

//         <RemoveServiceModal
//           isOpen={modals.removeService}
//           toggle={() => toggleModal('removeService')}
//           id='samat-lc-gutr-del'
//         />
//         <DetailsModal isOpen={modals.details} toggle={() => toggleModal('details')} />
//       </div>
//     </S.ItemsContainer>
//   );
// };

// export default UpstreamList;

import { useState } from 'react';

import { Button } from 'antd';

import { InfoBox, Table } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { InfoItemType, PageProps } from '@oxygen/types';

import { Modal } from '../scope-list/scope-list';
import DetailsModal from './modals/info-service-modal/info-service-modal';
import RemoveServiceModal from './modals/remove-sevice-modal/remove-service-modal';

import * as S from './upstream-list.style';
import { getDesktopColumns, getMobileColumns } from '../../utils/upstream-tab/table';
type UpstreamListType = PageProps & {
  //
};
export const UpstreamList: React.FC<UpstreamListType> = (props) => {
  //Hooks
  const [t] = useTr();
  const [modals, setModals] = useState<Modal>({
    details: false,
    removeService: false,
  });
  //Handlers
  const handleDelete = () => {
    console.log('delete');
    toggleModal('removeService');
  };
  const toggleModal = (modal: keyof Modal) => {
    setModals((prev) => ({ ...prev, [modal]: !prev[modal] }));
  };
  //Render
  const infoBoxData: InfoItemType[] = [
    {
      key: 'upstream_tab.info_box_latinName',
      value: 'SEJAM-UPSTREAM',
    },
    {
      key: 'upstream_tab.info_box_persianName',
      value: 'آپ‌استریم سجام',
    },
    {
      key: '',
      value: (
        <Button variant='outlined' color='danger' onClick={handleDelete}>
          <S.TrashIcon className='icon-trash'></S.TrashIcon>
          {t('upstream_tab.delete_button')}
        </Button>
      ),
    },
  ];

  const desktopColumns = getDesktopColumns({ t });
  const mobileColumns = getMobileColumns({ t });

  return (
    <S.UpstreamContainer>
      <S.Title>{t('upstream_tab.tab_header')}</S.Title>
      <S.BorderBoxContainer>
        <InfoBox data={infoBoxData} minColumnCount={3} margin={0} />
        <S.Table>
          <S.Title>{t('upstream_tab.upstream_servers')}</S.Title>
          <Table dataSource={[]} columns={desktopColumns} mobileColumns={mobileColumns} loading={false} />
        </S.Table>
      </S.BorderBoxContainer>
      <RemoveServiceModal
        isOpen={modals.removeService}
        toggle={() => toggleModal('removeService')}
        id='SEJAM-UPSTREAM'
      />
      {/* <DetailsModal isOpen={modals.details} toggle={() => toggleModal('details')} /> */}
    </S.UpstreamContainer>
  );
};
