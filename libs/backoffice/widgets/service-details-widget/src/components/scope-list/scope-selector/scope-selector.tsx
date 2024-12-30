'use client';
import { CSSProperties, useState } from 'react';

import { Input } from 'antd';
import { useTheme } from 'styled-components';
import { AutoComplete as AntAutoComplete } from 'antd';

import { Loading } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { useDebouncedValue } from '@oxygen/hooks';

import * as S from './scope-selector.style';
import { useGetScopes } from '../../../services';
import { type Scope } from '@oxygen/types';
import { useAppState } from '../../../context';
import { pages } from 'next/dist/build/templates/app-page';

type Props = {
  className?: string;
  style?: CSSProperties;
  id?: string;
  onClear?: () => void;
  onSelect?: (scope: Scope) => void;
  disabled: boolean;
};

const ScopeSelector = (props: Props) => {
  const { onSelect, onClear, id, className = '', style = {}, disabled } = props;
  const MAX_LENGTH = 75;
  const theme = useTheme();
  const [t] = useTr();
  const state = useAppState();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebouncedValue(searchTerm, 500);

  const { data, isLoading } = useGetScopes({
    'search-field': searchTerm,
    page: 0,
    size: 5,
    sort: '',
  }); // const { data, isLoading } = useGetScopes({
  //   name: debouncedSearchTerm.trim(),
  //   pagination: { page: 1, rowsPerPage: 10 },
  // });
  return (
    <S.ScopeContainer>
      <AntAutoComplete
        autoFocus
        disabled={disabled}
        id={id}
        value={searchTerm}
        className={className}
        style={style}
        popupClassName={'popup'}
        options={data?.content.map((item) => ({ value: item.name, item }))}
        notFoundContent={t('message.empty')}
        maxLength={MAX_LENGTH}
        allowClear
        onClear={onClear}
        onSearch={(value) => setSearchTerm(value)}
        onSelect={(_, record) => {
          onSelect?.(record.item);
          setSearchTerm('');
        }}
        optionRender={({ value, data }) => (
          <S.Item>
            <S.Title text={value as string} wordToHighlight={searchTerm} highlightColor={theme.secondary.main} />
            <S.Subtitle>{data.item.description}test</S.Subtitle>
          </S.Item>
        )}
      >
        <Input
          size='large'
          prefix={isLoading ? <Loading /> : <i className='icon-search-normal' />}
          placeholder={t('scope_name_from_o2_or_scope')}
        />
      </AntAutoComplete>
    </S.ScopeContainer>
  );
};

export default ScopeSelector;
