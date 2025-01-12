import React from 'react';
import { useTr } from '@oxygen/translation';
import { TablePaginationConfig } from 'antd';
import { useRouter } from 'next/navigation';

import { uuid } from '@oxygen/utils';
import { Table, Button } from '@oxygen/ui-kit';
import { PageProps } from '@oxygen/types';
import { FooterContainer } from '@oxygen/reusable-components';

import { UpstreamDetailsType } from '../../types';
import { updatePagination, useAppDispatch, useAppState } from '../../context';
import { getDesktopColumns, getMobileColumns } from '../../utils/upstream-details-list-util';

import * as S from './upstream-details-list.style';

type UpstreamDetailsProps = PageProps & {
  data: UpstreamDetailsType[];
  isFetching: boolean;
  total?: number;
  deleteUpstream: (id: number, domain: string, weight: string, healthStatus: string) => void;
  editUpstream: (id: number, domain: string, weight: string, healthStatus: string) => void;
  addServer: () => void;
};

const UpstreamDetails: React.FC<UpstreamDetailsProps> = (props) => {
  const { data, isFetching, total, deleteUpstream, editUpstream, addServer } = props;
  const [t] = useTr();
  const dispatch = useAppDispatch();
  const state = useAppState();

  const router = useRouter();

  const {
    table: { pagination },
  } = state;

  const handlePageChange = async (currentPagination: TablePaginationConfig) => {
    const { pageSize, current } = currentPagination;

    if (pageSize && current) {
      const updatedPagination = {
        page: pageSize === pagination.rowsPerPage ? current : 1,
        rowsPerPage: pageSize,
      };
      updatePagination(dispatch, updatedPagination);
    }
  };

  const handleReturn = () => {
    router.back();
  };

  const desktopColumns = getDesktopColumns({ t, deleteUpstream, editUpstream });
  const mobileColumns = getMobileColumns({ t, deleteUpstream, editUpstream });

  const tableData = data?.map((item, index) => ({ ...item, index: index + 1 }));
  return (
    <S.ServerContainer>
      <S.ServerContent>
        <S.Actions>
          <S.UpstreamServerTitle>{t('upstream_server_title')}</S.UpstreamServerTitle>
          <Button color={'secondary'} onClick={() => addServer()}>
            <i className={'icon-plus'}></i>
            {t('add_server')}
          </Button>
        </S.Actions>
        <S.TableContainer>
          <Table
            loading={isFetching}
            current={pagination.page}
            total={total}
            dataSource={tableData}
            columns={desktopColumns}
            mobileColumns={mobileColumns}
            hasContainer={false}
            pagination={{ pageSize: pagination.rowsPerPage }}
            onChange={handlePageChange}
            rowKey={() => uuid()}
            showHeader
          />
        </S.TableContainer>
      </S.ServerContent>
      <FooterContainer>
        <Button variant={'outlined'} onClick={handleReturn}>
          {t('return')}
        </Button>
      </FooterContainer>
    </S.ServerContainer>
  );
};

export default UpstreamDetails;
