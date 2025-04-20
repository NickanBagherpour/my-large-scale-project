import { Form, theme } from 'antd';
import { useRouter } from 'next/navigation';
import { createSchemaFieldRule } from 'antd-zod';
import React, { useEffect, useState } from 'react';

import { useTr } from '@oxygen/translation';
import { useApp, useAppTheme } from '@oxygen/hooks';
import { Button, DatePicker, Input, Loading, SearchItemsContainer, Select, Tooltip } from '@oxygen/ui-kit';

import { createFormSchema } from '../../types';
import { updateOrganizationNationalIDAction, useAppDispatch, useAppState } from '../../context';
import { prepareSubmitOrganizationParams } from '../../utils/helper';
import { useGetOrganizationInfoQuery, usePostNewOrganizationMutation } from '../../services';
import { FORM_ITEMS_NAME, INPUT_MAX_LENGTH, INQUIRY_MAX_LENGTH, selectLegalTypeOptions } from '../../utils/consts';

import * as S from './organization-form.style';

export const OrganizationForm = () => {
  //Hooks
  const state = useAppState();
  const dispatch = useAppDispatch();
  const [t] = useTr();
  const [form] = Form.useForm();
  const { notification } = useApp();
  const router = useRouter();
  const theme = useAppTheme();

  //Validations
  const rule = createSchemaFieldRule(createFormSchema(t));
  //States
  const [searchValue, setSearchValue] = useState({
    orgNationalId: undefined,
  });
  const [isError, setIsError] = useState(null);
  //Queries
  const {
    data: orgInfo,
    isFetching: orgInfoFetching,
    refetch: searchRefetch,
  } = useGetOrganizationInfoQuery(searchValue!, setIsError);
  //Mutations
  const { mutate: mutateNewOrganization, isPending } = usePostNewOrganizationMutation();
  //Constants
  const isFormDisabled = isError === 404 ? false : true;
  const selectOptions = selectLegalTypeOptions;

  useEffect(() => {
    if (orgInfo?.organizationName) {
      notification.error({ message: t('error_notification') });
    }
  }, [orgInfo]);

  useEffect(() => {
    if (isError === 404) {
      notification.success({ message: t('info_notification') });
      updateOrganizationNationalIDAction(dispatch, searchValue.orgNationalId);
    }
  }, [isError]);

  //Handlers

  const onFinish = async (values) => {
    mutateNewOrganization(prepareSubmitOrganizationParams(values, state.organizationNationalID), {
      onSuccess: async () => {
        notification.success({ message: t('success_notification') });
      },
    });
  };
  const handleSearch = () => {
    searchRefetch();
  };
  const handleChange = (e) => {
    setSearchValue({ orgNationalId: e.target.value });
  };
  return (
    <S.OrganizationFormContainer>
      <S.TitleContainer>
        <S.TitleText>{t('organization_inquiry')}</S.TitleText>
      </S.TitleContainer>

      <S.SearchContainer>
        <S.Input
          size='large'
          value={searchValue.orgNationalId}
          prefix={orgInfoFetching ? <Loading /> : <i className='icon-search-normal' />}
          placeholder={t('organization_form_placeholder.national_id')}
          onChange={(e) => handleChange(e)}
          maxLength={INQUIRY_MAX_LENGTH}
        />

        <Button onClick={handleSearch} loading={orgInfoFetching}>
          {t('button.search')}
          <i className={'icon-search-normal'} />
        </Button>
      </S.SearchContainer>
      <S.TitleContainer>
        <S.TitleText>{t('organization_info')}</S.TitleText>
      </S.TitleContainer>

      <Form style={{ flexGrow: 1 }} layout={'vertical'} onFinish={onFinish} form={form} disabled={isFormDisabled}>
        <S.Card>
          <SearchItemsContainer>
            <Form.Item
              name={FORM_ITEMS_NAME.LEGAL_ENTITY_NAME}
              label={t('organization_form_label.legal_entity_name')}
              rules={[rule]}
            >
              <Input
                size='large'
                placeholder={t('organization_form_placeholder.legal_entity_name')}
                maxLength={INPUT_MAX_LENGTH}
              />
            </Form.Item>
            <Form.Item
              name={FORM_ITEMS_NAME.LEGAL_ENTITY_TYPE}
              label={t('organization_form_label.legal_entity_type')}
              rules={[rule]}
            >
              <Select
                placeholder={t('organization_form_placeholder.legal_entity_type')}
                disabled={isFormDisabled}
                size={'large'}
                options={selectOptions}
                loading={false}
              ></Select>
            </Form.Item>
            <Form.Item
              name={FORM_ITEMS_NAME.REGISTRATION_NUMBER}
              label={t('organization_form_label.registration_number')}
              rules={[rule]}
            >
              <Input
                size='large'
                placeholder={t('organization_form_placeholder.registration_number')}
                maxLength={INPUT_MAX_LENGTH}
              />
            </Form.Item>
            <Form.Item
              name={FORM_ITEMS_NAME.REGISTRATION_DATE}
              label={t('organization_form_label.Registration_date')}
              rules={[rule]}
            >
              <DatePicker
                placeholder={t('organization_form_placeholder.Registration_date')}
                suffixIcon={<i className='icon-calendar-2' />}
                disableFuture={true}
              />
            </Form.Item>
            <Form.Item
              name={FORM_ITEMS_NAME.ECONOMY_CODE}
              label={t('organization_form_label.economy_code')}
              rules={[rule]}
            >
              <Input
                size='large'
                placeholder={t('organization_form_placeholder.economy_code')}
                maxLength={INPUT_MAX_LENGTH}
              />
            </Form.Item>
            <Form.Item
              name={FORM_ITEMS_NAME.ACTIVITY_FIELD}
              label={t('organization_form_label.activity_field')}
              rules={[rule]}
            >
              <Input
                size='large'
                placeholder={t('organization_form_placeholder.activity_field')}
                maxLength={INPUT_MAX_LENGTH}
              />
            </Form.Item>
            <Form.Item name={FORM_ITEMS_NAME.ZIP_CODE} label={t('organization_form_label.zip_code')} rules={[rule]}>
              <Input
                size='large'
                placeholder={t('organization_form_placeholder.zip_code')}
                maxLength={INPUT_MAX_LENGTH}
              />
            </Form.Item>
            <Form.Item name={FORM_ITEMS_NAME.TELEPHONE} label={t('organization_form_label.telephone')} rules={[rule]}>
              <Input
                size='large'
                placeholder={t('organization_form_placeholder.telephone')}
                maxLength={INPUT_MAX_LENGTH}
              />
            </Form.Item>
            <Form.Item
              name={FORM_ITEMS_NAME.LAST_REGISTERED_ADDRESS}
              rules={[rule]}
              label={t('organization_form_label.last_registered_address')}
              className='full-width '
            >
              <Input
                size='large'
                placeholder={t('organization_form_placeholder.last_registered_address')}
                maxLength={INPUT_MAX_LENGTH}
              />
            </Form.Item>
          </SearchItemsContainer>
        </S.Card>
        <S.TitleContainer>
          <S.TitleText>{t('representative_information')}</S.TitleText>
          <Tooltip color={theme.primary.main} title={t('tooltip.representative_name')}>
            <S.Icon className={'icon-info-circle'} />
          </Tooltip>
        </S.TitleContainer>
        <S.Card>
          <SearchItemsContainer $columnNumber='3'>
            <Form.Item
              name={FORM_ITEMS_NAME.REPRESENTATIVE.FIRST_AND_LAST_NAME}
              label={t('organization_form_label.first_and_last_name')}
              rules={[rule]}
            >
              <Input
                size='large'
                placeholder={t('organization_form_placeholder.first_and_last_name')}
                maxLength={INPUT_MAX_LENGTH}
              />
            </Form.Item>
            <Form.Item
              name={FORM_ITEMS_NAME.REPRESENTATIVE.MOBILE_NUMBER}
              label={t('organization_form_label.mobile_number')}
              rules={[rule]}
            >
              <Input
                size='large'
                placeholder={t('organization_form_placeholder.mobile_number')}
                maxLength={INPUT_MAX_LENGTH}
              />
            </Form.Item>
            <Form.Item
              name={FORM_ITEMS_NAME.REPRESENTATIVE.LANDLINE_NUMBER}
              label={t('organization_form_label.landline_number')}
              rules={[rule]}
            >
              <Input
                size='large'
                placeholder={t('organization_form_placeholder.landline_number')}
                maxLength={INPUT_MAX_LENGTH}
              />
            </Form.Item>
          </SearchItemsContainer>
        </S.Card>
        <S.TitleContainer>
          <S.TitleText>{t('technical_representative_information')}</S.TitleText>
          <Tooltip color={theme.primary.main} title={t('tooltip.technical_representative_name')}>
            <S.Icon className={'icon-info-circle'} />
          </Tooltip>
        </S.TitleContainer>
        <S.Card>
          <SearchItemsContainer $columnNumber='3'>
            <Form.Item
              name={FORM_ITEMS_NAME.TECHNICAL_REPRESENTATIVE.FIRST_AND_LAST_NAME}
              label={t('organization_form_label.first_and_last_name')}
              rules={[rule]}
            >
              <Input
                size='large'
                placeholder={t('organization_form_placeholder.first_and_last_name')}
                maxLength={INPUT_MAX_LENGTH}
              />
            </Form.Item>
            <Form.Item
              name={FORM_ITEMS_NAME.TECHNICAL_REPRESENTATIVE.MOBILE_NUMBER}
              label={t('organization_form_label.mobile_number')}
              rules={[rule]}
            >
              <Input
                size='large'
                placeholder={t('organization_form_placeholder.mobile_number')}
                maxLength={INPUT_MAX_LENGTH}
              />
            </Form.Item>
            <Form.Item
              name={FORM_ITEMS_NAME.TECHNICAL_REPRESENTATIVE.LANDLINE_NUMBER}
              label={t('organization_form_label.landline_number')}
              rules={[rule]}
            >
              <Input
                size='large'
                placeholder={t('organization_form_placeholder.landline_number')}
                maxLength={INPUT_MAX_LENGTH}
              />
            </Form.Item>
          </SearchItemsContainer>
        </S.Card>
        <S.TitleContainer>
          <S.TitleText>{t('client_key')}</S.TitleText>
        </S.TitleContainer>
        <S.Card>
          <S.AlertContainer description={t('client_key_note')} />
          <SearchItemsContainer $columnNumber='2'>
            <Form.Item name={FORM_ITEMS_NAME.CLIENT_KEY.CLIENT_KEY} label='ClientKey' rules={[rule]}>
              <Input size='large' placeholder={'ClientKey'} maxLength={INPUT_MAX_LENGTH} />
            </Form.Item>
          </SearchItemsContainer>
        </S.Card>
        <S.Footer>
          <Button htmlType='submit' onClick={() => form.submit()} disabled={false} loading={false}>
            {t('organization_information_registration')}
          </Button>
        </S.Footer>
      </Form>
    </S.OrganizationFormContainer>
  );
};
