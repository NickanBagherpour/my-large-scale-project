import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useTr } from '@oxygen/translation';
import { Button } from '@oxygen/ui-kit';
import { PageProps } from '@oxygen/types';
import { GlobalMessageContainer, NoResult } from '@oxygen/reusable-components';

import { resetErrorMessageAction, updateClientIdAction, useAppDispatch, useAppState } from '../../context';
import DataList from '../data-list/data-list';
import { ClientId } from '../../types';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  const searchParams = useSearchParams();
  const clientId: ClientId = searchParams.get('clientId');

  useEffect(() => {
    updateClientIdAction(dispatch, clientId);
  }, [clientId]);

  const router = useRouter();
  const handleReturn = () => {
    router.back();
  };
  const footerButton = (
    <Button size={'large'} variant={'outlined'} onClick={handleReturn}>
      {t('button.return')}
    </Button>
  );
  return (
    <S.AppContainer title={t('widget_name')} footer={footerButton}>
      {/*render widget name based on clientId*/}
      <GlobalMessageContainer
        message={state.message}
        onClose={() => {
          resetErrorMessageAction(dispatch);
        }}
      />
      <S.StyledBox>{clientId ? <DataList /> : <NoResult isLoading={false} />}</S.StyledBox>
    </S.AppContainer>
  );
};

export default App;
