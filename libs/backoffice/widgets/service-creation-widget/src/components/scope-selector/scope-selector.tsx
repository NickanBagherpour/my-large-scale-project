'use client';
import { CSSProperties, useState } from 'react';

import { Input } from 'antd';
import { useTheme } from 'styled-components';

import { Loading } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { useDebouncedValue } from '@oxygen/hooks';

import * as S from './scope-selector.style';
import { useGetScopes } from '../../services';
import { Scope } from '../../types';

type Props = {
  className?: string;
  style?: CSSProperties;
  id?: string;
  onClear?: () => void;
  onSelect?: (scope: Scope) => void;
  disabled: boolean;
  isLoading: boolean;
};

const ScopeSelector = (props: Props) => {
  const { onSelect, onClear, id, className = '', style = {}, disabled, isLoading } = props;
  const MAX_LENGTH = 75;
  const theme = useTheme();
  const [t] = useTr();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebouncedValue(searchTerm, 500);
  const { data, isFetching } = useGetScopes({
    'scope-name': debouncedSearchTerm.trim(),
  });

  return (
    <S.AutoComplete
      autoFocus
      disabled={disabled}
      id={id}
      value={searchTerm}
      className={className}
      style={style}
      popupClassName={'popup'}
      options={data?.map((item) => ({ value: item.name, item }))}
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
          <S.Subtitle>{data.item.description}</S.Subtitle>
        </S.Item>
      )}
    >
      <Input
        size='large'
        prefix={isFetching || isLoading ? <Loading /> : <i className='icon-search-normal' />}
        placeholder={t('scope_name_from_o2_or_scope')}
      />
    </S.AutoComplete>
  );
};

export default ScopeSelector;
