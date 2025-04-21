'use client';
import { type Dispatch, useState } from 'react';

import { AdvanceSelector, dataType } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { useDebouncedValue } from '@oxygen/hooks';
import { useGetClientsQuery } from '../../services/get-client-aggregator.api';

import * as S from './client-aggregator-selector.style';

type Props = {
  onClear?: () => void;
  onSelect: (scope: any) => void;
  disabled: boolean;
  dispatch: Dispatch<any>;
};

const ClientAggregatorSelector = (props: Props) => {
  const { onSelect, disabled, dispatch } = props;
  const [t] = useTr();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebouncedValue(searchTerm);

  // Fetch all data without passing searchTerm to the query
  const { data, isFetching } = useGetClientsQuery('', dispatch); // Fetch all data without filtering for search term

  // Flattening the paginated data into a single list
  const allData = data?.pages?.reduce((acc, pageData) => [...acc, ...pageData.content], [] as any[]);

  // Client-side pagination
  const itemsPerPage = 10; // Define how many items per page
  const [currentPage, setCurrentPage] = useState(1);

  // Handle search and filter locally
  const filteredData = allData?.filter((client) =>
    client.clientName.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  // Paginate the filtered data
  const paginatedData = filteredData?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Handle selecting an item
  const handleSelect = (item: dataType) => {
    onSelect(item.id); //TODO
  };

  // Handle page change (client-side pagination)
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <S.Container>
      <AdvanceSelector
        data={
          paginatedData?.map((client) => ({
            title: client.clientName,
            subTitle: client.clientName ?? '',
            client,
          })) ?? []
        }
        value={searchTerm}
        onSelect={handleSelect}
        onChange={(value) => {
          setSearchTerm(value);
          setCurrentPage(1); // Reset to page 1 when search term changes
        }}
        loading={isFetching}
        isLastPage={filteredData?.length <= currentPage * itemsPerPage}
        loadMore={() => handlePageChange(currentPage + 1)}
        // placeholder={t('placeholder.choose_client')}
        disabled={disabled}
      />
    </S.Container>
  );
};

export default ClientAggregatorSelector;
