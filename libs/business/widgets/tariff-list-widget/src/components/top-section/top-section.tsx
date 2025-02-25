import React, { useState } from 'react';

import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { useBounce, useToggle } from '@oxygen/hooks';
import { InquiryComponent } from '@oxygen/reusable-components';

import { updateSearchValueAction, useAppDispatch } from '../../context';

import * as S from './top-section.style';

type TopSectionPropsType = PageProps & {
  //
};
export const TopSection: React.FC<TopSectionPropsType> = (props) => {
  const dispatch = useAppDispatch();
  const [t] = useTr();

  const [value, setValue] = useState('');
  const [isInquiryModalOpen, toggleInquiryModal] = useToggle(false);

  useBounce(() => {
    updateSearchValueAction(dispatch, value.trim());
  }, [value.trim()]);

  return (
    <S.TopSectionContainer>
      <S.Input
        value={value}
        placeholder={t('search_placeholder')}
        prefix={<i className='icon-search-normal' />}
        onChange={(e) => setValue(e.target.value)}
      />
      <S.ButtonContainer>
        <S.Button onClick={toggleInquiryModal} color='primary' variant='solid'>
          {t('add_tariff')}
        </S.Button>
      </S.ButtonContainer>
      {isInquiryModalOpen && <InquiryComponent type='client' dispatch={dispatch} toggle={toggleInquiryModal} />}
    </S.TopSectionContainer>
  );
};
