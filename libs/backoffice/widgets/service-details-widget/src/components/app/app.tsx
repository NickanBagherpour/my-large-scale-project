import React, { useState } from 'react';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import type { UploadFile, UploadProps } from 'antd';
import { PageProps, type Pagination } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import {
  Button,
  ColumnsType,
  Container,
  InfoBox,
  Dragger,
  Input,
  Switch,
  Table,
  Tabs,
  TabsProps,
  Divider,
} from '@oxygen/ui-kit';
import { GlobalMessageContainer, NoResult, ReturnButton } from '@oxygen/reusable-components';
import { useGetServiceDetailsQuery, useGetServiceClientsListQuery } from '../../services';
import { getDesktopColumns, getMobileColumns } from '../../utils/services-table.util';
import { Nullable } from '@oxygen/types';
import { TablePaginationConfig } from 'antd';
import * as S from './app.style';
import { FooterContainer } from '@oxygen/reusable-components';
import { useBounce } from '@oxygen/hooks';
import { ROUTES, uuid } from '@oxygen/utils';
import { updatePagination, useAppDispatch, useAppState } from '../../context';
// import { MobileColumns } from 'libs/ui-kit/src/table/mobile-columns';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const { data: serviceDetails, isFetching: isServiceFetching } = useGetServiceDetailsQuery();
  const { data: clientsList, isFetching: isClientsFetching } = useGetServiceClientsListQuery();
  // const [pagination, setPagination] = useState<Pagination>({ page: 1, rowsPerPage: 5 });
  const state = useAppState();
  const dispatch = useAppDispatch();

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
  const [t] = useTr();
  const searchParams = useSearchParams();

  const router = useRouter();
  const handleReturn = () => {
    router.back();
  };

  const id: Nullable<string> = searchParams.get('id');
  if (!id) {
    redirect('/not-found');
  }

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const dataTableParams = { t, pagination };
  const [value, setValue] = useState('');
  const [filteredClients, setFilteredClients] = useState(clientsList?.content || []);

  useBounce(() => {
    if (clientsList?.content) {
      const lowercasedValue = value.toLowerCase();
      const filtered = clientsList.content.filter(
        (client) =>
          client.latin_name.toLowerCase().includes(lowercasedValue) ||
          client.persian_name.toLowerCase().includes(lowercasedValue)
      );
      setFilteredClients(filtered);
    }
  }, [value, clientsList]);
  const desktopColumns = getDesktopColumns(dataTableParams);
  const mobileColumns = getMobileColumns(dataTableParams);

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList, file }) => {
    setFileList(newFileList);
  };

  const footerButton = (
    <ReturnButton size={'large'} variant={'outlined'} onClick={handleReturn}>
      {t('button.return')}
    </ReturnButton>
  );

  const handleDelete = (uid) => {
    const updatedFileList = fileList.filter((file) => file.uid !== uid);
    setFileList(updatedFileList);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: t('service_information'),
      children: (
        <>
          <div className='service-technical-details'>
            <h3>{t('service_technical_info')}</h3>
            <div className='btn-group'>
              <Button
                type={'primary'}
                color='primary'
                variant='filled'
                icon={<i className='icon-clock' />}
                onClick={() => router.push(`${ROUTES.BACKOFFICE.SERVICE_HISTORY}?id=${id}&type=service`)}
              >
                {t('see_changes_history')}
              </Button>
              <Button
                type={'primary'}
                color='primary'
                variant='solid'
                icon={<i className='icon-edit' />}
                onClick={() => router.push(`/edit-service?id=1111111`)}
              >
                {t('edit')}
              </Button>
            </div>
          </div>

          <InfoBox data={serviceDetails} margin={0} loading={isServiceFetching} />
        </>
      ),
    },
    {
      key: '2',
      label: t('clients'),
      children: (
        <S.ItemsContainer className='clients-list'>
          <h3>{t('clients_list')}</h3>

          <S.DataTableContainer>
            <S.Input
              style={{ marginBottom: '5rem' }}
              value={value}
              placeholder={t('search_clients')}
              prefix={<i className='icon-search-normal' />}
              onChange={(e) => setValue(e.target.value)}
            />

            <S.Buttons>
              <S.Button href='/load-client' className='excel-icon' color='primary' variant='filled'>
                <i className='icon-excel' />
              </S.Button>
              <S.Button href='/create-client' className='printer-icon' color='secondary' variant='filled'>
                <i className='icon-printer' />
              </S.Button>
            </S.Buttons>
          </S.DataTableContainer>

          <div>
            <Table
              // dataSource={clientsList?.content}
              dataSource={isClientsFetching ? [] : filteredClients}
              columns={desktopColumns}
              mobileColumns={mobileColumns}
              loading={isClientsFetching}
              hasContainer={false}
              pagination={{ pageSize: pagination.rowsPerPage }}
              onChange={handlePageChange}
              rowKey={() => uuid()}
              current={pagination.page}
              total={filteredClients?.length}
            />
          </div>
        </S.ItemsContainer>
      ),
    },
    {
      key: '3',
      label: t('tariffs'),
      children: (
        <S.TariffContainer>
          <h3>{t('tariffs_list')}</h3>
          <div className='inputs-container'>
            <div>
              <span>{t('tariff')}</span>
              <Input />
            </div>
            <div className='button-container'>
              <Button type={'primary'} color='primary' variant='solid'>
                {t('button.register')}
              </Button>
            </div>
          </div>
        </S.TariffContainer>
      ),
    },
    {
      key: '4',
      label: t('scopes'),
      children: (
        <S.ScopeList>
          <h3>{t('scopes_list')}</h3>

          <div className='inputs-container'>
            <div>
              <span>{t('scope_name')}</span>
              <Input placeholder={t('scope_name_placeholder')} />
            </div>
            <div>
              <span>{t('scope_persian_name')}</span>
              <Input placeholder={t('scope_persian_name')} />
            </div>
          </div>

          <div className='button-container'>
            <Button type={'primary'} color='primary' variant='solid'>
              {t('button.register')}
            </Button>
          </div>
        </S.ScopeList>
      ),
    },
    {
      key: '5',
      label: t('documents'),
      children: (
        <S.UploadContainer>
          <div className='button-container'>
            <Button
              type='primary'
              color='primary'
              variant='filled'
              onClick={() => router.push(`/documentation-history?id=${id}&type=documentation`)}
              icon={<i className='icon-clock' />}
            >
              {t('see_changes_history')}
            </Button>
          </div>

          <div className='file-upload'>
            <Dragger onChange={handleChange} className='files-dragger'>
              <i className='icon-export' />
              <h3>{t('upload_title')}</h3>
              <p>{t('upload_description')}</p>
              <div>
                <Button
                  type='primary'
                  color='secondary'
                  variant='solid'
                  icon={<i className='icon-plus' />}
                  onClick={() => router.replace('')}
                >
                  {t('add_document')}
                </Button>
              </div>
            </Dragger>

            <S.FilePreview>
              {fileList.map((file) => (
                <div key={file.uid} className='file-container'>
                  <div className='file-title'>
                    <i className='icon-pdf' />

                    <p>
                      {file.name}
                      <span>
                        {file.size !== undefined ? `${(file.size / 1000000).toFixed(2).replace('.', '/')} MB` : ''}
                      </span>
                    </p>
                  </div>
                  <i className='icon-trash' onClick={() => handleDelete(file.uid)} style={{ cursor: 'pointer' }} />
                </div>
              ))}
            </S.FilePreview>
          </div>
        </S.UploadContainer>
      ),
    },
  ];

  return (
    <S.AppContainer footer={footerButton}>
      <Container title={t('widget_name')} style={{ minHeight: '100%' }}>
        <Tabs defaultActiveKey='1' items={items} style={{ paddingTop: '3rem' }} />
      </Container>
    </S.AppContainer>
  );
};

export default App;
