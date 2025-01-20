import React from 'react';
import { useSearchParams } from 'next/navigation';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { Container } from '@oxygen/ui-kit';
import { GlobalMessageContainer, ReturnButton } from '@oxygen/reusable-components';

import { resetMessageAction, useAppDispatch, useAppState } from '../../context';

import { useGetsServiceHistoryDataQuery } from '../../services';
import DataTable from '../data-table/data-table';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = () => {
  const {
    message,
    table: {
      pagination: { limit, page },
    },
  } = useAppState();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const [t] = useTr();

  const serviceId = searchParams.get('serviceId') || '';

  const { data, isFetching } = useGetsServiceHistoryDataQuery({
    page: page - 1,
    size: limit,
    serviceId,
  });

  return (
    <Container title={t('container_title')} footer={<ReturnButton />}>
      <GlobalMessageContainer
        containerProps={{ margin: '1.6rem 0' }}
        message={message}
        onClose={() => {
          resetMessageAction(dispatch);
        }}
      />
      <DataTable data={data} loading={isFetching} />
    </Container>
  );
};

export default App;
