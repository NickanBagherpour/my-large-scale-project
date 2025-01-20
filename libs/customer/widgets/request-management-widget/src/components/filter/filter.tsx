import React, { useState } from 'react';

import { useTr } from '@oxygen/translation';
import { useBounce } from '@oxygen/hooks';
import { PageProps } from '@oxygen/types';

import { renderChips } from '../../utils/helper';
import { MAX_LENGTH, SORT_ORDER } from '../../utils/consts';
import { Sort } from '../../types/common-types';
import { ROUTES } from '@oxygen/utils';

import { updateSearchTerm, updateSort, useAppDispatch, useAppState } from '../../context';

import * as S from './filter.style';

type FilterProps = PageProps & {
  //
};

const Filters: React.FC<FilterProps> = (props) => {
  const [t] = useTr();
  const dispatch = useAppDispatch();
  const { status, sort } = useAppState();
  const [value, setValue] = useState('');

  useBounce(() => {
    updateSearchTerm(dispatch, value);
  }, [value]);

  return (
    <S.Container>
      <S.Actions>
        <S.Input
          value={value}
          placeholder={t('search_by_name_or_request_id')}
          prefix={<i className='icon-search-normal' />}
          onChange={(e) => setValue(e.target.value)}
          allow={'letter'}
          type='text'
          maxLength={MAX_LENGTH}
        />
        <S.Buttons>
          <S.Button href={ROUTES.CUSTOMER.REQUEST_REGISTRATION} color='primary' variant='solid'>
            {t('request_registration')}
          </S.Button>
        </S.Buttons>
      </S.Actions>

      <S.Indicators>
        {renderChips(status, dispatch, t)}
        <S.FilterPopover
          filters={[
            { key: SORT_ORDER.ASCENDING, title: t('newest'), icon: 'icon-arrow-ascending' },
            { key: SORT_ORDER.DESCENDING, title: t('oldest'), icon: 'icon-arrow-descending' },
          ]}
          initialValue={sort}
          onChange={(value) => updateSort(dispatch, value as Sort)}
        />
      </S.Indicators>
    </S.Container>
  );
};

export default Filters;
