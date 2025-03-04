import React from 'react';
import { Button } from '@oxygen/ui-kit';
import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';

import * as S from './service-tariff.style';

export type ServiceTariffPropsType = PageProps & {
  //
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
