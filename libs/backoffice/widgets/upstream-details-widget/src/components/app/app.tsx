import { useSearchParams } from 'next/navigation';
import { createSchemaFieldRule } from 'antd-zod';
import { Form } from 'antd';
import { useAppState, resetErrorMessageAction, useAppDispatch } from '../../context';
import { useGetUpstreamDetailsQuery } from '../../services';
import UpstreamDetails from '../upstream-details-list/upstream-details-list';
import UpstreamInfo from '../upstream-info/upstream-info';
import * as S from './app.style';
import { Loading, Modal, Box, Button, Input, Select, Container } from '@oxygen/ui-kit';
import { useState } from 'react';

import { useTr } from '@oxygen/translation';
import { NoResult, FooterContainer, ReturnButton } from '@oxygen/reusable-components';
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

  const { data: upstreamDetails, isFetching: isUpstreamFetching } = useGetUpstreamDetailsQuery(fetchState);
  const [upstreamServer, setUpstreamServer] = useState<UpstreamDetailsTypeQuery>({
    list: { name: '', persianName: '', serverList: [] },
  });

  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();
  const rule = createSchemaFieldRule(ModalFormSchema(t));

  const [modalForm] = Form.useForm();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openServerRegisterModal, setOpenServerRegisterModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [selectedServerName, setSelectedServerName] = useState('');
  const [triggerRegisterAction, setTriggerRegisterAction] = useState(false);

  const queryClient = useQueryClient();

  const handleSubmit = () => {
    setTriggerRegisterAction(true);
  };

  const handleResetTriggerRegisterAction = () => {
    setTriggerRegisterAction(false);
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
          list: {
            name: oldData.list.name,
            persianName: oldData.list.persianName,
            serverList: oldData.list.serverList.filter((item) => item.domain !== domain),
          },
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
    setConfirmLoading(true);
    setTimeout(() => {
      setOpenServerRegisterModal(false);
      setConfirmLoading(false);
      setUpstreamServer((prevState) => ({
        ...prevState,
        list: {
          ...prevState.list,
          serverList: [...prevState.list.serverList, values],
        },
      }));
    }, 2000);
  };

  const handleToggleRegisterLoading = () => {
    setRegisterLoading((prev) => !prev);
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
        onCancel={handleServerRegisterCancel}
        headerDivider={true}
        centered
        okButtonProps={{ style: { backgroundColor: theme.primary.main } }}
        footer={[
          <Button
            type='primary'
            style={{ width: '100%', margin: 0 }}
            onClick={() => modalForm.submit()}
            loading={confirmLoading}
          >
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
                  <Select defaultValue='1' size={'large'}>
                    <Select.Option value='1'>{t('health')}</Select.Option>
                    <Select.Option value='0'>{t('unHealth')}</Select.Option>
                  </Select>
                </Form.Item>
              </S.InfoItemsRow>
            </S.InfoItemsContainer>
          </Form>
        </S.ModalMessage>
      </Modal>

      <S.UpstreamDetailsContainer title={upstreamId ? t('widget_name_details') : t('widget_name_creation')}>
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
          toggleLoading={handleToggleRegisterLoading}
          resetTriggerRegisterAction={handleResetTriggerRegisterAction}
        />
        {upstreamId && (
          <Box className={'table-container'}>
            <Loading spinning={isUpstreamFetching} size={'default'}>
              {upstreamDetails?.list?.serverList.length ? (
                <UpstreamDetails
                  isFetching={isUpstreamFetching}
                  data={upstreamDetails.list.serverList}
                  total={upstreamDetails.list.serverList.length}
                  isLoading={isUpstreamFetching}
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
            {
              <UpstreamDetails
                isFetching={isUpstreamFetching}
                data={upstreamServer?.list?.serverList}
                total={upstreamServer?.list?.serverList.length}
                isLoading={isUpstreamFetching}
                deleteUpstream={(domain, weight) => deleteHandler(domain, weight)}
              />
            }
          </Box>
        )}

        <FooterContainer>
          <ReturnButton />
          {!upstreamId && (
            <Button
              className={'register-button'}
              color={'primary'}
              size={'large'}
              onClick={handleSubmit}
              loading={registerLoading}
            >
              {t('button.register')}
            </Button>
          )}
        </FooterContainer>
      </S.UpstreamDetailsContainer>
    </>
  );
};

export default App;
