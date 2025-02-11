import React from 'react';
import { notFound, useSearchParams } from 'next/navigation';

import { useGetUpstreamHistory } from '../../services';
import { resetMessageAction, useAppDispatch, useAppState } from '../../context';
import DataTable from '../data-table/data-table';

import { useTr } from '@oxygen/translation';
import { Nullable, PageProps } from '@oxygen/types';
import { Container } from '@oxygen/ui-kit';
import { GlobalMessageContainer, ReturnButton } from '@oxygen/reusable-components';

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

  const { data } = useGetUpstreamHistory({
    page: page - 1,
    size: limit,
    upstreamName,
  });

  const title = data?.content[0]?.upstream?.description?.value ?? t('subtitle');

  return (
    <Container title={title} footer={<ReturnButton />}>
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
