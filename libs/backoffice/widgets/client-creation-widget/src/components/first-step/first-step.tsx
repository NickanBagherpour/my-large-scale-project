import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Card, Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { Button, Chip, InfoBox, Input, SearchItemsContainer, Select, Switch } from '@oxygen/ui-kit';

import { createFormSchema } from '../../types';
import { FORM_ITEM, MAX_INPUTE_LENGTH, MAX_MOBILE_NUMBER_LENGTH } from '../../utils/consts';

import { updateFirstStepAction, useAppDispatch, useAppState } from '../../context';
import { useGetnameTagDataQuery } from '../../services/first-step/get-name-tag-data';
import { useGetGrantTagDataQuery } from '../../services/first-step/get-gant-tag-data';

import * as S from './first-step.style';
import { getValueOrDash } from '@oxygen/utils';
import { useOrganizationInfoQuery } from '../../services/first-step/get-organization-info';
import { useClientTypesQuery } from '../../services/first-step/get-select-data';

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

  const { data: grantTagData, isFetching: grantTagFetching } = useGetGrantTagDataQuery();
  const { data: NameTagData, isFetching: nameTagFetching } = useGetnameTagDataQuery();
  const { data: clientTypes, isFetching: clientTypesFetching } = useClientTypesQuery();
  const { data: orgInfo, isFetching: orgInfoFetching } = useOrganizationInfoQuery({ orgNationalId: '32432423878' });

  const [grantTags, setGrantTags] = useState(state.firstStep.grant_tag);
  const [nameTags, setNameTags] = useState(state.firstStep.add_tag);
  const rule = createSchemaFieldRule(createFormSchema(t));
  //TODO:HANDLE THIS BASE ON FORM INPUTS
  const isBtnDisabled = true;
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
  useEffect(() => {
    form.setFieldValue('grant_tag', grantTags);
    form.setFieldValue('add_tag', nameTags);
  }, [grantTags, nameTags]);

  const aggregatorStatus = () => {
    return orgInfo?.isAggregator
      ? t('company_is_aggregator')
      : orgInfo?.aggregatorId
      ? `${t('company_has_aggregator')} - ${orgInfo?.aggregatorName}`
      : t('company_is_not_aggregator');
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
        <InfoBox data={infoBoxData} margin={0} loading={orgInfoFetching} />
      </S.Card>
      <Form style={{ flexGrow: 1 }} layout={'vertical'} onFinish={onFinish} form={form} initialValues={state.firstStep}>
        <S.TitleTxt>{t('technical_information')}</S.TitleTxt>
        <S.Card>
          <SearchItemsContainer>
            <Form.Item name={FORM_ITEM.latin_name_client} label={t('form.latin_name_client')} rules={[rule]}>
              <Input size='large' maxLength={MAX_INPUTE_LENGTH} />
            </Form.Item>

            <Form.Item name={FORM_ITEM.persian_name_client} label={t('form.persian_name_client')} rules={[rule]}>
              <Input maxLength={MAX_INPUTE_LENGTH} />
            </Form.Item>
            <Form.Item name={FORM_ITEM.client_id} label={t('form.client_id')} rules={[rule]}>
              <Input maxLength={MAX_INPUTE_LENGTH} />
            </Form.Item>
            <Form.Item name={FORM_ITEM.client_type} label={t('form.client_type')} rules={[rule]}>
              <Select
                size={'large'}
                options={clientTypes}
                loading={clientTypesFetching}
                placeholder={`${t('placeholder.Choose')}`}
              ></Select>
            </Form.Item>
            <Form.Item name={FORM_ITEM.identity_auth} label={t('form.identity_auth')} rules={[rule]}>
              <Input maxLength={MAX_INPUTE_LENGTH} />
            </Form.Item>
            <Form.Item name={FORM_ITEM.website_url} label={t('form.website_url')} rules={[rule]}>
              <Input maxLength={MAX_INPUTE_LENGTH} type='url' />
            </Form.Item>
            <Form.Item name={FORM_ITEM.input_address} label={t('form.input_address')} rules={[rule]}>
              <Input maxLength={MAX_INPUTE_LENGTH} type='url' />
            </Form.Item>
            <Form.Item name={FORM_ITEM.client_return_address} label={t('form.client_return_address')} rules={[rule]}>
              <Input maxLength={MAX_INPUTE_LENGTH} type='url' />
            </Form.Item>
          </SearchItemsContainer>
          <S.Divider />
          <S.TagsForm>
            <S.TagPicker>
              <Form.Item className={'tag-input-grant-tag'} name={FORM_ITEM.grant_tag}>
                <S.Select
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
              <Form.Item className={'tag-input-grant-tag'} name={FORM_ITEM.add_tag}>
                <S.Select
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
