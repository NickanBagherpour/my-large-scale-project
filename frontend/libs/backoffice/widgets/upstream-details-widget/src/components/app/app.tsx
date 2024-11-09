import { useRouter, useSearchParams } from 'next/navigation';
import { createSchemaFieldRule } from 'antd-zod';
import { Form } from 'antd';
import { useAppState, resetErrorMessageAction, useAppDispatch } from '../../context';
import { useGetUpstreamDetailsQuery } from '../../services';
import UpstreamDetails from '../upstream-details-list/upstream-details-list';
import UpstreamInfo from '../upstream-info/upstream-info';
import * as S from './app.style';
import { Loading, Modal, Box, Button, Input, Select } from '@oxygen/ui-kit';
import { useState } from 'react';

import { useTr } from '@oxygen/translation';
import { NoResult } from '@oxygen/reusable-components';
import { GlobalMessageContainer } from '@oxygen/reusable-components';
import { Nullable, PageProps } from '@oxygen/types';
import { useTheme } from 'styled-components';
import { ParamsType, UpstreamDetailsType, UpstreamDetailsTypeQuery } from '../../types';
import { useQueryClient } from '@tanstack/react-query';
import { RQKEYS } from '@oxygen/utils';
import { ModalFormSchema } from '../../types/setting.schema';
import { FORM_ITEM_NAMES } from '../../utils/form-items-name';

const App = () => {
  const theme = useTheme();
  const { errorMessage, ...fetchState } = useAppState();

  const searchParams = useSearchParams();
  const upstreamId: Nullable<string> = searchParams.get('upstreamId');

  const { data: upstreamDetails, isFetching: isClientsFetching } = useGetUpstreamDetailsQuery(fetchState);
  const [upstreamServer, setUpstreamServer] = useState<UpstreamDetailsTypeQuery>({
    list: [],
    total: 0,
  });

  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();
  const rule = createSchemaFieldRule(ModalFormSchema(t));

  const [modalForm] = Form.useForm();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openServerRegisterModal, setOpenServerRegisterModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedServerName, setSelectedServerName] = useState('');
  const [triggerRegisterAction, setTriggerRegisterAction] = useState(false);

  const queryClient = useQueryClient();

  const router = useRouter();
  const handleReturn = () => {
    router.back();
  };

  const handleSubmit = () => {
    setTriggerRegisterAction((prev) => !prev);
    console.log('submit');
  };

  const deleteHandler = (domain: string, weight: ParamsType) => {
    setOpenDeleteModal(true);
    setSelectedServerName(domain);
  };

  const handleDeleteOk = (domain: string) => {
    setConfirmLoading(true);
    setTimeout(() => {
      queryClient.setQueryData([RQKEYS.UPSTREAM_DETAILS.GET_LIST, fetchState], (oldData: UpstreamDetailsTypeQuery) => {
        if (!oldData) return;
        return {
          ...oldData,
          list: oldData.list.filter((item) => item.domain !== domain),
        };
      });

      setOpenDeleteModal(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleDeleteCancel = () => {
    console.log('Clicked cancel button');
    setOpenDeleteModal(false);
  };

  const registerHandler = () => {
    modalForm.resetFields();
    setOpenServerRegisterModal(true);
  };

  const handleServerRegisterCancel = () => {
    console.log('Clicked cancel button');
    setOpenServerRegisterModal(false);
  };

  const handleFinish = (values: any) => {
    setOpenServerRegisterModal(false);
  };

  return (
    <>
      <Modal
        title={t('delete_server')}
        open={openDeleteModal}
        onOk={() => handleDeleteOk(selectedServerName)}
        confirmLoading={confirmLoading}
        onCancel={handleDeleteCancel}
        headerDivider={true}
        centered
        cancelText={t('button.cancel')}
        okText={t('button.delete')}
        okButtonProps={{ style: { backgroundColor: theme.error.main } }}
        cancelButtonProps={{ style: { color: theme.primary.main } }}
      >
        <S.ModalMessage>
          {t('delete_server_question')}
          <S.ServiceName
            text={selectedServerName}
            highlightColor={theme.error.main}
            wordToHighlight={selectedServerName}
          />
          {t('are_you_sure')}
        </S.ModalMessage>
      </Modal>
      <Modal
        title={t('add_server')}
        open={openServerRegisterModal}
        confirmLoading={confirmLoading}
        onCancel={handleServerRegisterCancel}
        headerDivider={true}
        centered
        okButtonProps={{ style: { backgroundColor: theme.primary.main } }}
        footer={[
          <Button type='primary' style={{ width: '100%', margin: 0 }} onClick={() => modalForm.submit()}>
            {t('register_server')}
          </Button>,
        ]}
      >
        <S.ModalMessage>
          <Form layout={'vertical'} style={{ width: '100%' }} form={modalForm} onFinish={handleFinish}>
            <S.InfoItemsContainer>
              <S.InfoItemsRow>
                <span className='info-items-title'>{t('domain')} / IP PORT</span>
                <Form.Item name={FORM_ITEM_NAMES.domain} rules={[rule]}>
                  <Input />
                </Form.Item>
              </S.InfoItemsRow>

              <S.InfoItemsRow>
                <span className='info-items-title'>{t('weight')}</span>
                <Form.Item name={FORM_ITEM_NAMES.weight} rules={[rule]}>
                  <Input />
                </Form.Item>
              </S.InfoItemsRow>
              <S.InfoItemsRow>
                <span className='info-items-title'>{t('health_status')}</span>
                <Form.Item name={FORM_ITEM_NAMES.health_status} rules={[rule]}>
                  <Select defaultValue='1' size={'middle'}>
                    <Select.Option value='1'>سالم</Select.Option>
                    <Select.Option value='0'>ناسالم</Select.Option>
                  </Select>
                </Form.Item>
              </S.InfoItemsRow>
            </S.InfoItemsContainer>
          </Form>
        </S.ModalMessage>
      </Modal>
      <Loading spinning={isClientsFetching} size='large'>
        <S.UpstreamDetailsContainer title={t('widget_name')}>
          <GlobalMessageContainer
            containerProps={{ marginBottom: '2.4rem' }}
            message={state.errorMessage}
            onClose={() => {
              resetErrorMessageAction(dispatch);
            }}
          />
          <UpstreamInfo
            name={upstreamId ? upstreamDetails?.list.name : ''}
            persianName={upstreamId ? upstreamDetails?.list.persianName : ''}
            addServer={registerHandler}
            triggerRegisterAction={triggerRegisterAction}
          />
          {upstreamId && (
            <Box className={'table-container'}>
              <Loading spinning={isClientsFetching} size='large'>
                {upstreamDetails?.list.serverList.length ? (
                  <UpstreamDetails
                    isFetching={isClientsFetching}
                    data={upstreamDetails.list.serverList}
                    total={upstreamDetails.list.serverList.length}
                    isLoading={isClientsFetching}
                    deleteUpstream={(domain, weight) => deleteHandler(domain, weight)}
                  />
                ) : (
                  <NoResult isLoading={false} />
                )}
              </Loading>
            </Box>
          )}
          {!upstreamId && (
            <Box className={'table-container'}>
              {/* <Loading spinning={isClientsFetching} size='large'> */}
              {
                <UpstreamDetails
                  isFetching={isClientsFetching}
                  data={upstreamServer?.list}
                  total={upstreamServer?.total}
                  isLoading={isClientsFetching}
                  deleteUpstream={(domain, weight) => deleteHandler(domain, weight)}
                />
              }
              {/* </Loading> */}
            </Box>
          )}

          <S.FooterContainer>
            <Button
              className={'register-button'}
              // variant={'outlined'}
              color={'primary'}
              size={'large'}
              onClick={handleReturn}
            >
              {t('button.return')}
            </Button>
            {!upstreamId && (
              <Button
                className={'return-button'}
                variant={'outlined'}
                color={'primary'}
                size={'large'}
                onClick={handleSubmit}
              >
                {t('button.register')}
              </Button>
            )}
          </S.FooterContainer>
        </S.UpstreamDetailsContainer>
      </Loading>
    </>
  );
};

export default App;
