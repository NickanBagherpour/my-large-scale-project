import React, { useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { Box, Button } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { Nullable, PageProps } from '@oxygen/types';
import { GlobalErrorContainer } from '@oxygen/reusable-components';

import { resetErrorMessageAction, updateClientIdAction, useAppDispatch, useAppState } from '../../context';
import DataList from '../data-list/data-list';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  const searchParams = useSearchParams();
  const clientId: Nullable<string> = searchParams.get('clientId');

  useEffect(() => {
    // console.log('clientId: ', clientId);
    updateClientIdAction(dispatch, clientId);
  }, [clientId]);

  const router = useRouter();
  const handleReturn = () => {
    router.back();
  };

  return (
    <S.AppContainer fillContainer={true} title={t('widget_name')}>
      {/*render widget name based on clientId*/}
      <GlobalErrorContainer
        containerProps={{ marginBottom: '2.4rem' }}
        errorMessage={state.errorMessage}
        onClose={() => {
          resetErrorMessageAction(dispatch);
        }}
      />
      <Box className={'table-container'}>
        {/*{clientId ? <DataList /> : <NoResult isLoading={false} />}*/}
        <DataList />
      </Box>
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
