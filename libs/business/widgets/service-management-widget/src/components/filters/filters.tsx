import React, { useState } from 'react';

import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { useBounce } from '@oxygen/hooks';

import { updateSearchValueAction, updateSort, useAppDispatch, useAppState } from '../../context';

import { renderChips } from '../../utils/helper';
import { SORT_ORDER } from '../../utils/consts';

import * as S from './filters.style';

type FiltersPropsType = PageProps & {
  //
};
export const Filters: React.FC<FiltersPropsType> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  const [value, setValue] = useState('');

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
      </S.SearchContainer>

      <S.Indicators>
        {renderChips(state.status, dispatch, t)}
        <S.FilterPopover
          filters={[
            { key: SORT_ORDER.ASCENDING, title: t('newest'), icon: 'icon-arrow-ascending' },
            { key: SORT_ORDER.DESCENDING, title: t('oldest'), icon: 'icon-arrow-descending' },
          ]}
          initialValue={state.sort}
          onChange={(value) => updateSort(dispatch, value as SORT_ORDER)}
        />
      </S.Indicators>
    </S.FiltersContainer>
  );
};
