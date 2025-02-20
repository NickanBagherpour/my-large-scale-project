'use client';
import { type Dispatch, useState } from 'react';

import { AdvanceSelector } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { useDebouncedValue } from '@oxygen/hooks';
import { Service } from '../../utils/services.type';
import { useGetServices } from '../../utils/get-services.api';

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
  const [debouncedSearchTerm] = useDebouncedValue(searchTerm);

  const { data, isFetching, hasNextPage, fetchNextPage } = useGetServices(debouncedSearchTerm.trim(), dispatch);
  const allData = data?.pages.reduce((acc, pageData) => [...acc, ...pageData.content], [] as Service[]);

  return (
    <div>
      <AdvanceSelector
        data={
          allData?.map((service) => ({
            title: service.name,
            subTitle: service.persianName ?? '',
            service,
          })) ?? []
        }
        value={searchTerm}
        onSelect={({ service }) => {
          setSearchTerm('');
          onSelect(service);
        }}
        onChange={(value) => setSearchTerm(value)}
        loading={isFetching}
        isLastPage={!hasNextPage}
        loadMore={() => fetchNextPage()}
        placeholder={t('uikit.search_english_or_persian_name')}
        disabled={disabled}
      />
    </div>
  );
};

export default ServiceSelector;
