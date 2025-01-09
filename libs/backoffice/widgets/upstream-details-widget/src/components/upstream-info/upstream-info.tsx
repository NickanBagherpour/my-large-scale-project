import React, { useEffect, useState } from 'react';
import { createSchemaFieldRule } from 'antd-zod';
import { Form } from 'antd';
import { useTr } from '@oxygen/translation';
import * as S from './upstream-info.sytle';
import { updateSearchTerm, useAppDispatch, useAppState, updateUpstreamInfo } from '../../context';
import { FooterContainer, ReturnButton } from '@oxygen/reusable-components';
import { Button, Input } from '@oxygen/ui-kit';
import { FORM_ITEM_NAMES } from '../../utils/form-items-name';
import { useBounce } from '@oxygen/hooks';
import { PageProps } from '@oxygen/types';
import { FormSchema } from '../../types/setting.schema';
import { useFirstStepUpstreamInfoRegistrationMutationQuery } from '../../services/get-upstream-details.api';
import ErrorModal from './modal-confirm/modal-error';

// export default function UpstreamInfo() {
type UpstreamInfoProps = PageProps & {
  name?: string;
  persianName?: string;
  // addServer: () => void;
  triggerRegisterAction: boolean;
  toggleLoading: () => void;
  resetTriggerRegisterAction: () => void;
  setCurrentStep: (prev) => void;
};
const UpstreamInfo: React.FC<UpstreamInfoProps> = (props) => {
  const {
    name,
    persianName,
    // addServer,
    triggerRegisterAction,
    toggleLoading,
    resetTriggerRegisterAction,
    setCurrentStep,
  } = props;
  const [t] = useTr();
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [value, setValue] = useState('');
  const [form] = Form.useForm();

  const defaultValues = {
    [FORM_ITEM_NAMES.name]: name,
    [FORM_ITEM_NAMES.persianName]: persianName,
  };

  const [confirmModal, setConfirmModal] = useState(false);
  const { mutate: firstMutate, isPending: firstIsPending } = useFirstStepUpstreamInfoRegistrationMutationQuery();

  // useEffect(() => {
  //   form.setFieldsValue({
  //     [FORM_ITEM_NAMES.name]: name,
  //     [FORM_ITEM_NAMES.persianName]: persianName,
  //   });
  // }, [name, persianName, form]);

  useEffect(() => {
    if (triggerRegisterAction) {
      submitForm();
    }
  }, [triggerRegisterAction]);

  const rule = createSchemaFieldRule(FormSchema(t));

  useBounce(() => {
    updateSearchTerm(dispatch, value);
  }, [value]);

  const submitForm = () => {
    form.submit();
  };

  const onFinish = (values) => {
    debugger;
    const params = {
      name: values.name,
      description: values.persianName,
    };
    // setConfirmModal(true);
    // setCurrentStep((perv) => perv + 1);
    // updateUpstreamInfo(dispatch, values);

    firstMutate(params, {
      onSuccess: (data) => {
        debugger;
        console.log('request registration first step successful:', data);
        setCurrentStep((perv) => perv + 1);
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
        setConfirmModal(true);
        console.error('request registration first step  failed:', error);
      },
    });
    // toggleLoading();
    // setTimeout(() => {
    //   toggleLoading();
    //   resetTriggerRegisterAction();
    // }, 2000);
  };

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(state.firstStepDisabledSubmit);

  const checkFields = (_, allFields) => {
    const hasErrors = allFields.some((field) => field.errors.length > 0 || !field.value);
    setIsSubmitDisabled(hasErrors);
  };

  const toggleModal = () => {
    setConfirmModal(false);
  };

  return (
    <S.UpstreamInfoContainer>
      <ErrorModal isOpen={confirmModal} toggle={() => toggleModal()} trackCode='2' />
      <Form
        layout={'vertical'}
        style={{ width: '100%', flexGrow: 1 }}
        onFinish={onFinish}
        form={form}
        // initialValues={defaultValues}
        initialValues={state.upstreamInfo}
        onFieldsChange={checkFields}
      >
        <S.InfoItemsContainer>
          <Form.Item name={FORM_ITEM_NAMES.name} label={t('form.name')} rules={[rule]}>
            <Input />
          </Form.Item>
          <Form.Item name={FORM_ITEM_NAMES.persianName} label={t('form.persianName')} rules={[rule]}>
            <Input />
          </Form.Item>
        </S.InfoItemsContainer>
      </Form>
      <FooterContainer>
        <ReturnButton />
        {
          <Button
            className={'register-button'}
            color={'primary'}
            size={'large'}
            disabled={isSubmitDisabled}
            onClick={submitForm}
            loading={firstIsPending}
          >
            {t('button.register')}
          </Button>
        }
      </FooterContainer>
      {/* <S.Actions>
        <S.UpstreamServerTitle>{t('upstream_server_title')}</S.UpstreamServerTitle>
        <Button color={'secondary'} onClick={() => addServer()}>
          <i className={'icon-plus'}></i>
          {t('add_server')}
        </Button>
      </S.Actions> */}
    </S.UpstreamInfoContainer>
  );
};

export default UpstreamInfo;
