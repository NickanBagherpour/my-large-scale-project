'use client';
import { useState } from 'react';

import { AdvanceSelector } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { useDebouncedValue } from '@oxygen/hooks';

import { useGetScopes } from '../../services';
import { Scope } from '../../types';
import { SCOPE_PAGE_SIZE } from '../../utils/consts';

type Props = {
  id?: string;
  onClear?: () => void;
  onSelect: (scope: Scope) => void;
  disabled: boolean;
  isLoading: boolean;
};

const ScopeSelector = (props: Props) => {
  const { onSelect, id, disabled, isLoading } = props;
  const [t] = useTr();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebouncedValue(searchTerm, 500);
  const [page, setPage] = useState(0);
  const { data, isFetching } = useGetScopes({
    'scope-name': debouncedSearchTerm.trim(),
    page,
    size: SCOPE_PAGE_SIZE,
    sort: '',
  });

  const loadMore = () => setPage((prev) => prev + 1);

  return (
    <AdvanceSelector
      style={{ flex: 1 }}
      data={data?.content.map(({ name: title, description: subTitle, id }) => ({ title, subTitle, id })) ?? []}
      onSelect={({ id, subTitle: description, title: name }) => onSelect({ name, description, id })}
      onChange={(value) => setSearchTerm(value)}
      loading={isFetching}
      isLastPage={data?.last ?? true}
      loadMore={loadMore}
      placeholder={t('scope_name_from_o2_or_scope')}
      disabled={disabled}
      isLoading={isLoading}
      id={id}
    />
  );
};

export default ScopeSelector;
