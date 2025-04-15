import React, { useState } from 'react';

import { useTr } from '@oxygen/translation';

import { useAppDispatch, useAppState } from '../../context';

import * as S from './organization-form.styel';
import { Form } from 'antd';
import { Button, Input, Loading, SearchItemsContainer, Select } from '@oxygen/ui-kit';
import { useGetReportDataQuery } from '../../services';
import { useApp } from '@oxygen/hooks';
import { FORM_NAME, INPUTE_MAX_LENGTH } from '../../utils/consts';
import { createSchemaFieldRule } from 'antd-zod';
import { createFormSchema } from '../../types';

export const OrganizationForm = () => {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const [t] = useTr();
  const [form] = Form.useForm();
  const { notification } = useApp();

  //Validations
  const rule = createSchemaFieldRule(createFormSchema(t));

  const onFinish = async (values) => {
    console.log(':)', values);
  };
  const [searchValue, setSearchValue] = useState();
  const isFormDisabeled = !!(state.table.filters.name ?? undefined);
  const { data: orgInfo, isFetching: orgInfoFetching, refetch: searchRefetch } = useGetReportDataQuery(searchValue);
  const handleSearch = () => {
    searchRefetch();
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };
  return (
    <S.OrganizationFormContainer>
      <S.TitleContainer>
        <S.TitleText>{t('rganization_inquiry')}</S.TitleText>
      </S.TitleContainer>

      <S.SearchContainer>
        <S.Input
          size='large'
          value={searchValue}
          prefix={orgInfoFetching ? <Loading /> : <i className='icon-search-normal' />}
          placeholder={t('organization_form_placeholder.national_id')}
          onChange={(e) => handleChange(e)}
        />

        <Button onClick={handleSearch} loading={orgInfoFetching}>
          {t('button.search')}
          <i className={'icon-search-normal'} />
        </Button>
      </S.SearchContainer>
      <S.TitleContainer>
        <S.TitleText>{t('organization_info')}</S.TitleText>
      </S.TitleContainer>

      <Form style={{ flexGrow: 1 }} layout={'vertical'} onFinish={onFinish} form={form} disabled={isFormDisabeled}>
        <S.Card>
          <SearchItemsContainer>
            <Form.Item
              name={FORM_NAME.LEGAL_ENTITY_NAME}
              label={t('organization_form_lable.legal_entity_name')}
              rules={[rule]}
            >
              <Input
                size='large'
                placeholder={t('organization_form_placeholder.legal_entity_name')}
                maxLength={INPUTE_MAX_LENGTH}
              />
            </Form.Item>
            <Form.Item
              name={FORM_NAME.LEGAL_ENTITY_TYPE}
              label={t('organization_form_lable.legal_entity_type')}
              rules={[rule]}
            >
              <Select
                placeholder={t('organization_form_placeholder.legal_entity_type')}
                disabled={isFormDisabeled}
                size={'large'}
                options={[]}
                loading={false}
              ></Select>
            </Form.Item>
            <Form.Item
              name={FORM_NAME.REGISTRATION_NUMBER}
              label={t('organization_form_lable.registration_number')}
              rules={[rule]}
            >
              <Input
                size='large'
                placeholder={t('organization_form_placeholder.registration_number')}
                maxLength={INPUTE_MAX_LENGTH}
              />
            </Form.Item>
            <Form.Item
              name={FORM_NAME.REGISTRATION_DATE}
              label={t('organization_form_lable.Registration_date')}
              rules={[rule]}
            >
              <Input
                size='large'
                placeholder={t('organization_form_placeholder.Registration_date')}
                maxLength={INPUTE_MAX_LENGTH}
              />
            </Form.Item>
            <Form.Item name={FORM_NAME.ECONOMY_CODE} label={t('organization_form_lable.economy_code')} rules={[rule]}>
              <Input
                size='large'
                placeholder={t('organization_form_placeholder.economy_code')}
                maxLength={INPUTE_MAX_LENGTH}
              />
            </Form.Item>
            <Form.Item
              name={FORM_NAME.ACTIVITY_FIELD}
              label={t('organization_form_lable.activity_field')}
              rules={[rule]}
            >
              <Input
                size='large'
                placeholder={t('organization_form_placeholder.activity_field')}
                maxLength={INPUTE_MAX_LENGTH}
              />
            </Form.Item>
            <Form.Item name={FORM_NAME.ZIP_CODE} label={t('organization_form_lable.zip_code')} rules={[rule]}>
              <Input
                size='large'
                placeholder={t('organization_form_placeholder.zip_code')}
                maxLength={INPUTE_MAX_LENGTH}
              />
            </Form.Item>
            <Form.Item name={FORM_NAME.TELEPHONE} label={t('organization_form_lable.telephone')} rules={[rule]}>
              <Input
                size='large'
                placeholder={t('organization_form_placeholder.telephone')}
                maxLength={INPUTE_MAX_LENGTH}
              />
            </Form.Item>
            <Form.Item
              name={FORM_NAME.LAST_REGISTERED_ADDRESS}
              rules={[rule]}
              label={t('organization_form_lable.last_registered_address')}
              className='full-width '
            >
              <Input
                size='large'
                placeholder={t('organization_form_placeholder.last_registered_address')}
                maxLength={INPUTE_MAX_LENGTH}
              />
            </Form.Item>
          </SearchItemsContainer>
        </S.Card>
        <S.TitleContainer>
          <S.TitleText>{t('representative_information')}</S.TitleText>
        </S.TitleContainer>
        <S.Card>
          <SearchItemsContainer $columnNumber='3'>
            <Form.Item
              name={FORM_NAME.REPRESENTATIVE.FIRST_AND_LAST_NAME}
              label={t('organization_form_lable.first_and_last_name')}
              rules={[rule]}
            >
              <Input
                size='large'
                placeholder={t('organization_form_placeholder.first_and_last_name')}
                maxLength={INPUTE_MAX_LENGTH}
              />
            </Form.Item>
            <Form.Item
              name={FORM_NAME.REPRESENTATIVE.MOBILE_NUMBER}
              label={t('organization_form_lable.mobile_number')}
              rules={[rule]}
            >
              <Input
                size='large'
                placeholder={t('organization_form_placeholder.mobile_number')}
                maxLength={INPUTE_MAX_LENGTH}
              />
            </Form.Item>
            <Form.Item
              name={FORM_NAME.REPRESENTATIVE.LANDLINE_NUMBER}
              label={t('organization_form_lable.landline_number')}
              rules={[rule]}
            >
              <Input
                size='large'
                placeholder={t('organization_form_placeholder.landline_number')}
                maxLength={INPUTE_MAX_LENGTH}
              />
            </Form.Item>
          </SearchItemsContainer>
        </S.Card>
        <S.TitleContainer>
          <S.TitleText>{t('technical_representative_information')}</S.TitleText>
        </S.TitleContainer>
        <S.Card>
          <SearchItemsContainer $columnNumber='3'>
            <Form.Item
              name={FORM_NAME.TECHNICAL_REPRESENTATIVE.FIRST_AND_LAST_NAME}
              label={t('organization_form_lable.first_and_last_name')}
              rules={[rule]}
            >
              <Input
                size='large'
                placeholder={t('organization_form_placeholder.first_and_last_name')}
                maxLength={INPUTE_MAX_LENGTH}
              />
            </Form.Item>
            <Form.Item
              name={FORM_NAME.TECHNICAL_REPRESENTATIVE.MOBILE_NUMBER}
              label={t('organization_form_lable.mobile_number')}
              rules={[rule]}
            >
              <Input
                size='large'
                placeholder={t('organization_form_placeholder.mobile_number')}
                maxLength={INPUTE_MAX_LENGTH}
              />
            </Form.Item>
            <Form.Item
              name={FORM_NAME.TECHNICAL_REPRESENTATIVE.LANDLINE_NUMBER}
              label={t('organization_form_lable.landline_number')}
              rules={[rule]}
            >
              <Input
                size='large'
                placeholder={t('organization_form_placeholder.landline_number')}
                maxLength={INPUTE_MAX_LENGTH}
              />
            </Form.Item>
          </SearchItemsContainer>
        </S.Card>
      </Form>
    </S.OrganizationFormContainer>
  );
};
