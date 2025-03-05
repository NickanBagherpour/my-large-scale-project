import React, { useEffect, useMemo, useState } from 'react';
import { notFound, useSearchParams } from 'next/navigation';

import { resetMessageAction, useAppDispatch, useAppState } from '../../context';
import { useGetUpstreamHistory } from '../../services';
import DataTable from '../data-table/data-table';

import { GlobalMessageContainer, ReturnButton } from '@oxygen/reusable-components';
import { Nullable, PageProps } from '@oxygen/types';
import { getWidgetTitle } from '@oxygen/utils';
import { useTr } from '@oxygen/translation';
import { Container } from '@oxygen/ui-kit';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = () => {
  const {
    message,
    pagination: { page, limit },
  } = useAppState();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const [t] = useTr();

  const upstreamName: Nullable<string> = searchParams.get('upstream-name');
  if (!upstreamName) {
    notFound();
  }
  const [upstreamPrimaryName, setUpstreamPrimaryName] = useState<string | null>(null);

  const { data } = useGetUpstreamHistory({
    page: page - 1,
    size: limit,
    upstreamName,
  });

  const { name, description } = data?.content[0]?.upstream ?? {};
  const upstreamPersianName = description?.value;
  const upstreamEnglishName = name?.value;

  useEffect(() => {
    if (upstreamPersianName && !upstreamPrimaryName) {
      setUpstreamPrimaryName(upstreamPersianName);
    }
  }, [upstreamPersianName, upstreamPrimaryName]);

  const widgetTitle = useMemo(() => {
    return getWidgetTitle({
      defaultTitle: t('change_history'),
      primaryTitle: upstreamPrimaryName,
      secondaryTitle: upstreamEnglishName,
    });
  }, [t, upstreamPrimaryName, upstreamEnglishName]);

  return (
    <Container title={widgetTitle} footer={<ReturnButton />}>
      <GlobalMessageContainer
        containerProps={{ margin: '1.6rem 0' }}
        message={message}
        onClose={() => {
          resetMessageAction(dispatch);
        }}
      />
      <S.TableContainer>
        <DataTable />
      </S.TableContainer>
    </Container>
  );
};

export default App;
