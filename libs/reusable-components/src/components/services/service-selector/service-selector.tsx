'use client';
import { type Dispatch, useState } from 'react';

import { AdvanceSelector } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { useBounce } from '@oxygen/hooks';
import { SERVICE_PAGE_SIZE } from '../utils/const';
import { Service } from '../utils/services.type';
import { useGetServices } from '../utils/get-services.api';

type Props = {
  onClear?: () => void;
  onSelect: (scope: Service) => void;
  disabled: boolean;
  dispatch: Dispatch<any>;
};

const ServiceSelector = (props: Props) => {
  const { onSelect, disabled, dispatch } = props;
  const [t] = useTr();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const { data, isFetching } = useGetServices(
    {
      'search-field': debouncedSearchTerm.trim(),
      page,
      size: SERVICE_PAGE_SIZE,
      isActive: true,
      sort: 'createDate,DESC',
    },
    dispatch
  );

  useBounce(() => {
    setDebouncedSearchTerm(searchTerm);
    setPage(0);
  }, [searchTerm]);

  const loadMore = () => setPage((prev) => prev + 1);

  return (
    <AdvanceSelector
      data={
        data?.content.map((service) => ({
          title: service.name,
          subTitle: service.persianName ?? '',
          service,
        })) ?? []
      }
      onSelect={({ service }) => onSelect(service)}
      onChange={(value) => setSearchTerm(value)}
      loading={isFetching}
      isLastPage={data?.last ?? true}
      loadMore={loadMore}
      placeholder={t('uikit.search_english_or_persian_name')}
      disabled={disabled}
    />
  );
};

export default ServiceSelector;
