import React, { useEffect, useMemo, useState } from 'react';
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
  const clientEnglishName = data?.commonClientInfoDto?.name;
  const clientPersianName = data?.content[0]?.clientInfoDto?.value?.persianName?.value;

  useEffect(() => {
    updateClientNameAction(dispatch, clientEnglishName);
  }, [clientEnglishName]);

  useEffect(() => {
    if (clientPersianName && !clientPrimaryName) {
      setClientPrimaryName(clientPersianName);
    }
  }, [clientPersianName, clientPrimaryName]);

  const footerButton = (
    <ReturnButton size={'large'} variant={'outlined'} onClick={handleReturn}>
      {t('button.return')}
    </ReturnButton>
  );

  // Memoized title computation
  const widgetTitle = useMemo(() => {
    return getWidgetTitle({
      defaultTitle: t('change_history'),
      primaryTitle: clientPrimaryName,
      secondaryTitle: clientEnglishName,
    });
  }, [t, clientPrimaryName, clientEnglishName]);

  // Update header title only when Persian name is first set
  useEffect(() => {
    if (clientPrimaryName) {
      updateHeaderTitle(widgetTitle);
    }
  }, [clientPrimaryName, widgetTitle, updateHeaderTitle]);

  if (!clientName) {
    notFound();
  }

  return (
    <S.AppContainer title={widgetTitle} footer={footerButton}>
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
