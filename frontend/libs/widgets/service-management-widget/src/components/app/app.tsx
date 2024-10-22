import React from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';

import { useAppDispatch, useAppState } from '../../context';
//import { useGetReportDataQuery } from '../../services';

import * as S from './app.style';
import { Container } from 'libs/ui-kit/src/container/container';
import { Box } from '@oxygen/ui-kit';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  /* Sample Query Usage
  const { data, isFetching, isError } = useGetReportDataQuery(prepareParams());

  function prepareParams() {
     const { filters,submit,pagination,...rest } = state;
     const params = {
       form: submit,
       pagination: pagination,
     };

     return params;
   }
 */

  return (
    <S.AppContainer>
      <Container title={t('field.customer')} subtitle={'(245)'}>
        <Box height={'10rem'} width={'100%'} backgroundColor='red'></Box>
      </Container>

      <Container title={t('field.product')}>
        <Box height={'15rem'} width={'100%'} backgroundColor='blue'></Box>
        <Box height={'15rem'} width={'100%'} backgroundColor='green'></Box>
        <Box height={'15rem'} width={'100%'} backgroundColor='black'></Box>
      </Container>
      <Container title={t('field.product')}>
        <Box height={'15rem'} width={'100%'} backgroundColor='blue'></Box>
        <Box height={'15rem'} width={'100%'} backgroundColor='green'></Box>
        <Box height={'15rem'} width={'100%'} backgroundColor='black'></Box>
      </Container>

      <Container>
        <Box backgroundColor='green'></Box>
      </Container>
    </S.AppContainer>
  );
};

export default App;
