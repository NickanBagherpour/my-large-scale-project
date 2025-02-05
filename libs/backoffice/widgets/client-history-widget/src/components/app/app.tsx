import React, { useEffect, useState } from 'react';
import { notFound, useRouter, useSearchParams } from 'next/navigation';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { getWidgetTitle } from '@oxygen/utils';
import { GlobalMessageContainer, NoResult, ReturnButton } from '@oxygen/reusable-components';

import { resetErrorMessageAction, updateClientNameAction, useAppDispatch, useAppState } from '../../context';
import DataList from '../data-list/data-list';
import { useGetClientHistoryQuery } from '../../services';
import { ClientName } from '../../types';

import * as S from './app.style';
import { TableContainer } from './app.style';

type AppProps = PageProps & {
  updateHeaderTitle: (newTitles: string[] | string) => void;
};

const App: React.FC<AppProps> = (props) => {
  const { updateHeaderTitle } = props;

  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  const {
    table: { pagination },
  } = state;

  const searchParams = useSearchParams();
  const clientName: ClientName = searchParams.get('clientName');

  const [clientPrimaryName, setClientPrimaryName] = useState<string | null>(null);

  const router = useRouter();
  const handleReturn = () => {
    router.back();
  };

  const { data, isFetching } = useGetClientHistoryQuery(prepareParams());

  function prepareParams() {
    const params = {
      clientName: clientName,
      page: pagination.page - 1,
      size: pagination.limit,
    };
    return params;
  }

  const clientEnglishName = data?.content[0]?.clientInfoDto?.value?.commonClientInfoDto?.value?.name?.value;

  useEffect(() => {
    updateClientNameAction(dispatch, clientEnglishName);
  }, [clientEnglishName]);

  useEffect(() => {
    const fetchedClientName = data?.content[0]?.clientInfoDto?.value?.commonClientInfoDto?.value?.persianName?.value;

    if (fetchedClientName && !clientPrimaryName) {
      setClientPrimaryName(fetchedClientName);

      const title = getWidgetTitle({
        defaultTitle: t('change_history'),
        primaryTitle: fetchedClientName,
      });

      updateHeaderTitle(title);
    }
  }, [data, clientName, updateHeaderTitle]);

  const footerButton = (
    <ReturnButton size={'large'} variant={'outlined'} onClick={handleReturn}>
      {t('button.return')}
    </ReturnButton>
  );

  const title = getWidgetTitle({
    defaultTitle: t('change_history'),
    primaryTitle: clientPrimaryName,
  });

  if (!clientName) {
    notFound();
  }

  return (
    <S.AppContainer title={title} footer={footerButton}>
      <GlobalMessageContainer
        message={state.message}
        onClose={() => {
          resetErrorMessageAction(dispatch);
        }}
      />
      <S.TableContainer>
        {clientName ? <DataList data={data} isFetching={isFetching} /> : <NoResult isLoading={isFetching} />}
      </S.TableContainer>
    </S.AppContainer>
  );
};

export default App;
