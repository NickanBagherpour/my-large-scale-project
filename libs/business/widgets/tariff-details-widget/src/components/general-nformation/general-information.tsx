import React from 'react';

import * as S from './general-information.style';
import { InfoItemType, Nullable, PageProps } from '@oxygen/types';
import { Button, InfoBox } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { getValueOrDash, ROUTES } from '@oxygen/utils';
import { TariffDetailsType } from '../../types';
import { Form } from 'antd';
import { getInitialValues } from '../../utils/get-initial-values';
import { ServiceTariff as Tariff } from '@oxygen/reusable-components';

export type GeneralInformationProps = PageProps & {
  data: Nullable<TariffDetailsType>;
  isLoading: boolean;
  serviceName: Nullable<string>;
};
export const GeneralInformation: React.FC<GeneralInformationProps> = (props) => {
  const { data, isLoading } = props;
  const [t] = useTr();
  const [form] = Form.useForm();

  const typeMap = {
    1: t('single'),
    2: t('group'),
  };

  const handleHistory = () => {
    console.log('delete clicked');
  };

  const initialValues = getInitialValues(data);

  let generalInfoData: InfoItemType[] = [];

  if (data) {
    const {
      serviceName,
      fieldName,
      bankingShare,
      operationShare,
      aggregationType,
      type,
      servicePersianName,
      typeFieldName,
    } = data;

    generalInfoData = [
      { key: t('service_english_name'), value: getValueOrDash(serviceName) },
      { key: t('service_persian_name'), value: getValueOrDash(servicePersianName) },
      { key: t('banking_share'), value: `${getValueOrDash(bankingShare)}٪` },
      { key: t('contribution_operational_team'), value: `${getValueOrDash(operationShare)}٪` },
      { key: t('service_type'), value: aggregationType ? typeMap[aggregationType] : null },
      { key: t('field_name_in_elastic'), value: fieldName },
      { key: t('transaction_type_in_elastic'), value: type },
      { key: t('transfer_type_param_elastic'), value: typeFieldName },
      {
        key: '',
        fullwidth: true,
        value: (
          <Form initialValues={initialValues} disabled form={form}>
            <Tariff type='details' rule={null} form={form} />
          </Form>
        ),
      },
    ];
  }

  return (
    <S.GeneralInformationContainer>
      <S.HeaderContainer>
        <S.Title>{t('general_info')}</S.Title>
        <S.BTNContainer>
          <Button variant='filled' onClick={handleHistory}>
            <S.DetailIcon className='icon-clock' />
            {t('button.view_changes_history')}
          </Button>
          <Button variant='solid' href={`${ROUTES.BUSINESS.UPSERT_TARIFF}?service-name=${data?.serviceName}`}>
            <S.EditIcon className='icon-edit' />
            {t('common.edit')}
          </Button>
        </S.BTNContainer>
      </S.HeaderContainer>
      <InfoBox data={generalInfoData} margin={0} loading={isLoading} minColumnCount={4} />
    </S.GeneralInformationContainer>
  );
};
