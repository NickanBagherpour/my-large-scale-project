'use client';
import { useState } from 'react';

import { AdvanceSelector } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { useDebouncedValue } from '@oxygen/hooks';

import { useGetScopes } from '../../services';
import { Scope } from '../../types';

type Props = {
  onClear?: () => void;
  onSelect: (scope: Scope) => void;
  disabled: boolean;
};

const ScopeSelector = (props: Props) => {
  const { onSelect, disabled } = props;
  const [t] = useTr();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebouncedValue(searchTerm);
  const { data, isFetching, hasNextPage, fetchNextPage } = useGetScopes(debouncedSearchTerm.trim());
  const allData = data?.pages.reduce((acc, pageData) => [...acc, ...pageData.content], [] as Scope[]);

  return (
    <AdvanceSelector
      data={
        allData?.map((scope) => ({
          title: scope.name,
          subTitle: scope.description ?? '',
          scope /* Passes the full 'scope' object to ensure it can be retrieved via 'onSelect' and used directly in the parent component. */,
        })) ?? []
      }
      onSelect={({ scope }) => {
        setSearchTerm('');
        onSelect(scope);
      }}
      onChange={(value) => setSearchTerm(value)}
      value={searchTerm}
      loading={isFetching}
      isLastPage={!hasNextPage}
      loadMore={() => fetchNextPage()}
      placeholder={t('scope_name_from_o2_or_scope')}
      disabled={disabled}
      label={t('choose_scope')}
    />
  );
};

export default ScopeSelector;
