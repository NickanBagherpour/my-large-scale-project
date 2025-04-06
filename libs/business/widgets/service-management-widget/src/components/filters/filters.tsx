import React, { useState } from 'react';

import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { useBounce, useToggle } from '@oxygen/hooks';

import { updateSearchValueAction, useAppDispatch, useAppState } from '../../context';

import * as S from './filters.style';
import { SORT_ORDER } from '../../utils/consts';
import { renderChips } from '../../utils/helper';
// import ServiceFeeInquiry from '../service-fee-inquiry/service-fee-inquiry';

type FiltersPropsType = PageProps & {
  //
};
export const Filters: React.FC<FiltersPropsType> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  const [value, setValue] = useState('');
  const [isInquiryModalOpen, toggleInquiryModal] = useToggle(false);

  useBounce(() => {
    updateSearchValueAction(dispatch, value.trim());
  }, [value.trim()]);

  return (
    <S.FiltersContainer>
      <S.SearchContainer>
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
      </S.SearchContainer>

      <S.Indicators>
        {renderChips(state.status, dispatch, t)}
        <S.FilterPopover
          filters={[
            { key: SORT_ORDER.ASCENDING, title: t('newest'), icon: 'icon-arrow-ascending' },
            { key: SORT_ORDER.DESCENDING, title: t('oldest'), icon: 'icon-arrow-descending' },
          ]}
          initialValue={state.sort}
          onChange={(value) => console.log(value)}
        />
      </S.Indicators>
      {/* {isInquiryModalOpen && <ServiceFeeInquiry dispatch={dispatch} toggle={toggleInquiryModal} />} */}
    </S.FiltersContainer>
  );
};
