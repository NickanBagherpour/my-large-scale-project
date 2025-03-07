import React from 'react';

import { Button } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { Nullable, PageProps } from '@oxygen/types';

import * as S from './service-tariff.style';
import { TariffDetailsType } from '../../types';

export type ServiceTariffPropsType = PageProps & {
  serviceName: Nullable<string>;
  data: Nullable<TariffDetailsType>;
  isLoading: boolean;
};

export const ServiceTariff: React.FC<ServiceTariffPropsType> = (props) => {
  const [t] = useTr();

  const handleDetail = () => {
    console.log('clicked');
  };
  return (
    <S.ServiceTariffContainer>
      <S.HeaderContainer>
        <S.Title>{t('general_info')}</S.Title>
        <S.BTNContainer>
          <Button variant='filled' onClick={handleDetail}>
            <S.DetailIcon className='icon-clock' />
            {t('button.view_changes_history')}
          </Button>
        </S.BTNContainer>
      </S.HeaderContainer>
    </S.ServiceTariffContainer>
  );
};
