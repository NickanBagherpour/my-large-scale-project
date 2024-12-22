import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RadioChangeEvent, Typography } from 'antd';

import { LocalStorageKey } from '@oxygen/types';
import { useLocalStorage } from '@oxygen/hooks';

import { Card, Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { dayjs } from '@oxygen/utils';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { Button, Input, SearchItemsContainer, Icons, Select, DatePicker, Loading, Chip } from '@oxygen/ui-kit';

import { requestRegistrationFormSchema } from '../../types';
import { FORM_ITEM, MAX_INPUTE_LENGTH, selectLegalTypeOptions } from '../../utils/consts';
import { WidgetStateType } from '../../context/types';
import {
  useFirstStepRequestRegistrationMutationQuery,
  useGetOrganizationDataMutationQuery,
  useGetOrganizationsQuery,
} from '../../services/first-step/first-step-data';
import { updateFirstStepAction, useAppDispatch, useAppState, updateRequestMode, updateStatus } from '../../context';

import * as S from './first-step.style';

type FirstStepProps = PageProps & {
  setCurrentStep: (prev) => void;
  data?: any;
  loading?: boolean;
};

const FirstStep: React.FC<FirstStepProps> = (props) => {
  const { setCurrentStep, data, loading } = props;
  const dispatch = useAppDispatch();
  const state = useAppState();
  const { ...fetchState } = useAppState();
  const [t] = useTr();

  const router = useRouter();
  const [form] = Form.useForm();

  const [requestRegistration, setRequestRegistration, removeRequestRegistration] = useLocalStorage<any>(
    LocalStorageKey.REQUEST_REGISTRATION
  );

  const { data: organizations, isFetching: isOrganizationsFetching } = useGetOrganizationsQuery(fetchState);
  const rule = createSchemaFieldRule(requestRegistrationFormSchema(t));
  const [isSelected, setIsSelected] = useState({ isSelected: false, id: '' });
  const { mutate: firstMutate, isPending: firstIsPending } = useFirstStepRequestRegistrationMutationQuery();

  const { mutate: secondMutate, isPending: secondIsPending } = useGetOrganizationDataMutationQuery();
  const [aggregatorIsRequired, setAggregatorIsRequired] = useState(false);

  type Status = WidgetStateType['status'];

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
    if (!aggregatorIsRequired) {
      const params = {
        aggregator_status: state.firstStep.aggregator_status,
        aggregator_value: values.aggregator_value,
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
    }
  };

  const getChipProps = (currentStatus: Status, chipStatus: Status) =>
    currentStatus === chipStatus
      ? ({
          type: 'active',
          iconProp: 'checked icon-checkmark',
        } as const)
      : ({ type: 'unActive', error: aggregatorIsRequired ? true : undefined } as const);

  const onChange = (e: RadioChangeEvent) => {
    updateRequestMode(dispatch, e.target.value);
  };

  const handleOrganizationSelect = (id: string) => {
    setIsSelected({
      ...isSelected,
      isSelected: true,
      id: id,
    });
  };

  const handleSubmit = () => {
    if (!state.firstStep.aggregator_status) {
      setAggregatorIsRequired(true);
    }
    form.submit();
  };

  const handleReturn = () => {
    router.back();
  };

  return (
    <S.FirstStepContainer>
      <Card>
        <S.Radios onChange={onChange} value={state.requestMode}>
          <S.Radio value={'selectOrganization'}>{t('select_organization')}</S.Radio>
          <S.Radio value={'registerOrganization'}>{t('register_organization')}</S.Radio>
        </S.Radios>
        {state.requestMode === 'selectOrganization' ? (
          <S.OrganizationContainer>
            <S.Grid>
              {isOrganizationsFetching ? (
                <Loading spinning={isOrganizationsFetching} />
              ) : organizations?.list.length ? (
                organizations.list.slice(0, 4).map(({ name, id }, idx) => (
                  <S.Button
                    $isSelected={id === isSelected.id ? true : false}
                    color='primary'
                    key={idx}
                    onClick={() => handleOrganizationSelect(id)}
                  >
                    <S.Header>{name}</S.Header>

                    <S.Subtitle>
                      <span className='nationalId'>{t('form.national_id')}: </span>
                      {id}
                    </S.Subtitle>
                  </S.Button>
                ))
              ) : (
                <span>شرکتی وجود ندارد</span>
              )}
            </S.Grid>
            {isSelected.isSelected && (
              <S.OrganizationContainer>
                {loading ? (
                  <Loading spinning={loading} />
                ) : (
                  <S.OrganizationContainer>
                    <S.TitleTxt className={'cards-title'}>{t('representatives_info')}</S.TitleTxt>
                    <Card>
                      <SearchItemsContainer $columnNumber='3'>
                        <S.RepresentativesInfoItemContainer>
                          <span>{t('legal_name')}</span>
                          <span>{data.list.legal_name}</span>
                        </S.RepresentativesInfoItemContainer>
                        <S.RepresentativesInfoItemContainer>
                          <span>{t('form.mobile_number')}</span>
                          <span>{data.list.mobile_number}</span>
                        </S.RepresentativesInfoItemContainer>
                        <S.RepresentativesInfoItemContainer>
                          <span>{t('telephone')}</span>
                          <span>{data.list.telephone}</span>
                        </S.RepresentativesInfoItemContainer>
                        <S.RepresentativesInfoItemContainer>
                          <span>{t('technical_name')}</span>
                          <span>{data.list.technical_name}</span>
                        </S.RepresentativesInfoItemContainer>
                        <S.RepresentativesInfoItemContainer>
                          <span>{t('form.mobile_number')}</span>
                          <span>{data.list.mobile_number}</span>
                        </S.RepresentativesInfoItemContainer>
                        <S.RepresentativesInfoItemContainer>
                          <span>{t('telephone')}</span>
                          <span>{data.list.telephone}</span>
                        </S.RepresentativesInfoItemContainer>
                      </SearchItemsContainer>
                    </Card>
                  </S.OrganizationContainer>
                )}
              </S.OrganizationContainer>
            )}
          </S.OrganizationContainer>
        ) : (
          <Form layout={'vertical'} onFinish={onFinish} form={form} initialValues={state.firstStep}>
            <S.TitleTxt className={'cards-title'}>{t('company_specifications')}</S.TitleTxt>
            <S.CheckAggregator>
              <SearchItemsContainer $columnNumber='3'>
                <S.ChipsContainer>
                  <S.Chips>
                    <Chip
                      {...getChipProps(state.firstStep.aggregator_status, 'isAggregator')}
                      onClick={() => {
                        updateStatus(dispatch, 'isAggregator');
                        setAggregatorIsRequired(false);
                      }}
                    >
                      {t('company_is_aggregator')}
                    </Chip>
                    <Chip
                      {...getChipProps(state.firstStep.aggregator_status, 'hasAggregator')}
                      onClick={() => {
                        updateStatus(dispatch, 'hasAggregator');
                        setAggregatorIsRequired(false);
                      }}
                    >
                      {t('company_has_aggregator')}
                    </Chip>
                    <Chip
                      {...getChipProps(state.firstStep.aggregator_status, 'nothing')}
                      onClick={() => {
                        updateStatus(dispatch, 'nothing');
                        setAggregatorIsRequired(false);
                      }}
                    >
                      {t('nothing')}
                    </Chip>
                  </S.Chips>
                  {aggregatorIsRequired && (
                    <Typography.Text type='danger'>{t('select_aggregator_status')}</Typography.Text>
                  )}
                </S.ChipsContainer>
              </SearchItemsContainer>
              {(state.firstStep.aggregator_status === 'isAggregator' ||
                state.firstStep.aggregator_status === 'hasAggregator') && (
                <SearchItemsContainer $columnNumber='3'>
                  <S.AggregatorContainer>
                    <Form.Item
                      className={'label-switch'}
                      layout={'horizontal'}
                      label={t('form.aggregator_specifications')}
                    ></Form.Item>
                    <Form.Item name={FORM_ITEM.aggregator_value} className='select-aggregator' rules={[rule]}>
                      <Select
                        size={'large'}
                        options={selectLegalTypeOptions}
                        // loading={selectFetching}
                        placeholder={`${t('placeholder.do_select')}`}
                      ></Select>
                    </Form.Item>
                  </S.AggregatorContainer>
                </SearchItemsContainer>
              )}
            </S.CheckAggregator>
            <SearchItemsContainer $columnNumber='3'>
              <Form.Item name={FORM_ITEM.legal_person_name} label={t('form.legal_person_name')} rules={[rule]}>
                <Input
                  size='large'
                  placeholder={`${t('placeholder.legal_person_name')}`}
                  maxLength={MAX_INPUTE_LENGTH}
                />
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
                <Input
                  placeholder={`${t('placeholder.economy_code')}`}
                  maxLength={MAX_INPUTE_LENGTH}
                  allow={'number'}
                />
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
          </Form>
        )}
      </Card>

      <S.Footer>
        <Button loading={firstIsPending} variant={'outlined'} onClick={handleReturn}>
          {t('return')}
        </Button>
        <Button htmlType={'submit'} onClick={() => handleSubmit()}>
          {t('submit_info')}
          <i className={'icon-arrow-left'}></i>
        </Button>
      </S.Footer>
    </S.FirstStepContainer>
  );
};

export default FirstStep;
