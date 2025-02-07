import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Form, message } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';

import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { getValueOrDash } from '@oxygen/utils';
import { Button, InfoBox, Input, Loading, SearchItemsContainer, Select } from '@oxygen/ui-kit';

import { createFormSchema } from '../../types';
import TagPicker from './tag-picker/tag-picker';
import { prepareGrantTypes, prepareSubmitClientParams, prepareTags } from '../../utils/helper';
import { ClientInquiryStatus, FORM_ITEM, GrantValue, MAX_INPUTE_LENGTH } from '../../utils/consts';
import {
  resetOrganizationInfoAction,
  updateFirstStepAction,
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
import { TagInterface } from '../../types/first-step/general';
import { useApp } from '@oxygen/hooks';

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

  const router = useRouter();
  const [form] = Form.useForm();
  const rule = createSchemaFieldRule(createFormSchema(t));
  //Constants
  const clientName = state.clientName;
  const clientStatus = state.clientStatus;
  const isFormDisabeled = !(state.firstStep?.organizationInfo?.organizationNationalId ?? undefined);
  const isImportClient = clientStatus === ClientInquiryStatus.CLIENT_EXISTS_IN_BAM;
  const isDraft = clientStatus === ClientInquiryStatus.CLIENT_IS_DRAFT;
  const orgNationalId = state.firstStep.organizationInfo?.organizationNationalId;
  const aggregatorStatusParams = state.firstStep.organizationInfo.organizationNationalId;
  const isBtnDisabled = !orgNationalId;
  //States
  const [selectedGrantTypes, setSelectedGrantTypes] = useState([]);
  const [nameTags, setNameTags] = useState([state.firstStep.tagIds]);
  const [selectedTags, setSelectedTags] = useState<TagInterface[]>([]);
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
    isSuccess: searchIsSuccess,
    isError: searchIsError,
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
        setNameTags(SSOInquiryData.tagIds);
      }
    }
  }, [isImportClient, SSOInquiryData]);

  useEffect(() => {
    if (isDraft) {
      draftRefetch();
      if (draftData) {
        updateFirstStepAction(dispatch, draftData);
        setNameTags(draftData.tagIds);
      }
    }
  }, [isDraft, draftData]);

  useEffect(() => {
    if (state.firstStep) {
      form.setFieldsValue(state.firstStep); // Update form when state.firstStep changes
      setSearchValue({
        orgNationalId: state.firstStep.organizationInfo?.organizationNationalId,
      });
    }
  }, [state.firstStep, form]);

  useEffect(() => {
    if (orgInfo) {
      updateOrganizationInfoAction(dispatch, orgInfo);
    }
  }, [orgInfo]);
  useEffect(() => {
    if (NameTagData && nameTags) {
      const selectedTags = prepareTags(NameTagData, nameTags);
      setSelectedTags(selectedTags);
      form.setFieldsValue({
        [FORM_ITEM.TAG_IDS]: selectedTags,
      });
    }
  }, [NameTagData, nameTags]);
  useEffect(() => {
    const foundGrantTypes = prepareGrantTypes(state.firstStep, GrantValue);
    setSelectedGrantTypes(foundGrantTypes);
    form.setFieldsValue({
      [FORM_ITEM.GRANT_TYPE]: foundGrantTypes,
    });
  }, [state.firstStep]);
  useEffect(() => {
    if (searchIsSuccess) {
      notification.success({
        message: t('success_notif'),
      });
    }
    if (searchIsError) {
      resetOrganizationInfoAction(dispatch);
    }
  }, [searchIsSuccess, searchIsError]);
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
    submitClient(prepareSubmitClientParams(values, orgNationalId), {
      onSuccess: async () => {
        setCurrentStep((pervStep) => pervStep + 1);
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
        <Loading />
      ) : (
        <>
          <S.TitleTxt>{t('organization_information')}</S.TitleTxt>
          <S.Card>
            <S.SearchContainer>
              <Input
                size='large'
                value={searchValue.orgNationalId}
                prefix={orgInfoFetching ? <Loading /> : <i className='icon-search-normal' />}
                placeholder={t('search_organization_id_placeholder')}
                onChange={(e) => handleChange(e)}
              />

              <Button onClick={handleSearch}>
                {t('button.search')}
                <i className={'icon-search-normal'} />
              </Button>
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
                <Form.Item name={FORM_ITEM.CLIENT_ENGLISH_NAME} label={t('form.latin_name_client')} rules={[rule]}>
                  <Input
                    disabled={isDraft || isImportClient || isFormDisabeled}
                    size='large'
                    maxLength={MAX_INPUTE_LENGTH}
                  />
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
                selectedTags={selectedTags}
                onTagsChange={onTagsChange}
                loadingUpdateClient={submitClientLoading}
                isSuccess={isSuccess}
                isTagsFetching={nameTagFetching}
                tags={NameTagData}
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
