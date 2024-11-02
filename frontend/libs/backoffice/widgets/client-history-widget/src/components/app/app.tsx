import React from 'react';

import { useRouter } from 'next/navigation';
import { useTr } from '@oxygen/translation';

import { Button } from '@oxygen/ui-kit';
import { GlobalErrorContainer } from '@oxygen/reusable-components';

import { PageProps } from '@oxygen/types';

import { resetErrorMessageAction, useAppDispatch, useAppState } from '../../context';
import DataList from '../data-list/data-list';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  const router = useRouter();

  const handleReturn = () => {
    router.back();
  };

  return (
    <S.AppContainer fillContainer={true} title={t('widget_name')}>
      <GlobalErrorContainer
        containerProps={{ marginBottom: '2.4rem' }}
        errorMessage={state.errorMessage}
        onClose={() => {
          resetErrorMessageAction(dispatch);
        }}
      />
      <DataList />
      <S.FooterContainer>
        <Button
          className={'return-button'}
          variant={'outlined'}
          color={'primary'}
          size={'large'}
          onClick={handleReturn}
        >
          {t('button.return')}
        </Button>
      </S.FooterContainer>
    </S.AppContainer>
  );
};

export default App;
