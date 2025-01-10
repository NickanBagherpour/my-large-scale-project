import React from 'react';
import { useTr } from '@oxygen/translation';
import { TablePaginationConfig } from 'antd';

import { uuid } from '@oxygen/utils';
import { Table, Button } from '@oxygen/ui-kit';
import { PageProps } from '@oxygen/types';
import { FooterContainer, ReturnButton } from '@oxygen/reusable-components';

import { UpstreamDetailsType, ParamsType } from '../../types';
import { updatePagination, useAppDispatch, useAppState } from '../../context';
import { getDesktopColumns, getMobileColumns } from '../../utils/upstream-details-list-util';
import { useAddServerMutationQuery } from '../../services/get-upstream-details.api';

import * as S from './upstream-details-list.style';

type UpstreamDetailsProps = PageProps & {
  data: UpstreamDetailsType[];
  isFetching: boolean;
  total?: number;
  // isLoading: boolean;
  deleteUpstream: (id: number, domain: string, weight: string, healthStatus: string) => void;
  editUpstream: (id: number, domain: string, weight: string, healthStatus: string) => void;
  addServer: () => void;
  // setCurrentStep: (prev) => void;
};

const UpstreamDetails: React.FC<UpstreamDetailsProps> = (props) => {
  const { data, isFetching, total, deleteUpstream, editUpstream, addServer } = props;
  // debugger;
  const [t] = useTr();
  const dispatch = useAppDispatch();
  const state = useAppState();

  const {
    table: { pagination },
  } = state;

  const { mutate: addServerMutate, isPending: addServerIsPending } = useAddServerMutationQuery();

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
    // setCurrentStep((perv) => perv - 1);
  };

  const handleAddServer = () => {
    debugger;
    const params = {
      name: '',
      description: '',
    };
    addServerMutate(params, {
      onSuccess: (data) => {
        debugger;
        console.log('request registration first step successful:', data);
        // setCurrentStep((perv) => perv + 1);
        // updateUpstreamInfo(dispatch, values);
        // if (state.submissionId.length === 0) {
        //   updateOrganizationIdAndSubmissionId(dispatch, data.data);
        // }
        // const aggregator_status = state.firstStep.aggregator_status;
        // const updatedValues = { ...values, aggregator_status };
        // updateFirstStepAction(dispatch, updatedValues);
        // setCurrentStep((perv) => perv + 1);
      },
      onError: (error) => {
        debugger;
        // setConfirmModal(true);
        console.error('request registration first step  failed:', error);
      },
    });
  };

  const desktopColumns = getDesktopColumns({ t, deleteUpstream, editUpstream });
  const mobileColumns = getMobileColumns({ t, deleteUpstream, editUpstream });

  const tableData = data?.map((item, index) => ({ ...item, index: index + 1 }));
  // debugger;
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
        {/* <ReturnButton /> */}
        <Button variant={'outlined'} onClick={handleReturn}>
          {t('return')}
        </Button>
        {/* {
          <Button
            className={'register-button'}
            color={'primary'}
            size={'large'}
            onClick={handleAddServer}
            // disabled={isSubmitDisabled}
            // onClick={submitForm}
            // loading={firstIsPending}
          >
            {t('button.register')}
          </Button>
        } */}
      </FooterContainer>
    </S.ServerContainer>
  );
};

export default UpstreamDetails;
