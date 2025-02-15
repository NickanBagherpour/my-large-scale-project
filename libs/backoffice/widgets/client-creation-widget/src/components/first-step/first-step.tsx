import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Form, message, Tooltip } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';

import { useApp } from '@oxygen/hooks';
import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { getValueOrDash, RQKEYS } from '@oxygen/utils';
import { useQueryClient } from '@tanstack/react-query';
import { Button, InfoBox, Input, Loading, SearchItemsContainer, Select } from '@oxygen/ui-kit';

import { createFormSchema } from '../../types';
import TagPicker from './tag-picker/tag-picker';
import { TagInterface } from '../../types/first-step/general';
import CenteredLoading from '../centered-loading/centered-loading';
import { prepareGrantTypes, prepareSubmitClientParams, prepareTags } from '../../utils/helper';
import { ClientInquiryStatus, FORM_ITEM, GrantValue, MAX_INPUTE_LENGTH } from '../../utils/consts';
import {
  updateFirstStepAction,
  updateOrgStatusAction,
  updateOrganizationInfoAction,
  useAppDispatch,
  useAppState,
} from '../../context';

import {
  usePostSubmitClient,
  useGetClientTypesQuery,
  useGetTagsDataQuery,
  useGetOrganizationInfoQuery,
  useGetClientDraftInfoQuery,
  useGetClientInquirySSOQuery,
} from '../../services/first-step';

import * as S from './first-step.style';

type FirstStepProps = PageProps & {
  setCurrentStep: (prev) => void;
};

const FirstStep: React.FC<FirstStepProps> = (props) => {
  const { setCurrentStep } = props;
  //Hooks
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();
  const { notification } = useApp();
  const queryClient = useQueryClient();

  const router = useRouter();
  const [form] = Form.useForm();
  const rule = createSchemaFieldRule(createFormSchema(t));
  //Constants
  const clientName = state.firstStep.clientEnglishName;
  const clientStatus = state.clientStatus;
  const isFormDisabeled = !(state.firstStep?.organizationInfo?.organizationNationalId ?? undefined);
  const isImportClient = clientStatus === ClientInquiryStatus.CLIENT_EXISTS_IN_BAM;
  const isDraft = clientStatus === ClientInquiryStatus.CLIENT_IS_DRAFT;
  const orgNationalId = state.firstStep.organizationInfo?.organizationNationalId;
  const aggregatorStatusParams = state.firstStep.organizationInfo?.organizationNationalId;
  const isBtnDisabled = !orgNationalId;
  const { INQUIRY_STATUS } = RQKEYS.BACKOFFICE.CLIENT_CREATION;
  const ssoClientId = state.firstStep.ssoClientId;
  //States
  const [selectedGrantTypes, setSelectedGrantTypes] = useState([]);
  const [selectedTags, setSelectedTags] = useState<TagInterface[]>(state.firstStep.tagIds);
  const [searchValue, setSearchValue] = useState({
    orgNationalId: state.firstStep.organizationInfo?.organizationNationalId,
  });
  //Mutatuions
  const { mutate: submitClient, isPending: submitClientLoading, isSuccess } = usePostSubmitClient();
  //Queries
  const { data: NameTagData, isFetching: nameTagFetching } = useGetTagsDataQuery();
  const { data: clientTypes, isFetching: clientTypesFetching } = useGetClientTypesQuery();
  const { data: draftData, isFetching: draftFetching, refetch: draftRefetch } = useGetClientDraftInfoQuery(clientName!);
  const {
    data: orgInfo,
    isFetching: orgInfoFetching,
    refetch: searchRefetch,
  } = useGetOrganizationInfoQuery(searchValue);
  const {
    data: SSOInquiryData,
    isFetching: SSOInquiryFetching,
    refetch: SSOInquiryRefetch,
  } = useGetClientInquirySSOQuery({ 'client-name': clientName });
  //Effects
  useEffect(() => {
    if (isImportClient) {
      SSOInquiryRefetch();
      if (SSOInquiryData) {
        updateFirstStepAction(dispatch, SSOInquiryData);
      }
    }
  }, [isImportClient, SSOInquiryData]);

  useEffect(() => {
    if (isDraft) {
      draftRefetch();
      if (draftData) {
        updateFirstStepAction(dispatch, draftData);
        setSelectedTags(draftData.tagIds);
      }
    }
  }, [isDraft, draftData]);

  useEffect(() => {
    if (state.orgStatus === 'success') {
      notification.success({
        message: t('success_notif'),
      });
    }
  }, [state.orgStatus]);

  useEffect(() => {
    if (state.firstStep) {
      form.setFieldsValue(state.firstStep);
      setSearchValue({
        orgNationalId: state.firstStep.organizationInfo?.organizationNationalId,
      });
    }
  }, [state.firstStep, form]);

  useEffect(() => {
    if (orgInfo && state.orgStatus === 'success') {
      updateOrganizationInfoAction(dispatch, orgInfo);
    }
  }, [orgInfo, state.orgStatus]);

  useEffect(() => {
    const foundGrantTypes = prepareGrantTypes(state.firstStep, GrantValue);
    setSelectedGrantTypes(foundGrantTypes);
    form.setFieldsValue({
      [FORM_ITEM.GRANT_TYPE]: foundGrantTypes,
    });
    form.setFieldsValue({
      [FORM_ITEM.TAG_IDS]: selectedTags,
    });
  }, [state.firstStep]);

  //Handlers
  const handleReturn = () => {
    router.back();
  };
  const handleChange = (e) => {
    setSearchValue({ orgNationalId: e.target.value });
  };
  const handleSearch = () => {
    searchRefetch();
  };

  const onTagsChange = (value: TagInterface[]) => {
    setSelectedTags(value);
  };
  const onGrantTypeChange = (value) => {
    setSelectedGrantTypes(value);
  };
  const onGrantTypeClose = (item) => {
    const updatedGrantTypes = selectedGrantTypes.filter((grantType: any) => grantType.key !== item);
    setSelectedGrantTypes(updatedGrantTypes);
    form.setFieldsValue({
      [FORM_ITEM.GRANT_TYPE]: updatedGrantTypes,
    });
  };
  const onTagsClose = (option) => {
    const updatedTags = selectedTags.filter((tag: any) => tag.key !== option);
    setSelectedTags(updatedTags);
    form.setFieldsValue({
      [FORM_ITEM.TAG_IDS]: updatedTags,
    });
  };

  const aggregatorStatus = (aggregatorStatusParams) => {
    return aggregatorStatusParams
      ? aggregatorStatusParams?.isAggregator
        ? t('company_is_aggregator')
        : aggregatorStatusParams?.aggregatorId
        ? `${t('company_has_aggregator')} - ${aggregatorStatusParams?.aggregatorName}`
        : t('company_is_not_aggregator')
      : null;
  };

  const onFinish = async (values) => {
    submitClient(prepareSubmitClientParams(values, orgNationalId, ssoClientId), {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [INQUIRY_STATUS],
        });
        setCurrentStep((pervStep) => pervStep + 1);
        updateOrgStatusAction(dispatch, 'normal');
      },
    });
  };

  const infoBoxData = [
    { key: t('organization_name'), value: getValueOrDash(state.firstStep.organizationInfo?.organizationName) },
    { key: t('organization_id'), value: getValueOrDash(state.firstStep.organizationInfo?.organizationNationalId) },
    { key: t('aggregator_status'), value: getValueOrDash(aggregatorStatus(aggregatorStatusParams)) },
    {
      key: t('representative_name'),
      value: getValueOrDash(state.firstStep.organizationInfo?.representative?.nameAndLastName),
    },
    { key: t('mobile_phone'), value: getValueOrDash(state.firstStep.organizationInfo?.representative?.mobileNumber) },
    { key: t('landline'), value: getValueOrDash(state.firstStep.organizationInfo?.representative?.fixedPhoneNumber) },
  ];

  return (
    <S.FirstStepContainer>
      {draftFetching || SSOInquiryFetching ? (
        <CenteredLoading />
      ) : (
        <>
          <S.TitleContainer>
            <S.TitleTxt>{t('organization_information')}</S.TitleTxt>
            <Tooltip title={t('tooltip_txt')}>
              <S.Icon className={'icon-info-hint'} />
            </Tooltip>
          </S.TitleContainer>
          <S.Card>
            <S.SearchContainer>
              <S.Input
                size='large'
                value={searchValue.orgNationalId}
                prefix={orgInfoFetching ? <Loading /> : <i className='icon-search-normal' />}
                placeholder={t('search_organization_id_placeholder')}
                onChange={(e) => handleChange(e)}
                orgStatus={state.orgStatus}
              />
              {!!state.firstStep.organizationInfo?.organizationNationalId === true ? (
                <Button onClick={handleSearch} variant='outlined' loading={SSOInquiryFetching}>
                  {t('re_search')}
                  <i className={'icon-search-normal'} />
                </Button>
              ) : (
                <Button onClick={handleSearch} loading={SSOInquiryFetching}>
                  {t('button.search')}
                  <i className={'icon-search-normal'} />
                </Button>
              )}
            </S.SearchContainer>
            <InfoBox data={infoBoxData} margin={0} loading={orgInfoFetching} />
          </S.Card>
          <Form
            style={{ flexGrow: 1 }}
            layout={'vertical'}
            onFinish={onFinish}
            form={form}
            initialValues={state.firstStep}
            disabled={isFormDisabeled}
          >
            <S.TitleTxt>{t('technical_information')}</S.TitleTxt>
            <S.Card>
              <SearchItemsContainer>
                <Form.Item name={FORM_ITEM.CLIENT_ENGLISH_NAME} label={t('form.english_name_client')} rules={[rule]}>
                  <Input disabled size='large' maxLength={MAX_INPUTE_LENGTH} />
                </Form.Item>

                <Form.Item name={FORM_ITEM.CLIENT_PERSIAN_NAME} label={t('form.persian_name_client')} rules={[rule]}>
                  <Input maxLength={MAX_INPUTE_LENGTH} />
                </Form.Item>
                <Form.Item name={FORM_ITEM.CLIENT_KEY} label={t('form.client_id')} rules={[rule]}>
                  <Input disabled={isDraft || isImportClient || isFormDisabeled} maxLength={MAX_INPUTE_LENGTH} />
                </Form.Item>
                <Form.Item name={FORM_ITEM.CLIENT_TYPE_CODE} label={t('form.client_type')} rules={[rule]}>
                  <Select
                    disabled={isFormDisabeled}
                    size={'large'}
                    options={clientTypes}
                    loading={clientTypesFetching}
                    placeholder={`${t('placeholder.Choose')}`}
                  ></Select>
                </Form.Item>
                <Form.Item name={FORM_ITEM.AUTHORIZATION_KEY} label={t('form.identity_auth')} rules={[rule]}>
                  <Input disabled={isDraft || isImportClient || isFormDisabeled} maxLength={MAX_INPUTE_LENGTH} />
                </Form.Item>
                <Form.Item name={FORM_ITEM.WEBSITE_URL} label={t('form.website_url')} rules={[rule]}>
                  <Input maxLength={MAX_INPUTE_LENGTH} type='url' />
                </Form.Item>
                <Form.Item name={FORM_ITEM.INBOUND_ADDRESS} label={t('form.input_address')} rules={[rule]}>
                  <Input maxLength={MAX_INPUTE_LENGTH} type='url' />
                </Form.Item>
                <Form.Item name={FORM_ITEM.REDIRECT_URL} label={t('form.client_return_address')} rules={[rule]}>
                  <Input maxLength={MAX_INPUTE_LENGTH} type='url' />
                </Form.Item>
              </SearchItemsContainer>
              <S.Divider />
              <TagPicker
                isDisabled={isFormDisabeled}
                tags={NameTagData}
                selectedTags={selectedTags}
                onTagsChange={onTagsChange}
                loadingUpdateClient={submitClientLoading}
                isSuccess={isSuccess}
                isTagsFetching={nameTagFetching}
                onTagsClose={onTagsClose}
                GrantValue={GrantValue}
                onGrantTypeClose={onGrantTypeClose}
                onGrantTypeChange={onGrantTypeChange}
                selectedGrantTypes={selectedGrantTypes}
              />
            </S.Card>
          </Form>
          <S.Footer>
            <Button variant={'outlined'} onClick={handleReturn}>
              {t('return')}
            </Button>
            <Button htmlType={'submit'} onClick={form.submit} loading={submitClientLoading} disabled={isBtnDisabled}>
              {t('submit_info')}
              <i className={'icon-arrow-left'}></i>
            </Button>
          </S.Footer>
        </>
      )}
    </S.FirstStepContainer>
  );
};

export default FirstStep;
