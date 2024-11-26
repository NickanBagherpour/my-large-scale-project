import React, { useEffect } from 'react';
import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { uuid } from '@oxygen/utils';
import { useTheme } from 'styled-components';
import { NoResult } from '@oxygen/reusable-components';

//import { useGetReportDataQuery } from '../../services';
import { TablePaginationConfig } from 'antd';
import { ColumnsType, Switch, Table } from '@oxygen/ui-kit';

import { updatePagination, useAppDispatch, useAppState } from '../../context';
import { useGetScopeChangeHistoryQuery } from '../../services';
import * as S from './data-list.style';

// import { getDesktopColumns, getMobileColumns } from '../../utils/data-list.util';

type dataListProps = PageProps & {
  //
};

const DataList: React.FC<dataListProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();
  useEffect(() => {
    console.log('*****');
  }, []);

  const {
    table: { pagination },
  } = state;

  const { data: scopeHistoryList, isFetching: isClientsFetching } = useGetScopeChangeHistoryQuery(prepareParams());
  console.log(scopeHistoryList, 'scopeHistoryList');

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
      render: (value) => {
        return (
          <div>
            {value?.edit_time}
            {value?.edit_date}
          </div>
        );
        // disabled={disabled} defaultChecked={defaultChecked}
      },
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
      <div>
        <Table
          scroll={{ x: 1600 }}
          variant='complex'
          title={t('scope_change_history')}
          // title={t('discharge_request_list')}
          // captionChildren={getCaptionChildren()}
          dataSource={scopeHistoryList}
          columns={columns}
          // mobileColumns={mobileColumns}
          loading={isClientsFetching}
          // expandable={{
          //   expandedRowRender: (record) => <HistoryTableRowDetail data={record} id={record.requestId} />,
          // }}
          size='small'
          hasContainer={false}
          pagination={{ pageSize: pagination.rowsPerPage }}
          onChange={handlePageChange}
          rowKey={() => uuid()}
          current={pagination.page}
          // total={scopeHistoryList?.length}
        />
      </div>
    </S.TableContainer>
  );
};

export default DataList;
