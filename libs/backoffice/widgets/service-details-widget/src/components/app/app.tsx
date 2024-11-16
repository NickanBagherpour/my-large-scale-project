import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { useGetServiceDetailsQuery, useGetServiceClientsListQuery } from '../../services';
import {
  getDesktopColumns,
  //  getMobileColumns
} from '../../utils/services-table.util';
import * as S from './app.style';
import { FooterContainer } from '@oxygen/reusable-components';
import { useBounce } from '@oxygen/hooks';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const { data: serviceDetails, isFetching: isServiceFetching } = useGetServiceDetailsQuery();
  const { data: clientsList, isFetching: isClientsFetching } = useGetServiceClientsListQuery();
  const [pagination, setPagination] = useState<Pagination>({ page: 1, rowsPerPage: 5 });

  const [t] = useTr();
  const router = useRouter();
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

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList, file }) => {
    setFileList(newFileList);
  };

  const footerButton = (
    <Button className={'return-button'} color={'primary'} size={'large'} variant={'solid'}>
      {t('button.return')}
    </Button>
  );

  const tariffButton = (
    <>
      <Button type={'primary'} color='primary' variant='outlined' onClick={() => router.push('/edit-service')}>
        {t('button.cancel')}
      </Button>
      <Button type={'primary'} color='primary' variant='solid' onClick={() => router.push('/edit-service')}>
        {t('button.register')}
      </Button>
    </>
  );

  const scopeButton = (
    <>
      <Button type={'primary'} color='primary' variant='outlined' onClick={() => router.push('/edit-service')}>
        {t('button.cancel')}
      </Button>
      <Button type={'primary'} color='primary' variant='solid' onClick={() => router.push('/edit-service')}>
        {t('button.register')}
      </Button>
    </>
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
                onClick={() => router.push('/service-history')}
              >
                {t('see_changes_history')}
              </Button>
              <Button
                type={'primary'}
                color='primary'
                variant='solid'
                icon={<i className='icon-edit' />}
                onClick={() => router.push('/edit-service')}
              >
                {t('edit')}
              </Button>
            </div>
          </div>

          <InfoBox data={serviceDetails} margin={0} />
        </>
      ),
    },
    {
      key: '2',
      label: t('clients'),
      children: (
        <S.ItemsContainer className='clients-list' footer={footerButton}>
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

          <S.TableContainer>
            <Table
              // dataSource={clientsList?.content}
              dataSource={isClientsFetching ? [] : filteredClients}
              columns={desktopColumns}
              loading={isClientsFetching}
              hasContainer={true}
              rowKey={'requestId'}
            />
          </S.TableContainer>
        </S.ItemsContainer>
      ),
    },
    {
      key: '3',
      label: t('tariffs'),
      children: (
        <S.TariffContainer footer={tariffButton}>
          <div>
            <h3>{t('tariffs_list')}</h3>
            <div className='inputs-container'>
              <div>
                <span>{t('tariff')}</span>
                <Input />
              </div>
            </div>
          </div>
        </S.TariffContainer>
      ),
    },
    {
      key: '4',
      label: t('scopes'),
      children: (
        <S.ScopeList footer={scopeButton}>
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
        </S.ScopeList>
      ),
    },
    {
      key: '5',
      label: t('documents'),
      children: (
        <S.UploadContainer footer={footerButton}>
          <div className='button-container'>
            <Button type='primary' color='primary' variant='filled' icon={<i className='icon-clock' />}>
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
    <S.AppContainer>
      <Container title={t('widget_name')} style={{ minHeight: '100%' }}>
        <Tabs defaultActiveKey='1' items={items} style={{ paddingTop: '3rem' }} />
      </Container>
    </S.AppContainer>
  );
};

export default App;
