import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { LocalStorageKey } from '@oxygen/types';
import { useLocalStorage } from '@oxygen/hooks';

import { Card, Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { dayjs } from '@oxygen/utils';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { Button, Input, SearchItemsContainer, Icons, Select, DatePicker } from '@oxygen/ui-kit';

import { requestRegistrationFormSchema } from '../../types';
import { FORM_ITEM, MAX_INPUTE_LENGTH, MAX_MOBILE_NUMBER_LENGTH, selectLegalTypeOptions } from '../../utils/consts';
import {
  useSelectDataQuery,
  useFirstStepRequestRegistrationMutationQuery,
  useGetOrganizationDataMutationQuery,
} from '../../services/first-step/first-step-data';
import { updateFirstStepAction, useAppDispatch, useAppState } from '../../context';

import * as S from './first-step.style';

type FirstStepProps = PageProps & {
  setCurrentStep: (prev) => void;
};

const FirstStep: React.FC<FirstStepProps> = (props) => {
  const { setCurrentStep } = props;
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  const router = useRouter();
  const [form] = Form.useForm();

  const [requestRegistration, setRequestRegistration, removeRequestRegistration] = useLocalStorage<any>(
    LocalStorageKey.REQUEST_REGISTRATION
  );

  // const { data: selectData, isFetching: selectFetching } = useSelectDataQuery();
  const rule = createSchemaFieldRule(requestRegistrationFormSchema(t));
  const { mutate: firstMutate, isPending: firstIsPending } = useFirstStepRequestRegistrationMutationQuery();

  const { mutate: secondMutate, isPending: secondIsPending } = useGetOrganizationDataMutationQuery();

  useEffect(() => {
    const params = requestRegistration;
    if (requestRegistration) {
      secondMutate(params, {
        onSuccess: (data) => {
          console.log('get organization data:', data);
          // setRequestRegistration({ organization: data.data.organization.id, submissionId: data.data.submissionId });

          // updateFirstStepAction(dispatch, values);
          // setCurrentStep((perv) => perv + 1);
        },
        onError: (error) => {
          console.error('request registration first step  failed:', error);
        },
      });
    }
  }, [requestRegistration]);

  const onFinish = (values) => {
    const params = {
      legalName: values.legal_person_name,
      legalType: values.legal_person_type,
      registerNo: values.registration_number,
      registerDate: dayjs(values.registration_date).format('YYYY/MM/DD'),
      organizationNationalId: values.national_id,
      economicCode: values.economy_code,
      activityIndustry: values.activity_field,
      postalCode: values.postal_code,
      phone: values.phone,
      registeredAddress: values.last_registration_address,
    };

    firstMutate(params, {
      onSuccess: (data) => {
        console.log('request registration first step successful:', data);
        setRequestRegistration({ organization: data.data.organization.id, submissionId: data.data.submissionId });

        updateFirstStepAction(dispatch, values);
        setCurrentStep((perv) => perv + 1);
      },
      onError: (error) => {
        console.error('request registration first step  failed:', error);
      },
    });
  };

  const handleReturn = () => {
    router.back();
  };

  return (
    <S.FirstStepContainer>
      <Form layout={'vertical'} onFinish={onFinish} form={form} initialValues={state.firstStep}>
        <S.TitleTxt className={'cards-title'}>{t('register_info')}</S.TitleTxt>
        <Card>
          <SearchItemsContainer $columnNumber='3'>
            <Form.Item name={FORM_ITEM.legal_person_name} label={t('form.legal_person_name')} rules={[rule]}>
              <Input size='large' placeholder={`${t('placeholder.legal_person_name')}`} maxLength={MAX_INPUTE_LENGTH} />
            </Form.Item>

            <Form.Item name={FORM_ITEM.legal_person_type} label={t('form.legal_person_type')} rules={[rule]}>
              <Select
                size={'large'}
                options={selectLegalTypeOptions}
                // loading={selectFetching}
                placeholder={`${t('placeholder.legal_person_type')}`}
              ></Select>
            </Form.Item>

            <Form.Item name={FORM_ITEM.registration_number} label={t('form.registration_number')} rules={[rule]}>
              <Input
                placeholder={`${t('placeholder.registration_number')}`}
                maxLength={MAX_INPUTE_LENGTH}
                allow={'number'}
              />
            </Form.Item>
            <Form.Item name={FORM_ITEM.registration_date} label={t('form.registration_date')} rules={[rule]}>
              {/* <DatePicker placeholder={`${t('placeholder.registration_date')}`} /> */}
              <DatePicker placeholder={`${t('placeholder.registration_date')}`} suffixIcon={<Icons.Calender />} />
            </Form.Item>
            <Form.Item name={FORM_ITEM.national_id} label={t('form.national_id')} rules={[rule]}>
              <Input placeholder={`${t('placeholder.national_id')}`} maxLength={MAX_INPUTE_LENGTH} allow={'number'} />
            </Form.Item>
            <Form.Item name={FORM_ITEM.economy_code} label={t('form.economy_code')} rules={[rule]}>
              <Input placeholder={`${t('placeholder.economy_code')}`} maxLength={MAX_INPUTE_LENGTH} allow={'number'} />
            </Form.Item>
            <Form.Item name={FORM_ITEM.activity_field} label={t('form.activity_field')} rules={[rule]}>
              <Input placeholder={`${t('placeholder.activity_field')}`} maxLength={MAX_INPUTE_LENGTH} />
            </Form.Item>
            <Form.Item name={FORM_ITEM.postal_code} label={t('form.postal_code')} rules={[rule]}>
              <Input placeholder={`${t('placeholder.postal_code')}`} maxLength={MAX_INPUTE_LENGTH} allow={'number'} />
            </Form.Item>
            <Form.Item name={FORM_ITEM.phone} label={t('form.phone')} rules={[rule]}>
              <Input placeholder={`${t('placeholder.phone')}`} maxLength={MAX_INPUTE_LENGTH} allow={'number'} />
            </Form.Item>
            <Form.Item
              className='full-width-3'
              name={FORM_ITEM.last_registration_address}
              label={t('form.last_registration_address')}
              rules={[rule]}
            >
              <Input placeholder={`${t('placeholder.last_registration_address')}`} maxLength={MAX_INPUTE_LENGTH} />
            </Form.Item>
          </SearchItemsContainer>
        </Card>
      </Form>
      <S.Footer>
        <Button loading={firstIsPending} variant={'outlined'} onClick={handleReturn}>
          {t('return')}
        </Button>
        <Button htmlType={'submit'} onClick={form.submit}>
          {t('submit_info')}
          <i className={'icon-arrow-left'}></i>
        </Button>
      </S.Footer>
    </S.FirstStepContainer>
  );
};

export default FirstStep;
