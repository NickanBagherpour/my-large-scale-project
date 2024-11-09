import { useState } from 'react';

import { useTr } from '@oxygen/translation';
import { useBounce } from '@oxygen/hooks';
import { ROUTES } from '@oxygen/utils';

import { updateSearchTerm, useAppDispatch } from '../../context';

import * as S from './filters.style';

export default function Filters() {
  const dispatch = useAppDispatch();
  const [t] = useTr();

  const [value, setValue] = useState('');

  useBounce(() => {
    updateSearchTerm(dispatch, value);
  }, [value]);

  return (
    <S.Container>
      <S.Actions>
        <S.StyledInput
          value={value}
          placeholder={t('search_by_name')}
          prefix={<i className='icon-search-normal' />}
          onChange={(e) => setValue(e.target.value)}
        />

        <S.Buttons>
          <S.StyledButton href={ROUTES.BACKOFFICE.UPSTREAM_CREATION} color='primary' variant='solid'>
            {t('create_new_upstream')}
          </S.StyledButton>
        </S.Buttons>
      </S.Actions>

      {/*<S.Indicators>*/}
      {/*  <S.FilterPopover*/}
      {/*    filters={[*/}
      {/*      { key: 'newest', title: t('newest'), icon: 'icon-arrow-ascending' },*/}
      {/*      { key: 'oldest', title: t('oldest'), icon: 'icon-arrow-descending' },*/}
      {/*    ]}*/}
      {/*    initialValue={sort}*/}
      {/*    onChange={(value) => updateSort(dispatch, value as Sort)}*/}
      {/*  />*/}
      {/*</S.Indicators>*/}
    </S.Container>
  );
}
