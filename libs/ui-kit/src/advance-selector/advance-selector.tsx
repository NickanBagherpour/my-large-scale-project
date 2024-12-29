'use client';
import { CSSProperties, useState } from 'react';

import { AutoCompleteProps } from 'antd';
import { useTheme } from 'styled-components';
import { AutoComplete as AntAutoComplete } from 'antd';

import { Button, Loading } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';

import * as S from './advance-selector.style';
export type dataType = {
  id?: string;
  title: string;
  subTitle?: string;
};
type Props = AutoCompleteProps & {
  className?: string;
  style?: CSSProperties;
  onClear?: () => void;
  onSelect: (item: dataType) => void;
  label?: string;
  placeholder?: string;
  data: dataType[];
  loading: boolean;
  isLastPage: boolean;
  loadMore: () => void;
  onChange: (value: string) => void;
};

export const AdvanceSelector = (props: Props) => {
  const {
    data,
    loading,
    onSelect,
    onClear,
    className = '',
    style = {},
    label,
    placeholder,
    isLastPage,
    loadMore,
    onChange,
    ...rest
  } = props;

  const MAX_LENGTH = 75;

  const theme = useTheme();
  const [t] = useTr();

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <S.Container>
      <S.SelectLabel htmlFor='autocomplete'>{label}</S.SelectLabel>
      <AntAutoComplete
        prefix={loading ? <Loading /> : <i className='icon-search-normal' />}
        placeholder={placeholder}
        size='large'
        id='autocomplete'
        autoFocus
        value={searchTerm}
        className={className}
        style={{ height: 40, ...style }}
        popupClassName={'popup'}
        options={data?.map((item) => ({ value: item.title, item }))}
        notFoundContent={t('message.empty')}
        maxLength={MAX_LENGTH}
        allowClear
        onChange={onChange}
        onClear={onClear}
        onSearch={(value) => setSearchTerm(value)}
        onSelect={(_, option) => {
          onSelect(option.item);
          setSearchTerm('');
        }}
        dropdownRender={(menu) => (
          <>
            {menu}
            {!isLastPage && data && (
              <S.BtnContainer>
                <Button variant='link' color='secondary' onClick={loadMore} loading={loading}>
                  {t('button.display_more_items')} <i className='icon-chev-down' />
                </Button>
              </S.BtnContainer>
            )}
          </>
        )}
        optionRender={({ value, data }) => (
          <S.Item>
            <S.Title text={value as string} wordToHighlight={searchTerm} highlightColor={theme.secondary.main} />
            <S.Subtitle>{data.item.subTitle}</S.Subtitle>
            <S.Icon className='icon-plus' />
          </S.Item>
        )}
        {...rest}
      />
    </S.Container>
  );
};
