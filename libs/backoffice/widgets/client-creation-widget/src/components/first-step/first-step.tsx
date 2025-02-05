import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';

import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { getValueOrDash } from '@oxygen/utils';
import { Button, Chip, InfoBox, Input, Loading, SearchItemsContainer, Select } from '@oxygen/ui-kit';

import { createFormSchema } from '../../types';
import { updateFirstStepAction, updateOrganizationInfoAction, useAppDispatch, useAppState } from '../../context';
import { ClientInquiryStatus, FORM_ITEM, MAX_INPUTE_LENGTH } from '../../utils/consts';

import { useClientTypesQuery } from '../../services/first-step/get-select-data';
import { useGetnameTagDataQuery } from '../../services/first-step/get-name-tag-data';
import { useGetGrantTagDataQuery } from '../../services/first-step/get-gant-tag-data';
import { useOrganizationInfoQuery } from '../../services/first-step/get-organization-info';
import { useClientDraftInfoQuery } from '../../services/first-step/get-client-draft-data.api';
import { useClientInquirySSOQuery } from '../../services/first-step/get-client-inquiry-sso.api';

import * as S from './first-step.style';
import { useSubmitClient } from '../../services/first-step/post-clients.api';

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
  const clientStatus = state.clientStatus;
  const clientName = state.clientName;
  //todo:update this base on new api
  const [grantTags, setGrantTags] = useState([]);
  const [nameTags, setNameTags] = useState([]);
  const [searchValue, setSearchValue] = useState({
    orgNationalId: state.firstStep.organizationInfo?.organizationNationalId,
  });
  const { mutate: submitClient, isPending: submitClientLoading } = useSubmitClient();

  const { data: grantTagData, isFetching: grantTagFetching } = useGetGrantTagDataQuery();
  const { data: NameTagData, isFetching: nameTagFetching } = useGetnameTagDataQuery();
  const { data: clientTypes, isFetching: clientTypesFetching } = useClientTypesQuery();
  const { data: orgInfo, isFetching: orgInfoFetching, refetch: searchRefetch } = useOrganizationInfoQuery(searchValue);
  const {
    data: SSOInquiryData,
    isFetching: SSOInquiryFetching,
    refetch: SSOInquiryRefetch,
  } = useClientInquirySSOQuery({ 'client-name': clientName });
  const { data: draftData, isFetching: draftFetching, refetch: draftRefetch } = useClientDraftInfoQuery(clientName!);

  const rule = createSchemaFieldRule(createFormSchema(t));

  const isFormDisabeled = !state.firstStep?.organizationInfo.organizationNationalId;

  //TODO:HANDLE THIS BASE ON FORM INPUTS
  const isImportClient = clientStatus === ClientInquiryStatus.CLIENT_EXISTS_IN_BAM;
  const isDraft = clientStatus === ClientInquiryStatus.CLIENT_IS_DRAFT;
  const isBtnDisabled = false;

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

  const handleGrantTagChange = (values) => {
    setGrantTags(values);
  };

  const handleNameTagChange = (values) => {
    setNameTags(values);
  };

  // updateFirstStepAction(dispatch, values);
  // setCurrentStep((perv) => perv + 1);

  const onFinish = async (values) => {
    const params = values;
    submitClient(params, {
      onSuccess: async () => {
        console.log(params);
        setCurrentStep((pervStep) => pervStep++);
      },
    });
  };

  const handleGrantChipClose = (key) => {
    setGrantTags((prevTags) => prevTags.filter((tag: any) => tag.key !== key));
  };

  const handleNameChipClose = (key) => {
    setNameTags((prevTags) => prevTags.filter((tag: any) => tag.key !== key));
  };

  const handleReturn = () => {
    router.back();
  };
  const handleChange = (e) => {
    setSearchValue({ orgNationalId: e.target.value });
  };
  const handleSearch = () => {
    searchRefetch();
  };
  useEffect(() => {
    form.setFieldValue('grant_tag', grantTags);
    form.setFieldValue('add_tag', nameTags);
  }, [grantTags, nameTags]);
  const aggregatorStatusParams = state.firstStep.organizationInfo.organizationNationalId;
  const aggregatorStatus = (aggregatorStatusParams) => {
    return aggregatorStatusParams
      ? aggregatorStatusParams?.isAggregator
        ? t('company_is_aggregator')
        : aggregatorStatusParams?.aggregatorId
        ? `${t('company_has_aggregator')} - ${aggregatorStatusParams?.aggregatorName}`
        : t('company_is_not_aggregator')
      : null;
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
              <S.TagsForm>
                <S.TagPicker>
                  <Form.Item className={'tag-input-grant-tag'} name={FORM_ITEM.grant_tag}>
                    <S.Select
                      disabled={isFormDisabeled}
                      multiSelect={true}
                      // defaultValue={grantTags}
                      menu={grantTagData}
                      onChange={handleGrantTagChange}
                      loading={grantTagFetching}
                    >
                      {t('form.grant_type')}
                    </S.Select>
                  </Form.Item>
                  <div>
                    {grantTags.map((tag: any) => (
                      <Chip
                        tooltipTitle={tag}
                        key={tag.key}
                        type='active'
                        tooltipOnEllipsis={true}
                        closeIcon
                        onClose={() => handleGrantChipClose(tag.key)}
                      >
                        {tag.label}
                      </Chip>
                    ))}
                  </div>
                </S.TagPicker>

                <S.TagPicker>
                  <Form.Item className={'tag-input-grant-tag'} name={FORM_ITEM.TAG_IDS}>
                    <S.Select
                      disabled={isFormDisabeled}
                      multiSelect={true}
                      menu={NameTagData}
                      onChange={handleNameTagChange}
                      loading={nameTagFetching}
                    >
                      {t('form.add_tags')}
                    </S.Select>
                  </Form.Item>
                  <div>
                    {nameTags.map((tag: any) => (
                      <Chip
                        tooltipTitle={tag.label}
                        tooltipOnEllipsis={true}
                        closeIcon
                        type='active'
                        onClose={() => handleNameChipClose(tag.key)}
                      >
                        {tag.label}
                      </Chip>
                    ))}
                  </div>
                </S.TagPicker>
              </S.TagsForm>
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
