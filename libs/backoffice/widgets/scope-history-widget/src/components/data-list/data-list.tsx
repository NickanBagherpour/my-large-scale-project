import React, { useEffect } from 'react';
import { TablePaginationConfig } from 'antd';
import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { uuid } from '@oxygen/utils';
import { NoResult } from '@oxygen/reusable-components';
import { ColumnsType, Table } from '@oxygen/ui-kit';
import { updatePagination, useAppDispatch, useAppState } from '../../context';
import { useGetScopeChangeHistoryQuery } from '../../services';
import * as S from './data-list.style';

type dataListProps = PageProps & {
  //
};

const DataList: React.FC<dataListProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  const {
    table: { pagination },
  } = state;

  const { data: data, isFetching: isFetching } = useGetScopeChangeHistoryQuery(prepareParams());

  function prepareParams() {
    const params = {
      ...pagination,
    };

    return params;
  }

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

  const columns: ColumnsType<any> = [
    {
      title: t('field.modify_date'),
      dataIndex: 'modify_date',
      key: 'id',
      align: 'center',
      render: (value) => value,
    },
    {
      title: t('field.admin_name'),
      dataIndex: 'admin_name',
      key: 'id',
      align: 'center',
      render: (value) => value,
    },
    {
      title: t('field.english_name'),
      dataIndex: 'english_name',
      key: 'index',
      align: 'center',
      render: (value) => value,
    },
    {
      title: t('field.farsi_name'),
      dataIndex: 'farsi_name',
      key: 'index',
      width: 'min-content',
      render: (value) => value,
    },
  ];

  return (
    <S.TableContainer>
      {data?.content?.length ? (
        <Table
          scroll={{ x: 1600 }}
          loading={isFetching}
          current={pagination.page}
          total={data?.total}
          dataSource={data?.content}
          pagination={{ pageSize: pagination.rowsPerPage }}
          columns={columns}
          // mobileColumns={mobileColumns}
          variant={'complex'}
          title={t('scope_change_history')}
          onChange={handlePageChange}
          rowKey={() => uuid()}
          size={'small'}
        />
      ) : (
        <NoResult isLoading={isFetching} />
      )}
    </S.TableContainer>
  );
};

export default DataList;
