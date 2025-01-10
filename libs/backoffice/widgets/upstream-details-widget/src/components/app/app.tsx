import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { createSchemaFieldRule } from 'antd-zod';
import { Form } from 'antd';
import { Loading } from '@oxygen/ui-kit';

import { useTr } from '@oxygen/translation';
import { Modal, Box, Button, Input, Select } from '@oxygen/ui-kit';
import { NoResult, FooterContainer, ReturnButton, GlobalMessageContainer } from '@oxygen/reusable-components';
import { Nullable } from '@oxygen/types';
import { RQKEYS } from '@oxygen/utils';
import { useAppTheme } from '@oxygen/hooks';

// import { useAddServerToUpstreamMutationQuery } from '../../services/get-upstream-details.api';
import { useAppState, resetErrorMessageAction, useAppDispatch } from '../../context';
import {
  useGetUpstreamDetailsQuery,
  useAddServerToUpstreamMutationQuery,
  useDeleteServerFromUpstreamMutationQuery,
} from '../../services';
import UpstreamDetails from '../upstream-details-list/upstream-details-list';
import UpstreamInfo from '../upstream-info/upstream-info';
import { ParamsType, UpstreamDetailsTypeQuery, UpstreamDetailsType } from '../../types';
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
  const upstreamId: Nullable<string> = searchParams.get('upstreamId');
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
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [selectedServerName, setSelectedServerName] = useState('');
  const [triggerRegisterAction, setTriggerRegisterAction] = useState(false);

  // type ServerInfoType = {
  //   domain: string;
  //   healthStatus: string;
  //   weight: string;
  // };
  const [serverInfo, setServerInfo] = useState<UpstreamDetailsType | undefined>(undefined);
  const [waitingModal, setWaitingModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  // const [serverInfo, setServerInfo] = useState(undefined);

  const upstreamDetailsTitle = upstreamName ? upstreamName : 'widget_name_details';
  const queryClient = useQueryClient();
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

  const handleSubmit = () => {
    setTriggerRegisterAction(true);
  };

  const handleResetTriggerRegisterAction = () => {
    setTriggerRegisterAction(false);
  };

  const deleteHandler = (id: number, domain: string, weight: string, healthStatus: string) => {
    debugger;
    setOpenDeleteModal(true);
    // setSelectedServerName(domain);
    // const record = upstreamServer.list.serverList.find((item) => item.domain === domain);
    setServerInfo({ domain: domain, healthStatus: healthStatus, weight: weight });
    setSelectedServerId(id);
  };

  const editHandler = (id: number, domain: string, weight: string, healthStatus: string) => {
    debugger;
    console.log(upstreamServer.list.serverList);
    // const record = upstreamServer.list.serverList.find((item) => item.domain === domain);
    // setServerInfo(record);

    registerHandler();
    setSelectedServerId(id);
    addServerModalForm.setFieldsValue({
      [FORM_ITEM_NAMES.domain]: domain,
      [FORM_ITEM_NAMES.weight]: weight,
    });
  };

  const handleDeleteOk = () => {
    debugger;
    deleteServerMutate(selectedServerId, {
      onSuccess: (data) => {
        debugger;
        setOpenDeleteModal(false);
        refetch();
        console.log('request registration first step successful:', data);
        // setSuccessModal(true);
        // setWaitingModal(false);
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
        setOpenDeleteModal(false);
        // setWaitingModal(false);
        // setErrorModal(true);
        // setServerInfo(values);
        // setConfirmModal(true);
        console.error('request registration first step  failed:', error);
      },
    });
    // setConfirmLoading(true);

    // setTimeout(() => {
    //   setUpstreamServer((prevState) => ({
    //     ...prevState,
    //     list: {
    //       ...prevState.list,
    //       serverList: prevState.list.serverList.filter((item) => item.domain !== domain),
    //     },
    //   }));
    //   queryClient.setQueryData([RQKEYS.UPSTREAM_DETAILS.GET_LIST, fetchState], (oldData: UpstreamDetailsTypeQuery) => {
    //     if (!oldData) return;
    //     return {
    //       ...oldData,
    //       list: {
    //         name: oldData.list.name,
    //         persianName: oldData.list.persianName,
    //         serverList: oldData.list.serverList.filter((item) => item.domain !== domain),
    //       },
    //     };
    //   });

    //   setOpenDeleteModal(false);
    //   setConfirmLoading(false);
    // }, 2000);
  };

  const handleDeleteCancel = () => {
    console.log('Clicked cancel button');
    setOpenDeleteModal(false);
  };

  const registerHandler = () => {
    debugger;
    setSelectedServerId(null);
    addServerModalForm.resetFields();
    setOpenServerRegisterModal(true);
  };

  const handleServerRegisterCancel = () => {
    console.log('Clicked cancel button');
    setOpenServerRegisterModal(false);
  };

  const handleTryAgain = () => {
    debugger;
    handleFinish(serverInfo);
  };

  const handleFinish = (values: any) => {
    debugger;
    console.log('handleFinish');
    setWaitingModal(true);
    setErrorModal(false);
    setSuccessModal(false);
    // setConfirmLoading(true);

    // setTimeout(() => {
    //   setOpenServerRegisterModal(false);
    //   setConfirmLoading(false);
    //   setUpstreamServer((prevState) => ({
    //     ...prevState,
    //     list: {
    //       ...prevState.list,
    //       serverList: [...prevState.list.serverList, values],
    //     },
    //   }));
    //   queryClient.setQueryData([RQKEYS.UPSTREAM_DETAILS.GET_LIST, fetchState], (oldData: UpstreamDetailsTypeQuery) => {
    //     if (!oldData) return;

    //     // Create a Set of existing domain names for quick lookup
    //     const existingDomains = new Set(oldData.list.serverList.map((item) => item.domain));

    //     // Filter new servers to only include those with domains not already in existingDomains
    //     const newServers = (upstreamServer?.list?.serverList || []).filter((item) => !existingDomains.has(item.domain));

    //     return {
    //       ...oldData,
    //       list: {
    //         name: oldData.list.name,
    //         persianName: oldData.list.persianName,
    //         serverList: [...oldData.list.serverList, ...newServers, values],
    //       },
    //     };
    //   });
    // }, 2000);
    const params = {
      upstreamName: upstreamName,
      domain: values.domain,
      weight: parseInt(values.weight),
      id: selectedServerId ? selectedServerId : null,
    };
    addServerMutate(params, {
      onSuccess: (data) => {
        debugger;
        refetch();
        console.log('request registration first step successful:', data);
        setSuccessModal(true);
        setWaitingModal(false);
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
        setWaitingModal(false);
        setErrorModal(true);
        setServerInfo(values);
        // setConfirmModal(true);
        console.error('request registration first step  failed:', error);
      },
    });
  };

  const handleToggleRegisterLoading = () => {
    setRegisterLoading((prev) => !prev);
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

  enum StepsItemKey {
    FirstStep = 0,
    SecondStep = 1,
  }
  const stepValue: StepsItemKey = StepsItemKey.FirstStep;

  // const [currentStep, setCurrentStep] = useState(stepValue);

  // const stepsItem = [
  //   {
  //     title: t('progress_bar.first_step'),
  //     Content: (
  //       // <FirstStep
  //       //   setCurrentStep={setCurrentStep}
  //       //   data={requestData}
  //       //   loading={isFetching}
  //       //   draft={stepName ? true : false}
  //       // />
  //       // <span>first</span>
  //       <UpstreamInfo
  //         setCurrentStep={setCurrentStep}
  //         // addServer={registerHandler}
  //         name={upstreamId ? upstreamDetails?.list.name : ''}
  //         persianName={upstreamId ? upstreamDetails?.list.persianName : ''}
  //         triggerRegisterAction={triggerRegisterAction}
  //         toggleLoading={handleToggleRegisterLoading}
  //         resetTriggerRegisterAction={handleResetTriggerRegisterAction}
  //       />
  //     ),
  //   },
  //   {
  //     title: t('progress_bar.second_step'),
  //     Content: (
  //       <S.UpstreamDetailsContent>
  //         {upstreamId && (
  //           <Box className={'table-container'}>
  //             {upstreamDetails?.list?.serverList.length ? (
  //               <UpstreamDetails
  //                 setCurrentStep={setCurrentStep}
  //                 addServer={registerHandler}
  //                 isFetching={isUpstreamFetching}
  //                 data={upstreamDetails?.list?.serverList}
  //                 total={upstreamDetails?.list?.serverList.length}
  //                 isLoading={isUpstreamFetching}
  //                 deleteUpstream={(domain) => deleteHandler(domain)}
  //                 editUpstream={(domain) => editHandler(domain)}
  //               />
  //             ) : (
  //               <NoResult isLoading={isUpstreamFetching} />
  //             )}
  //           </Box>
  //         )}
  //         {!upstreamId && (
  //           <Box className={'table-container'}>
  //             {
  //               <UpstreamDetails
  //                 setCurrentStep={setCurrentStep}
  //                 addServer={registerHandler}
  //                 isFetching={upstreamServer?.list?.serverList.length ? isUpstreamFetching : false}
  //                 data={upstreamServer?.list?.serverList}
  //                 total={upstreamServer?.list?.serverList.length}
  //                 isLoading={isUpstreamFetching}
  //                 deleteUpstream={(domain) => deleteHandler(domain)}
  //                 editUpstream={(domain) => editHandler(domain)}
  //               />
  //             }
  //           </Box>
  //         )}
  //       </S.UpstreamDetailsContent>
  //     ),
  //   },
  // ];

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
        // selectedServerName={selectedServerName}
        data={serverInfo ? [serverInfo] : undefined}
      />
      <ErrorModal isOpen={errorModal} toggle={() => toggleErrorModal()} tryAgain={() => handleTryAgain()} />
      <WaitingModal isOpen={waitingModal} toggle={() => toggleWaitingModal()} />
      <SuccessModal isOpen={successModal} toggle={() => toggleSuccessModal()} id={selectedServerId} />
      {/* <Modal
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
      </Modal> */}
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
            // loading={confirmLoading}
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
          {/* <UpstreamInfo
            // setCurrentStep={setCurrentStep}
            // addServer={registerHandler}
            name={'sadad'}
            persianName={'test-nickan'}
            triggerRegisterAction={triggerRegisterAction}
            toggleLoading={handleToggleRegisterLoading}
            resetTriggerRegisterAction={handleResetTriggerRegisterAction}
          /> */}
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

            {/* <Box className={'table-container'}>
            {upstreamDetails?.list?.serverList.length ? (
              <UpstreamDetails
                isFetching={isUpstreamFetching}
                data={upstreamDetails?.list?.serverList}
                total={upstreamDetails?.list?.serverList.length}
                isLoading={isUpstreamFetching}
                deleteUpstream={(domain) => deleteHandler(domain)}
              />
            ) : (
              <NoResult isLoading={isUpstreamFetching} />
            )}
          </Box> */}
            {/* <Loading spinning={isUpstreamFetching}>
          {!isUpstreamFetching && <S.Steps items={stepsItem} current={currentStep} />}
        </Loading> */}
            {/* <S.Steps items={stepsItem} current={currentStep} />
        {stepsItem[currentStep].Content} */}

            {/* {upstreamId && (
          <Box className={'table-container'}>
            {upstreamDetails?.list?.serverList.length ? (
              <UpstreamDetails
                isFetching={isUpstreamFetching}
                data={upstreamDetails?.list?.serverList}
                total={upstreamDetails?.list?.serverList.length}
                isLoading={isUpstreamFetching}
                deleteUpstream={(domain) => deleteHandler(domain)}
              />
            ) : (
              <NoResult isLoading={isUpstreamFetching} />
            )}
          </Box>
        )}
        {!upstreamId && (
          <Box className={'table-container'}>
            {
              <UpstreamDetails
                isFetching={upstreamServer?.list?.serverList.length ? isUpstreamFetching : false}
                data={upstreamServer?.list?.serverList}
                total={upstreamServer?.list?.serverList.length}
                isLoading={isUpstreamFetching}
                deleteUpstream={(domain) => deleteHandler(domain)}
              />
            }
          </Box>
        )} */}

            {/* <FooterContainer>
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
        </FooterContainer> */}
          </S.UpstreamDetailsContainer>
          <S.BoxContainer className={'table-container'}>
            {
              <UpstreamDetails
                // setCurrentStep={setCurrentStep}
                addServer={registerHandler}
                isFetching={upstreamServer?.list?.serverList.length ? isUpstreamFetching : false}
                data={upstreamServer?.list?.serverList}
                total={upstreamServer?.list?.serverList.length}
                // isLoading={isUpstreamFetching}
                // isFetching={isUpstreamFetching}
                // data={upstreamDetailsInfo?.targets}
                // total={upstreamDetailsInfo?.targets.length}
                // isLoading={isUpstreamFetching}
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
