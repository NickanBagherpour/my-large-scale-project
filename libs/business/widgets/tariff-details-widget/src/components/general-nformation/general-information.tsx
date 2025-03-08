import React from 'react';

import * as S from './general-information.style';
import { Nullable, PageProps } from '@oxygen/types';
import { Button, InfoBox } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { useAppDispatch, useAppState } from '../../context';
import { getValueOrDash, ROUTES } from '@oxygen/utils';
import { useRouter } from 'next/navigation';
import { TariffDetailsType } from '../../types';

export type GeneralInformationProps = PageProps & {
  data: Nullable<TariffDetailsType>;
  isLoading: boolean;
  serviceName: Nullable<string>;
};
export const GeneralInformation: React.FC<GeneralInformationProps> = (props) => {
  const { data, isLoading } = props;

  const state = useAppState();
  const dispatch = useAppDispatch();
  const [t] = useTr();
  const router = useRouter();

  const typeMap = {
    1: t('single'),
    2: t('group'),
  };

  const handleHistory = () => {
    console.log('delete clicked');
  };

  let generalInfoData: { key: string; value: string }[] = [];

  if (data) {
    const { serviceName, fieldName, bankingShare, operationShare, aggregationType, type } = data;

    generalInfoData = [
      { key: t('service_english_name'), value: getValueOrDash(serviceName) },
      { key: t('banking_share'), value: `${getValueOrDash(bankingShare)}٪` },
      { key: t('contribution_operational_team'), value: `${getValueOrDash(operationShare)}٪` },
      { key: t('service_type'), value: aggregationType ? typeMap[aggregationType] : null },
      { key: t('field_name_in_elastic'), value: fieldName },
      { key: t('transaction_type_in_elastic'), value: type },
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
      <InfoBox data={generalInfoData} margin={0} loading={isLoading} minColumnCount={3} />
    </S.GeneralInformationContainer>
  );
};
