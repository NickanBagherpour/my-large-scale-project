import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RadioChangeEvent, Typography } from 'antd';

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
  useFirstStepRequestRegistrationWithSelectedOrganizationMutationQuery,
  useGetOrganizationsQuery,
  useGetAggregatorsQuery,
} from '../../services/first-step/first-step-data';
import {
  updateFirstStepAction,
  updateOrganizationIdAndSubmissionId,
  useAppDispatch,
  useAppState,
  updateRequestMode,
  updateStatus,
} from '../../context';

import * as S from './first-step.style';
import { NoResult } from '@oxygen/reusable-components';

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

  const { data: organizations, isFetching: isOrganizationsFetching } = useGetOrganizationsQuery();
  const { data: aggregators, isFetching: isAggregatorsFetching } = useGetAggregatorsQuery(fetchState);
  const [aggregatorSelectData, setAggregatorSelectData] = useState();
  const rule = createSchemaFieldRule(requestRegistrationFormSchema(t));
  const [isSelected, setIsSelected] = useState({ isSelected: false, id: '' });
  const { mutate: firstMutate, isPending: firstIsPending } = useFirstStepRequestRegistrationMutationQuery();
  const { mutate: secondMutate, isPending: secondIsPending } =
    useFirstStepRequestRegistrationWithSelectedOrganizationMutationQuery();
  const [aggregatorIsRequired, setAggregatorIsRequired] = useState(false);

  useEffect(() => {
    const transformedAggregators = aggregators?.content?.map((aggregator) => ({
      label: aggregator.aggregatorName,
      value: aggregator.aggregatorId.toString(),
    }));
    setAggregatorSelectData(transformedAggregators);
  }, [aggregators]);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(state.firstStepDisabledSubmit);

  const checkFields = (_, allFields) => {
    const hasErrors = allFields.some((field) => field.errors.length > 0 || !field.value);
    setIsSubmitDisabled(hasErrors);
  };

  type Status = WidgetStateType['status'];

  const onFinish = (values) => {
    debugger;
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
        isAggregator:
          state.firstStep.aggregator_status === 'isAggregator'
            ? true
            : state.firstStep.aggregator_status === 'hasAggregator'
            ? false
            : false,
        aggregatorId: state.firstStep.aggregator_status === 'hasAggregator' ? values.aggregator_value : null,
        organizationId: state.organizationId,
        submissionId: state.submissionId,
      };

      firstMutate(params, {
        onSuccess: (data) => {
          console.log('request registration first step successful:', data);
          if (state.submissionId.length === 0) {
            updateOrganizationIdAndSubmissionId(dispatch, data.data);
          }
          const aggregator_status = state.firstStep.aggregator_status;
          const updatedValues = { ...values, aggregator_status };
          updateFirstStepAction(dispatch, updatedValues);
          setCurrentStep((perv) => perv + 1);
        },
        onError: (error) => {
          console.error('request registration first step  failed:', error);
        },
      });
    }
  };

  const handleContinue = () => {
    const params = { organizationId: isSelected.id };
    secondMutate(params, {
      onSuccess: (data) => {
        console.log('request registration first step successful:', data);
        const submissionId = data.headers['submission-id'];
        if (state.submissionId.length === 0) {
          updateOrganizationIdAndSubmissionId(dispatch, {
            organization: { id: isSelected.id },
            submissionId: submissionId,
          });
        }
        setCurrentStep((perv) => perv + 1);
      },
      onError: (error) => {
        console.error('request registration first step  failed:', error);
      },
    });
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

  const handleOrganizationSelect = (idx: string) => {
    setIsSelected({
      ...isSelected,
      isSelected: true,
      id: idx,
    });
  };

  const handleSubmit = () => {
    if (!state.firstStep.aggregator_status) {
      setAggregatorIsRequired(true);
    }
    if (state.requestMode === 'selectOrganization') {
      handleContinue();
    } else {
      form.submit();
    }
  };

  const handleReturn = () => {
    router.back();
  };

  return (
    <S.FirstStepContainer>
      <S.ContainerContent>
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
                ) : organizations?.length && organizations?.length ? (
                  organizations.map(({ legalName, organizationNationalId }, idx) => (
                    <S.Button
                      $isSelected={idx === isSelected.id ? true : false}
                      color='primary'
                      key={idx}
                      onClick={() => handleOrganizationSelect(idx)}
                    >
                      <S.Header>{legalName}</S.Header>

                      <S.Subtitle>
                        <span className='nationalId'>{t('form.national_id')}: </span>
                        {organizationNationalId}
                      </S.Subtitle>
                    </S.Button>
                  ))
                ) : (
                  <NoResult isLoading={false} />
                )}
              </S.Grid>
              {isSelected.isSelected && (
                <S.OrganizationContainer>
                  {loading ? (
                    <Loading spinning={loading} />
                  ) : (
                    <S.OrganizationContainer>
                      <S.TitleTxt className={'cards-title'}>{t('company_info')}</S.TitleTxt>
                      <Card>
                        <SearchItemsContainer>
                          <S.InfoItemContainer>
                            <span>{t('form.legal_person_name')}</span>
                            <span>{organizations[isSelected.id].legalName}</span>
                          </S.InfoItemContainer>
                          <S.InfoItemContainer>
                            <span>{t('form.national_id')}</span>
                            <span>{organizations[isSelected.id].organizationNationalId}</span>
                          </S.InfoItemContainer>
                          <S.InfoItemContainer>
                            <span>{t('form.legal_person_type')}</span>
                            <span>
                              {organizations[isSelected.id].legalType === 'PUBLIC' ? t('public') : t('private')}
                            </span>
                          </S.InfoItemContainer>
                          <S.InfoItemContainer>
                            <span>{t('form.registration_number')}</span>
                            <span>{organizations[isSelected.id].registerNo}</span>
                          </S.InfoItemContainer>
                          <S.InfoItemContainer>
                            <span>{t('form.registration_date')}</span>
                            <span>{organizations[isSelected.id].registerDate}</span>
                          </S.InfoItemContainer>
                          <S.InfoItemContainer>
                            <span>{t('form.activity_field')}</span>
                            <span>{organizations[isSelected.id].activityIndustry}</span>
                          </S.InfoItemContainer>
                          <S.InfoItemContainer>
                            <span>{t('form.economy_code')}</span>
                            <span>{organizations[isSelected.id].economicCode}</span>
                          </S.InfoItemContainer>
                          <S.InfoItemContainer>
                            <span>{t('form.aggregator_status')}</span>
                            {organizations[isSelected.id].isAggregator && organizations[isSelected.id].aggregatorId && (
                              <span>
                                {t('company_has_aggregator')}-{organizations[isSelected.id].aggregatorId}
                              </span>
                            )}
                            {organizations[isSelected.id].isAggregator &&
                              organizations[isSelected.id].aggregatorId == null && (
                                <span>{t('company_is_aggregator')}</span>
                              )}
                            {!organizations[isSelected.id].isAggregator && (
                              <span>
                                {t('company_is_not_aggregator')}-{t('company_has_not_aggregator')}
                              </span>
                            )}
                          </S.InfoItemContainer>
                        </SearchItemsContainer>
                        <S.Divider orientation='center' />
                        <SearchItemsContainer $columnNumber='3'>
                          <S.InfoItemContainer>
                            <span>{t('form.last_registration_address')}</span>
                            <span>{organizations[isSelected.id].registeredAddress}</span>
                          </S.InfoItemContainer>
                          <S.InfoItemContainer>
                            <span>{t('form.postal_code')}</span>
                            <span>{organizations[isSelected.id].postalCode}</span>
                          </S.InfoItemContainer>
                          <S.InfoItemContainer>
                            <span>{t('form.phone')}</span>
                            <span>{organizations[isSelected.id].phone}</span>
                          </S.InfoItemContainer>
                        </SearchItemsContainer>
                      </Card>
                    </S.OrganizationContainer>
                  )}
                </S.OrganizationContainer>
              )}
            </S.OrganizationContainer>
          ) : (
            <Form
              layout={'vertical'}
              onFinish={onFinish}
              form={form}
              initialValues={state.firstStep}
              onFieldsChange={checkFields}
            >
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
                {state.firstStep.aggregator_status === 'hasAggregator' && (
                  // ||state.firstStep.aggregator_status === 'isAggregator'
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
                          options={aggregatorSelectData}
                          loading={isAggregatorsFetching}
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
                  <DatePicker
                    placeholder={`${t('placeholder.registration_date')}`}
                    suffixIcon={<Icons.Calender />}
                    disableFuture={true}
                  />
                </Form.Item>
                <Form.Item name={FORM_ITEM.national_id} label={t('form.national_id')} rules={[rule]}>
                  <Input
                    placeholder={`${t('placeholder.national_id')}`}
                    maxLength={MAX_INPUTE_LENGTH}
                    allow={'number'}
                  />
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
                  <Input
                    placeholder={`${t('placeholder.postal_code')}`}
                    maxLength={MAX_INPUTE_LENGTH}
                    allow={'number'}
                  />
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
      </S.ContainerContent>

      <S.Footer>
        <Button variant={'outlined'} onClick={handleReturn}>
          {t('return')}
        </Button>
        <Button
          htmlType={'submit'}
          loading={firstIsPending || secondIsPending}
          onClick={() => handleSubmit()}
          disabled={
            (state.requestMode === 'selectOrganization' && !isSelected.isSelected) ||
            (state.requestMode === 'registerOrganization' && isSubmitDisabled)
          }
        >
          {t('submit_info')}
          <i className={'icon-arrow-left'}></i>
        </Button>
      </S.Footer>
    </S.FirstStepContainer>
  );
};

export default FirstStep;
