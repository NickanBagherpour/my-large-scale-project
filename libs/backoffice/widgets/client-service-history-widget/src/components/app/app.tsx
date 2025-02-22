import React from 'react';
import { useSearchParams } from 'next/navigation';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { Container } from '@oxygen/ui-kit';
import { GlobalMessageContainer, ReturnButton } from '@oxygen/reusable-components';
import { getWidgetTitle } from '@oxygen/utils';

import { resetErrorMessageAction, useAppDispatch, useAppState } from '../../context';

import DataTable from '../data-list/data-list';
import { useGetsClientHistoryDataQuery } from '../../services/get-client-history.api';
import { CLIENT_NAME } from '../../utils/consts';

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

  const clientName = searchParams.get(CLIENT_NAME) || '';

  const { data, isFetching } = useGetsClientHistoryDataQuery({
    page: page - 1,
    size: limit,
    clientName,
  });

  const persianName = data?.content[0]?.clientServiceDto?.clientPersianName?.value;

  return (
    <Container
      title={getWidgetTitle({
        primaryTitle: persianName,
        secondaryTitle: data?.commonClientInfoDto?.name,
        defaultTitle: t('change_history'),
      })}
      footer={<ReturnButton />}
    >
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
