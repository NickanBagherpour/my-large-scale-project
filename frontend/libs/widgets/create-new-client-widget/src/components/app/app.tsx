import React from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';

import { useAppDispatch, useAppState } from '../../context';
//import { useGetReportDataQuery } from '../../services';
import * as S from './app.style';
import { Container } from '@oxygen/ui-kit';
import FirstStep from '../first-step/first-step';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  // const { data, isFetching, isError } = useGetReportDataQuery('asdfas');
  //
  // console.log(data);

  // function prepareParams() {
  //   const { filters, submit, pagination, ...rest } = state;
  //   const params = {
  //     form: submit,
  //     pagination: pagination,
  //   };
  //
  //   return params;
  // }

  const arrayList = [{ title: 'First_Step' }, { title: 'Second_Step' }, { title: 'Third_Step' }];

  return (
    <S.AppContainer>
      <Container title={t('widget_name')}>
        {/*<Steps items={arrayList} />*/}
        <FirstStep />
      </Container>
    </S.AppContainer>
  );
};

export default App;
