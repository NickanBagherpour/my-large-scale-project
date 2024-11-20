import React, { useEffect, useState } from 'react';
import { redirect, useSearchParams } from 'next/navigation';

import { i18nBase, useTr } from '@oxygen/translation';
import { Nullable, PageProps } from '@oxygen/types';
import { Container } from '@oxygen/ui-kit';
import { GlobalMessageContainer, ReturnButton, SecondaryTitle } from '@oxygen/reusable-components';

import { useGetsServiceHistoryDataQuery } from '../../services';
import { resetMessageAction, useAppDispatch, useAppState } from '../../context';
import DataTable from '../data-table/data-table';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = () => {
  const { message, table } = useAppState();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const [t] = useTr();
  const [title, setTitle] = useState(t('subtitle'));

  const id: Nullable<string> = searchParams.get('id');
  if (!id) {
    redirect('/not-found');
  }
  const { data: history } = useGetsServiceHistoryDataQuery(prepareParams());
  const items = history?.items;

  function prepareParams() {
    const params = {
      pagination: table.pagination,
      id: id!,
    };
    return params;
  }

  useEffect(() => {
    if (items && items.length > 0 && title === t('subtitle')) {
      setTitle(items?.[0]?.[i18nBase.resolvedLanguage + 'Name']);
    }
  }, [items, title]);

  return (
    <Container title={title} footer={<ReturnButton />}>
      <GlobalMessageContainer
        containerProps={{ margin: '1.6rem 0' }}
        message={message}
        onClose={() => {
          resetMessageAction(dispatch);
        }}
      />
      {/* <SecondaryTitle text={t('subtitle')} /> */}
      <S.TableContainer>
        <DataTable />
      </S.TableContainer>
    </Container>
  );
};

export default App;
