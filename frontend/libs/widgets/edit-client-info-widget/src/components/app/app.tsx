import React from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';

import { useAppDispatch, useAppState } from '../../context';
//import { useGetReportDataQuery } from '../../services';
import FirstStep from '../first-step/first-step';
import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  // function prepareParams() {
  //   const { filters, submit, pagination, ...rest } = state;
  //   const params = {
  //     form: submit,
  //     pagination: pagination,
  //   };
  //
  //   return params;
  // }

  return (
    <S.AppContainer>
      <FirstStep />
      {/*<SecondStep />*/}
    </S.AppContainer>
  );
};

export default App;
