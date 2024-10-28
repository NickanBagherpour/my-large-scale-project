import React from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';

import { useAppDispatch, useAppState } from '../../context';
//import { useGetReportDataQuery } from '../../services';

import FirstStep from '../first-step/first-step';
import SecondStep from '../second-step/second-step';
import ThirdStep from '../third-step/third-step';
import FourthStep from '../fourth-step/fourth-step';

import * as S from './app.style';

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
  const stepsItem = [
    { title: t('progress_bar.first_step'), Content: <FirstStep /> },
    { title: t('progress_bar.second_step'), Content: <SecondStep /> },
    { title: t('progress_bar.third_step'), Content: <ThirdStep /> },
    { title: t('progress_bar.fourth_step'), Content: <FourthStep /> },
  ];

  return (
    <S.AppContainer title={t('create_new_client')}>
      <S.Steps items={stepsItem} current={1} />
      {stepsItem[2].Content}
    </S.AppContainer>
  );
};

export default App;
