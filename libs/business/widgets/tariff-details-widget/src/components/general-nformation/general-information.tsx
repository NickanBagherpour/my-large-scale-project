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
  const { data, isLoading, serviceName } = props;

  const state = useAppState();
  const dispatch = useAppDispatch();
  const [t] = useTr();
  const router = useRouter();

  const handleEdit = () => {
    console.log('clicked');
    //TODO: change the TARIFF_LIST after the route added
    //  router.push(`${ROUTES.BUSINESS.TARIFF_LIST}?name=${serviceName}`)
  };
  const handleHistory = () => {
    console.log('delete clicked');
  };
  const generalInfoData = [
    { key: t('service_english_name'), value: getValueOrDash(data?.serviceName) },
    { key: t('banking_share'), value: `${getValueOrDash(data?.bankingShare)}٪` },
    { key: t('contribution_operational_team'), value: `${getValueOrDash(data?.operationShare)}٪` },
  ];

  return (
    <S.GeneralInformationContainer>
      <S.HeaderContainer>
        <S.Title>{t('general_info')}</S.Title>
        <S.BTNContainer>
          <Button variant='filled' onClick={handleHistory}>
            <S.DetailIcon className='icon-clock' />
            {t('button.view_changes_history')}
          </Button>
          <Button variant='solid' onClick={handleEdit}>
            <S.EditIcon className='icon-edit' />
            {t('common.edit')}
          </Button>
        </S.BTNContainer>
      </S.HeaderContainer>
      <InfoBox data={generalInfoData} margin={0} loading={isLoading} minColumnCount={3} />
    </S.GeneralInformationContainer>
  );
};
