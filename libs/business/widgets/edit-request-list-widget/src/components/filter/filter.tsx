import React, { useState } from 'react';

import { useTr } from '@oxygen/translation';
import { useBounce } from '@oxygen/hooks';

import { MAX_LENGTH } from '../../utils/consts';

import { updateSearchTerm, useAppDispatch } from '../../context';

import * as S from './filter.style';

const Filter: React.FC = () => {
  const [t] = useTr();
  const dispatch = useAppDispatch();
  const [value, setValue] = useState('');

  useBounce(() => {
    updateSearchTerm(dispatch, value);
  }, [value]);

  return (
    <S.Container>
      <S.Actions>
        <S.Title>{t('service_search')}</S.Title>
        <S.Input
          value={value}
          placeholder={t('search_by_service_name')}
          prefix={<i className='icon-search-normal' />}
          onChange={(e) => setValue(e.target.value)}
          allow={'letter'}
          type='text'
          maxLength={MAX_LENGTH}
        />
      </S.Actions>
    </S.Container>
  );
};

export default Filter;
