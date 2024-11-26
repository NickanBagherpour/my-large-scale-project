'use client';
import { CSSProperties, useState } from 'react';

import { Input } from 'antd';
import { useTheme } from 'styled-components';
import { AutoComplete as AntAutoComplete } from 'antd';

import { Loading } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { useDebouncedValue } from '@oxygen/hooks';

import { useGetClientService, type ClientService } from './use-get-client-services';

import * as S from './advance-selector.style';

type Props = {
  className?: string;
  style?: CSSProperties;
  onClear?: () => void;
  onSelect: (item: ClientService) => void;
  label?: string;
  placeholder?: string;
};

const AdvanceSelector = (props: Props) => {
  const { onSelect, onClear, className = '', style = {}, label, placeholder } = props;

  const MAX_LENGTH = 75;

  const theme = useTheme();
  const [t] = useTr();

  const [searchTerm, setSearchTerm] = useState('');

  const [debouncedSearchTerm] = useDebouncedValue(searchTerm, 500);

  const { data, isLoading } = useGetClientService({ name: debouncedSearchTerm.trim() });

  return (
    <>
      <S.SelectLabel htmlFor='autocomplete'>{label}</S.SelectLabel>
      <AntAutoComplete
        id='autocomplete'
        autoFocus
        value={searchTerm}
        className={className}
        style={style}
        popupClassName={'popup'}
        options={data?.map((item) => ({ value: item.title, item }))}
        notFoundContent={t('message.empty')}
        maxLength={MAX_LENGTH}
        allowClear
        onClear={onClear}
        onSearch={(value) => setSearchTerm(value)}
        onSelect={(_, option) => {
          onSelect(option.item);
          setSearchTerm('');
        }}
        optionRender={({ value, data }) => (
          <S.Item>
            <S.Title text={value as string} wordToHighlight={searchTerm} highlightColor={theme.secondary.main} />
            <S.Subtitle>{data.item.subTitle}</S.Subtitle>
            <S.Icon className='icon-plus' />
          </S.Item>
        )}
      >
        <Input
          size='large'
          prefix={isLoading ? <Loading /> : <i className='icon-search-normal' />}
          placeholder={placeholder}
        />
      </AntAutoComplete>
    </>
  );
};

export default AdvanceSelector;
