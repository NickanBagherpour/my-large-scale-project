import React from 'react';
import { useTr } from '@oxygen/translation';
import { TablePaginationConfig } from 'antd';
import { useTheme } from 'styled-components';

import { getValueOrDash, uuid } from '@oxygen/utils';
import { Table, Switch } from '@oxygen/ui-kit';
import { PageProps } from '@oxygen/types';
import * as S from './services.style';

import { ServiceType, ParamsType } from '../../types';
import { updatePagination, useAppDispatch, useAppState } from '../../context';

type ServicesProps = PageProps & {
  data: ServiceType[];
  isFetching: boolean;
  total?: number;
  searchTerm: string;
  isLoading: boolean;
  wordToHighlight: string;
  changeStatus: (status: boolean, name: string) => void;
  deleteService: (name: string, status: ParamsType) => void;
};

const Services: React.FC<ServicesProps> = (props) => {
  const { data, isFetching, total, wordToHighlight, changeStatus, deleteService } = props;
  const [t] = useTr();
  const dispatch = useAppDispatch();
  const state = useAppState();
  const theme = useTheme();

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

  const columns = [
    { title: `${t('row')}`, dataIndex: 'index', key: 'index' },
    {
      title: `${t('name')}`,
      dataIndex: 'name',
      key: 'name',
      render: (name) => (
        <S.Name text={getValueOrDash(name)} highlightColor={theme.secondary.main} wordToHighlight={wordToHighlight} />
      ),
    },
    {
      title: `${t('persian_name')}`,
      dataIndex: 'persianName',
      key: 'persianName',
      render: (persian_name) => getValueOrDash(persian_name),
    },
    {
      title: `${t('scope')}`,
      dataIndex: 'scope',
      key: 'scope',
      render: (scope) => (
        <S.Name text={getValueOrDash(scope)} highlightColor={theme.secondary.main} wordToHighlight={wordToHighlight} />
      ),
    },
    {
      title: 'url',
      dataIndex: 'url',
      key: 'url',
      render: (url) => <S.Url href='/'>{getValueOrDash(url)}</S.Url>,
    },
    { title: `${t('version')}`, dataIndex: 'version', key: 'version', render: (version) => getValueOrDash(version) },
    {
      title: `${t('status')}`,
      dataIndex: 'status',
      key: 'status',
      render: (status, name) => (
        <span>
          {t('stopped')}
          <span style={{ margin: '0 1.2rem' }}>
            <Switch checked={status} onClick={() => changeStatus(status, name.name)} />
          </span>
          {t('operational')}
        </span>
      ),
    },
    {
      title: '',
      dataIndex: 'details',
      key: 'details',
      render: (url) => <S.Details href='/'>{t('detailed')}</S.Details>,
    },
    {
      title: '',
      dataIndex: 'name',
      key: 'name',
      render: (name, status) => <S.Trash className='icon-trash' onClick={() => deleteService(name, status)} />,
    },
  ];

  const tableData = data.map((item, index) => ({ ...item, index: index + 1 }));

  return (
    <S.TableContainer>
      <Table
        loading={isFetching}
        current={pagination.page}
        total={total}
        dataSource={tableData}
        columns={columns}
        hasContainer={false}
        pagination={{ pageSize: pagination.rowsPerPage }}
        onChange={handlePageChange}
        rowKey={() => uuid()}
      />
    </S.TableContainer>
  );
};

export default Services;
