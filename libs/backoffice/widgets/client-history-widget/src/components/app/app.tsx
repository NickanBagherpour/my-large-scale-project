import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useTr } from '@oxygen/translation';
import { Box, Button } from '@oxygen/ui-kit';
import { Nullable, PageProps } from '@oxygen/types';
import { GlobalMessageContainer, NoResult } from '@oxygen/reusable-components';

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
  const footerButton = (
    <Button className={'return-button'} color={'primary'} size={'large'} variant={'solid'} onClick={handleReturn}>
      {t('button.return')}
    </Button>
  );
  return (
    <S.AppContainer fillContainer={true} title={t('widget_name')} footer={footerButton}>
      {/*render widget name based on clientId*/}
      <GlobalMessageContainer
        message={state.message}
        onClose={() => {
          resetErrorMessageAction(dispatch);
        }}
      />
      <Box className={'table-container'}>
        {clientId ? <DataList /> : <NoResult isLoading={false} />}
        {/*<DataList />*/}
      </Box>
    </S.AppContainer>
  );
};

export default App;
