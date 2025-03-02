'use client';
import { type Dispatch, useState } from 'react';

import { AdvanceSelector } from '../advance-selector/advance-selector';
import { useTr } from '@oxygen/translation';
import { useDebouncedValue } from '@oxygen/hooks';
import { Service } from '../../utils/services.type';
import { useGetServices } from '../../utils/get-services.api';
import { useGetClientsQuery } from '../../utils/get-clients.api';

type Props = {
  onClear?: () => void;
  onSelect: (scope: any) => void;
  disabled: boolean;
  dispatch: Dispatch<any>;
};

const ServiceSelector = (props: Props) => {
  const { onSelect, disabled, dispatch } = props;
  const [t] = useTr();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebouncedValue(searchTerm);

  const { data, isFetching, hasNextPage, fetchNextPage } = useGetClientsQuery(debouncedSearchTerm.trim(), dispatch);
  const allData = data?.pages.reduce((acc, pageData) => [...acc, ...pageData.content], [] as any[]);

  return (
    <div>
      <AdvanceSelector
        data={
          allData?.map((client) => ({
            title: client.clientName,
            subTitle: client.clientName ?? '',
            client,
          })) ?? []
        }
        value={searchTerm}
        onSelect={({ client }) => {
          // setSearchTerm('');
          onSelect(client);
        }}
        onChange={(value) => {
          setSearchTerm(value);
        }}
        // setSearchTerm(value)}
        loading={isFetching}
        isLastPage={!hasNextPage}
        loadMore={() => fetchNextPage()}
        placeholder={t('placeholder.choose_client')}
        disabled={disabled}
      />
    </div>
  );
};

export default ServiceSelector;
