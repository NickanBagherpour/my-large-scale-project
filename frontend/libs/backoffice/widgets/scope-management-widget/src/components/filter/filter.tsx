import React, { useState } from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';

import { useAppDispatch, useAppState } from '../../context';
import * as S from './filter.style';
import { FORM_ITEM_NAMES } from '../../utils/form-item-name';
import { MAX_LENGTH_INPUT } from '../../utils/consts';

type FilterProps = PageProps & {
  //
};

const Filter: React.FC<FilterProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();
  const [value, setValue] = useState('');

  return (
    <S.FilterContainer>
      <S.Actions>
        <S.Input
          name={FORM_ITEM_NAMES.scopesName}
          value={value}
          placeholder={t('placeholder.search_by_name_or_id')}
          maxLength={MAX_LENGTH_INPUT}
          prefix={<i className='icon-search-normal' />}
          onChange={(e) => setValue(e.target.value)}
        />
        <S.Buttons>
          <S.Button href='#' color='primary' variant='outlined'>
            {t('button.upload_scope')}
          </S.Button>
          <S.Button href='#' color='primary' variant='solid'>
            {t('button.create_new_scope')}
          </S.Button>
        </S.Buttons>
      </S.Actions>
    </S.FilterContainer>
  );
};

export default Filter;
