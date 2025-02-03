import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { Button, Chip, InfoBox, Input, Loading, SearchItemsContainer, Select } from '@oxygen/ui-kit';

import { createFormSchema } from '../../types';
import { FORM_ITEM, MAX_INPUTE_LENGTH } from '../../utils/consts';

import { updateFirstStepAction, useAppDispatch, useAppState } from '../../context';
import { useGetnameTagDataQuery } from '../../services/first-step/get-name-tag-data';
import { useGetGrantTagDataQuery } from '../../services/first-step/get-gant-tag-data';

import { getValueOrDash } from '@oxygen/utils';
import { useOrganizationInfoQuery } from '../../services/first-step/get-organization-info';
import { useClientTypesQuery } from '../../services/first-step/get-select-data';

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

  const [grantTags, setGrantTags] = useState(state.firstStep.grant_tag);
  const [nameTags, setNameTags] = useState(state.firstStep.tagIds);
  const [searchValue, setSearchValue] = useState({ orgNationalId: undefined });

  const { data: grantTagData, isFetching: grantTagFetching } = useGetGrantTagDataQuery();
  const { data: NameTagData, isFetching: nameTagFetching } = useGetnameTagDataQuery();
  const { data: clientTypes, isFetching: clientTypesFetching } = useClientTypesQuery();
  const { data: orgInfo, isFetching: orgInfoFetching, refetch } = useOrganizationInfoQuery(searchValue);

  const rule = createSchemaFieldRule(createFormSchema(t));

  const isFormDisabeled = !orgInfo;

  //TODO:HANDLE THIS BASE ON FORM INPUTS
  const isImportClient = false;
  const isBtnDisabled = false;
  const handleGrantTagChange = (values) => {
    setGrantTags(values);
  };

  const handleNameTagChange = (values) => {
    setNameTags(values);
  };
  const onFinish = (values) => {
    updateFirstStepAction(dispatch, values);
    setCurrentStep((perv) => perv + 1);
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
    refetch();
  };
  useEffect(() => {
    form.setFieldValue('grant_tag', grantTags);
    form.setFieldValue('add_tag', nameTags);
  }, [grantTags, nameTags]);

  const aggregatorStatus = () => {
    return orgInfo
      ? orgInfo?.isAggregator
        ? t('company_is_aggregator')
        : orgInfo?.aggregatorId
        ? `${t('company_has_aggregator')} - ${orgInfo?.aggregatorName}`
        : t('company_is_not_aggregator')
      : null;
  };

  const infoBoxData = [
    { key: t('organization_name'), value: getValueOrDash(orgInfo?.organizationName) },
    { key: t('organization_id'), value: getValueOrDash(orgInfo?.organizationNationalId) },
    { key: t('aggregator_status'), value: getValueOrDash(aggregatorStatus()) },
    { key: t('representative_name'), value: getValueOrDash(orgInfo?.representative.nameAndLastName) },
    { key: t('mobile_phone'), value: getValueOrDash(orgInfo?.representative.mobileNumber) },
    { key: t('landline'), value: getValueOrDash(orgInfo?.representative.fixedPhoneNumber) },
  ];

  return (
    <S.FirstStepContainer>
      <S.TitleTxt>{t('organization_information')}</S.TitleTxt>
      <S.Card>
        <S.SearchContainer>
          <Input
            size='large'
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
              <Input disabled={isImportClient} size='large' maxLength={MAX_INPUTE_LENGTH} />
            </Form.Item>

            <Form.Item name={FORM_ITEM.CLIENT_PERSIAN_NAME} label={t('form.persian_name_client')} rules={[rule]}>
              <Input maxLength={MAX_INPUTE_LENGTH} />
            </Form.Item>
            <Form.Item name={FORM_ITEM.CLIENT_KEY} label={t('form.client_id')} rules={[rule]}>
              <Input disabled={isImportClient} maxLength={MAX_INPUTE_LENGTH} />
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
              <Input disabled={isImportClient} maxLength={MAX_INPUTE_LENGTH} />
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
        <Button htmlType={'submit'} onClick={form.submit} disabled={isBtnDisabled}>
          {t('submit_info')}
          <i className={'icon-arrow-left'}></i>
        </Button>
      </S.Footer>
    </S.FirstStepContainer>
  );
};

export default FirstStep;
