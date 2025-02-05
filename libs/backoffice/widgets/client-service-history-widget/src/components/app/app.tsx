import React from 'react';
import { useSearchParams } from 'next/navigation';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { Container } from '@oxygen/ui-kit';
import { GlobalMessageContainer, ReturnButton } from '@oxygen/reusable-components';

import { resetErrorMessageAction, useAppDispatch, useAppState } from '../../context';

import DataTable from '../data-list/data-list';
import { useGetsClientHistoryDataQuery } from '../../services/get-report.api';
import { getWidgetTitle } from '@oxygen/utils';

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

  const { data, isFetching } = useGetsClientHistoryDataQuery({
    page: page - 1,
    size: limit,
    serviceId,
  });

  return (
    <Container title={getWidgetTitle({ defaultTitle: t('change_history') })} footer={<ReturnButton />}>
      <GlobalMessageContainer
        containerProps={{ margin: '1.6rem 0' }}
        message={message}
        onClose={() => {
          resetErrorMessageAction(dispatch);
        }}
      />
      <DataTable data={data} loading={isFetching} />
    </Container>
  );
};

export default App;
