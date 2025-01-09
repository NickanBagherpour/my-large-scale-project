'use client';
import { useState } from 'react';

import { AdvanceSelector } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { useDebouncedValue } from '@oxygen/hooks';

import { useGetScopes } from '../../services';
import { Scope } from '../../types';
import { SCOPE_PAGE_SIZE } from '../../utils/consts';

type Props = {
  onClear?: () => void;
  onSelect: (scope: Scope) => void;
  disabled: boolean;
};

const ScopeSelector = (props: Props) => {
  const { onSelect, disabled } = props;
  const [t] = useTr();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebouncedValue(searchTerm, 500);
  const [page, setPage] = useState(0);
  const { data, isFetching } = useGetScopes({
    'search-field': debouncedSearchTerm.trim(),
    page,
    size: SCOPE_PAGE_SIZE,
  });

  const loadMore = () => setPage((prev) => prev + 1);

  return (
    <AdvanceSelector
      data={
        data?.content.map((scope) => ({
          title: scope.name,
          subTitle: scope.description ?? '',
          scope /* Passes the full 'scope' object to ensure it can be retrieved via 'onSelect' and used directly in the parent component. */,
        })) ?? []
      }
      onSelect={({ scope }) => onSelect(scope)}
      onChange={(value) => setSearchTerm(value)}
      loading={isFetching}
      isLastPage={data?.last ?? true}
      loadMore={loadMore}
      placeholder={t('scope_name_from_o2_or_scope')}
      disabled={disabled}
      label={t('choose_scope')}
    />
  );
};

export default ScopeSelector;
