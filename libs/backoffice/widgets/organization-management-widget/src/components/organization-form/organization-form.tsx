import { Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import React, { useEffect, useState } from 'react';

import { useTr } from '@oxygen/translation';
import { useApp, useAppTheme } from '@oxygen/hooks';
import { Button, DatePicker, Input, Loading, SearchItemsContainer, Select, Tooltip } from '@oxygen/ui-kit';

import { ApiErrorResponseType, createFormSchema } from '../../types';
import { prepareSubmitOrganizationParams } from '../../utils/helper';
import { useGetOrganizationInfoQuery, usePostNewOrganizationMutation } from '../../services';
import { updateOrganizationNationalIDAction, useAppDispatch, useAppState } from '../../context';
import { FORM_INPUT_VALIDATION, FORM_ITEMS_NAME, INQUIRY_MAX_LENGTH, selectLegalTypeOptions } from '../../utils/consts';

import * as S from './organization-form.style';
import { OrganizationInfoSection } from '../organization-info-section/organization-info-section';
import { RepresentativeInfoSection } from '../representative-info/representative-info';
import { TechnicalRepresentativeInfoSection } from '../technical-representative-info/technical-representative-info';
import { ClientKeySection } from '../client-key-section/client-key-section';

export const OrganizationForm = () => {
  //Hooks
  const state = useAppState();
  const dispatch = useAppDispatch();
  const [t] = useTr();
  const [form] = Form.useForm();
  const { notification } = useApp();
  const theme = useAppTheme();

  //Validations
  const rule = createSchemaFieldRule(createFormSchema(t));
  //States
  const [searchValue, setSearchValue] = useState({
    orgNationalId: undefined,
  });
  const [isError, setIsError] = useState<ApiErrorResponseType | null>(null);
  const [isFormDisabled, setIsFormDisabled] = useState<boolean>(true);
  //Queries
  const {
    data: orgInfo,
    isFetching: orgInfoFetching,
    refetch: searchRefetch,
    isSuccess,
  } = useGetOrganizationInfoQuery(searchValue, setIsError);
  //Mutations
  const { mutate: mutateNewOrganization, isPending } = usePostNewOrganizationMutation();
  //Constants
  const selectOptions = selectLegalTypeOptions;
  //UseEffects
  useEffect(() => {
    if (orgInfo?.organizationName && orgInfoFetching == false && isSuccess == true) {
      notification.error({ message: t('error_notification') });
      setIsFormDisabled(true);
    }
  }, [orgInfo, orgInfoFetching]);

  useEffect(() => {
    if (isError?.status === 404) {
      setIsFormDisabled(false);
      notification.success({ message: t('info_notification') });
      updateOrganizationNationalIDAction(dispatch, searchValue.orgNationalId);
    }
  }, [isError]);

  //Handlers
  const onFinish = async (values) => {
    mutateNewOrganization(prepareSubmitOrganizationParams(values, state.organizationNationalID), {
      onSuccess: async () => {
        notification.success({ message: t('success_notification') });
        form.resetFields();
        setSearchValue({
          orgNationalId: undefined,
        });
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

      <Form style={{ flexGrow: 1 }} layout={'vertical'} onFinish={onFinish} form={form} disabled={isFormDisabled}>
        <OrganizationInfoSection rule={rule} selectOptions={selectOptions} isFormDisabled={isFormDisabled} />
        <RepresentativeInfoSection rule={rule} />
        <TechnicalRepresentativeInfoSection rule={rule} />
        <ClientKeySection rule={rule} />

        <S.Footer>
          <Button htmlType='submit' onClick={() => onFinish} disabled={isPending || isFormDisabled} loading={isPending}>
            {t('organization_information_registration')}
          </Button>
        </S.Footer>
      </Form>
    </S.OrganizationFormContainer>
  );
};
