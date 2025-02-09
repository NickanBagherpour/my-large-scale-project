import React, { useEffect, useMemo, useState } from 'react';
import { notFound, useRouter, useSearchParams } from 'next/navigation';

import { useTr } from '@oxygen/translation';
import { PageProps, PaginatedData } from '@oxygen/types';
import { useChangeHistoryQuery } from '@oxygen/hooks';
import { getWidgetTitle, RQKEYS } from '@oxygen/utils';
import { GlobalMessageContainer, NoResult, ReturnButton } from '@oxygen/reusable-components';

import {
  ClientHistoryResponseType,
  ClientName,
  NormalizedClientHistoryItemType,
  NormalizedClientHistoryResponse,
} from '../../types';
import { resetErrorMessageAction, useAppDispatch, useAppState } from '../../context';
import DataList from '../data-list/data-list';

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

  const normalizer = (
    data: PaginatedData<any> //ClientHistoryResponseType,
  ): NormalizedClientHistoryResponse => {
    const fullResponse = data as unknown as ClientHistoryResponseType;
    const {
      commonClientInfoDto,
      clientInfoHistoryItemDtos: { content, ...rest },
    } = fullResponse;
    const resultContent: NormalizedClientHistoryItemType[] = content.map((item: any) => {
      const { revisionDto, clientInfoDto } = item;
      const normalizedRevision = Object.fromEntries(Object.entries(revisionDto).map(([key, value]) => [key, value]));
      const normalizedClientDto = Object.fromEntries(
        Object.entries(clientInfoDto).map(([key, value]) => [
          key,
          value && typeof value === 'object' && 'title' in value ? value.title : value,
        ])
      );

      return { ...normalizedRevision, ...normalizedClientDto } as NormalizedClientHistoryItemType;
    });

    return {
      content: resultContent,
      commonClientInfoDto: commonClientInfoDto,
      ...rest,
    } as NormalizedClientHistoryResponse;
  };

  const {
    CLIENT,
    CLIENT_HISTORY: { GET_LIST },
  } = RQKEYS.BACKOFFICE;

  function prepareParams() {
    const params = {
      queryKey: [CLIENT, GET_LIST],
      url: `/v1/clients/history/${clientName}`,
      dispatch,
      // nestedKeyAccessor: 'clientInfoHistoryItemDtos',
      params: {
        page: pagination.page - 1,
        size: pagination.limit,
      },
      normalizer,
    };
    return params;
  }

  const { data: historyData, isFetching } = useChangeHistoryQuery<any>(prepareParams());
  const clientEnglishName = historyData?.commonClientInfoDto?.name;
  const clientPersianName = historyData?.commonClientInfoDto?.lastPersianName;

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
        {clientName ? <DataList data={historyData} isFetching={isFetching} /> : <NoResult isLoading={isFetching} />}
      </S.TableContainer>
    </S.AppContainer>
  );
};

export default App;
