import React from 'react';

import { Button } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { Nullable, PageProps } from '@oxygen/types';

import * as S from './service-tariff.style';

export type ServiceTariffPropsType = PageProps & {
  serviceName: Nullable<string>;
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
