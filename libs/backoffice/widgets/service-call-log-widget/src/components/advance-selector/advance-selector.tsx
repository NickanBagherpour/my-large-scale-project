'use client';
import { CSSProperties } from 'react';

import { AutoComplete as AntAutoComplete, AutoCompleteProps } from 'antd';

import { useAppTheme } from '@oxygen/hooks';
import { Box, Button, Loading } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';

import * as S from './advance-selector.style';

export type dataType = {
  id?: string | number;
  title: string;
  subTitle?: string;
  client?: any;
  service?: any;
};

type Props<T> = Omit<AutoCompleteProps<string>, 'onSelect'> & {
  className?: string;
  style?: CSSProperties;
  onClear?: () => void;
  onSelect: (item: T) => void;
  label?: string;
  placeholder?: string;
  data: T[];
  loading: boolean;
  isLastPage: boolean;
  loadMore: () => void;
};

export const AdvanceSelector = <T extends dataType>(props: Props<T>) => {
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
    id,
    ...rest
  } = props;

  const MAX_LENGTH = 75;

  const theme = useAppTheme();
  const [t] = useTr();

  return (
    <S.Container>
      {/* <S.SelectLabel htmlFor={id ?? 'autocomplete'}>{label}</S.SelectLabel> */}
      <AntAutoComplete
        prefix={loading ? <Loading size='small' /> : <i className='icon-search-normal' />}
        placeholder={placeholder}
        size='large'
        id={id ?? 'autocomplete'}
        autoFocus
        value={props.value}
        className={className}
        style={{ height: 40, ...style }}
        popupClassName={'popup'}
        options={data?.map((item) => ({ value: item.title, item }))}
        notFoundContent={t('message.empty')}
        maxLength={MAX_LENGTH}
        allowClear
        onChange={onChange}
        onClear={onClear}
        onSelect={(_, option) => onSelect(option.item)}
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
            <Box display='flex' className='advanced-selector-box'>
              <S.Title
                text={value as string}
                wordToHighlight={props.value ?? ''}
                highlightColor={theme.secondary.main}
              />
              <S.Subtitle>{data.item.subTitle}</S.Subtitle>
            </Box>
            {/* <S.Icon className='icon-plus' /> */}
          </S.Item>
        )}
        {...rest}
      />
    </S.Container>
  );
};
