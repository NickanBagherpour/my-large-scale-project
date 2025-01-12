import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { createSchemaFieldRule } from 'antd-zod';
import { Form } from 'antd';
import { Loading } from '@oxygen/ui-kit';

import { useTr } from '@oxygen/translation';
import { Modal, Button, Input, Select } from '@oxygen/ui-kit';
import { GlobalMessageContainer } from '@oxygen/reusable-components';
import { Nullable } from '@oxygen/types';
import { useAppTheme } from '@oxygen/hooks';

import { useAppState, resetErrorMessageAction, useAppDispatch } from '../../context';
import {
  useGetUpstreamDetailsQuery,
  useAddServerToUpstreamMutationQuery,
  useDeleteServerFromUpstreamMutationQuery,
} from '../../services';
import UpstreamDetails from '../upstream-details-list/upstream-details-list';
import { UpstreamDetailsTypeQuery, UpstreamDetailsType } from '../../types';
import { ModalFormSchema } from '../../types/setting.schema';
import { FORM_ITEM_NAMES } from '../../utils/form-items-name';

import UpstreamDetailsInfo from '../upstream-details-info/upstream-details-info';
import ServerDeleteModal from '../modal-delete-server/modal-delete-server';
import WaitingModal from '../modal-waiting/modal-waiting';
import SuccessModal from '../modal-success/modal-success';
import ErrorModal from '../modal-error/modal-error';

import * as S from './app.style';

const App = () => {
  const theme = useAppTheme();
  const { errorMessage, ...fetchState } = useAppState();
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  const searchParams = useSearchParams();
  const upstreamName: Nullable<string> = searchParams.get('upstreamName');

  const {
    data: upstreamDetailsInfo,
    isFetching: isUpstreamFetching,
    refetch,
  } = useGetUpstreamDetailsQuery(upstreamName);
  const { mutate: addServerMutate, isPending: addServerIsPending } = useAddServerToUpstreamMutationQuery();
  const { mutate: deleteServerMutate, isPending: deleteServerIsPending } = useDeleteServerFromUpstreamMutationQuery();
  const [upstreamServer, setUpstreamServer] = useState<UpstreamDetailsTypeQuery>({
    list: { name: '', persianName: '', serverList: [] },
  });

  const [selectedServerId, setSelectedServerId] = useState<number | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openServerRegisterModal, setOpenServerRegisterModal] = useState(false);

  const [serverInfo, setServerInfo] = useState<UpstreamDetailsType | undefined>(undefined);
  const [waitingModal, setWaitingModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);

  const rule = createSchemaFieldRule(ModalFormSchema(t));
  const [addServerModalForm] = Form.useForm();

  useEffect(() => {
    if (upstreamDetailsInfo?.targets) {
      setUpstreamServer((prev) => ({
        ...prev,
        list: {
          ...prev.list,
          serverList: upstreamDetailsInfo.targets, // Update serverList with targets
        },
      }));
    }
  }, [upstreamDetailsInfo]);

  const deleteHandler = (id: number, domain: string, weight: string, healthStatus: string) => {
    setOpenDeleteModal(true);
    setServerInfo({ domain: domain, healthStatus: healthStatus, weight: weight });
    setSelectedServerId(id);
  };

  const editHandler = (id: number, domain: string, weight: string, healthStatus: string) => {
    registerHandler();
    setSelectedServerId(id);
    addServerModalForm.setFieldsValue({
      [FORM_ITEM_NAMES.domain]: domain,
      [FORM_ITEM_NAMES.weight]: weight,
    });
  };

  const handleDeleteOk = () => {
    deleteServerMutate(selectedServerId, {
      onSuccess: (data) => {
        setOpenDeleteModal(false);
        refetch();
        console.log('request delete server successful:', data);
      },
      onError: (error) => {
        setOpenDeleteModal(false);
        console.error('request delete server  failed:', error);
      },
    });
  };

  const handleDeleteCancel = () => {
    console.log('Clicked cancel button');
    setOpenDeleteModal(false);
  };

  const registerHandler = () => {
    setSelectedServerId(null);
    addServerModalForm.resetFields();
    setOpenServerRegisterModal(true);
  };

  const handleServerRegisterCancel = () => {
    setOpenServerRegisterModal(false);
  };

  const handleTryAgain = () => {
    handleFinish(serverInfo);
  };

  const handleFinish = (values: any) => {
    console.log('handleFinish');
    setWaitingModal(true);
    setErrorModal(false);
    setSuccessModal(false);

    const params = {
      upstreamName: upstreamName,
      domain: values.domain,
      weight: parseInt(values.weight),
      id: selectedServerId ? selectedServerId : null,
    };
    addServerMutate(params, {
      onSuccess: (data) => {
        refetch();
        console.log('request add server successful:', data);
        setSuccessModal(true);
        setWaitingModal(false);
        setOpenServerRegisterModal(false);
      },
      onError: (error) => {
        setWaitingModal(false);
        setErrorModal(true);
        setServerInfo(values);
        setOpenServerRegisterModal(false);
        console.error('request add server  failed:', error);
      },
    });
  };

  const toggleErrorModal = () => {
    setErrorModal(false);
  };
  const toggleWaitingModal = () => {
    setWaitingModal(false);
  };

  const toggleSuccessModal = () => {
    setSuccessModal(false);
  };

  return (
    <>
      <ServerDeleteModal
        title={t('delete_server')}
        open={openDeleteModal}
        onOk={() => handleDeleteOk()}
        confirmLoading={deleteServerIsPending}
        onCancel={handleDeleteCancel}
        headerDivider={false}
        centered
        cancelText={t('button.cancel')}
        okText={t('button.delete')}
        okButtonProps={{ style: { backgroundColor: theme.error.main } }}
        cancelButtonProps={{ style: { color: theme.primary.main } }}
        data={serverInfo ? [serverInfo] : undefined}
      />
      <ErrorModal isOpen={errorModal} toggle={() => toggleErrorModal()} tryAgain={() => handleTryAgain()} />
      <WaitingModal isOpen={waitingModal} toggle={() => toggleWaitingModal()} />
      <SuccessModal isOpen={successModal} toggle={() => toggleSuccessModal()} id={selectedServerId} />
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
            onClick={() => addServerModalForm.submit()}
            loading={addServerIsPending}
          >
            {t('register_server')}
          </Button>,
        ]}
      >
        <S.ModalMessage>
          <Form layout={'vertical'} style={{ width: '100%' }} form={addServerModalForm} onFinish={handleFinish}>
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
                  <Input allow={'number'} />
                </Form.Item>
              </S.InfoItemsRow>
              <S.InfoItemsRow>
                <span className='info-items-title'>{t('health_status')}</span>
                <Form.Item name={FORM_ITEM_NAMES.health_status} rules={[rule]} initialValue={'1'}>
                  <Select size={'large'} disabled={true}>
                    <Select.Option value='1'>{t('health')}</Select.Option>
                    <Select.Option value='0'>{t('unHealth')}</Select.Option>
                  </Select>
                </Form.Item>
              </S.InfoItemsRow>
            </S.InfoItemsContainer>
          </Form>
        </S.ModalMessage>
      </Modal>

      <Loading spinning={isUpstreamFetching}>
        <S.WidgetContainer>
          <S.UpstreamDetailsContainer title={upstreamName ? t(upstreamName) : t('widget_name_creation')}>
            <GlobalMessageContainer
              containerProps={{ marginBottom: '2.4rem' }}
              message={state.errorMessage}
              onClose={() => {
                resetErrorMessageAction(dispatch);
              }}
            />
            <UpstreamDetailsInfo
              loading={isUpstreamFetching}
              infoData={{ name: upstreamDetailsInfo?.name, description: upstreamDetailsInfo?.description }}
            />
          </S.UpstreamDetailsContainer>
          <S.BoxContainer className={'table-container'}>
            {
              <UpstreamDetails
                addServer={registerHandler}
                isFetching={upstreamServer?.list?.serverList.length ? isUpstreamFetching : false}
                data={upstreamServer?.list?.serverList}
                total={upstreamServer?.list?.serverList.length}
                deleteUpstream={(id, domain, weight, healthStatus) => deleteHandler(id, domain, weight, healthStatus)}
                editUpstream={(id, domain, weight, healthStatu) => editHandler(id, domain, weight, healthStatu)}
              />
            }
          </S.BoxContainer>
        </S.WidgetContainer>
      </Loading>
    </>
  );
};

export default App;
