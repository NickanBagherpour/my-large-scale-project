import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { GlobalMessageContainer, NoResult } from '@oxygen/reusable-components';
import { Button } from '@oxygen/ui-kit';

import { resetErrorMessageAction, useAppDispatch, useAppState } from '../../context';
import DataList from '../data-list/data-list';
import { ScopeId } from '../../types';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  const searchParams = useSearchParams();
  const scopeId: ScopeId = searchParams.get('id');

  const router = useRouter();
  const handleReturn = () => {
    router.back();
  };
  const footerButton = (
    <Button className={'return-button'} size={'large'} variant={'outlined'} onClick={handleReturn}>
      {t('button.return')}
    </Button>
  );
  return (
    <S.AppContainer title={t('widget_name')} footer={footerButton}>
      <GlobalMessageContainer
        message={state.message}
        onClose={() => {
          resetErrorMessageAction(dispatch);
        }}
      />
      <S.StyledBox>{scopeId ? <DataList /> : <NoResult isLoading={false} />}</S.StyledBox>
    </S.AppContainer>
  );
};

export default App;
