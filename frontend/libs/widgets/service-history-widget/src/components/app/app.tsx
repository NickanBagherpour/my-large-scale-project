import React from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';

import { useAppDispatch, useAppState } from '../../context';
//import { useGetReportDataQuery } from '../../services';

import * as S from './app.style';
import { useGetsServiceHistoryDataQuery } from '../../services';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const { errorMessage, pagination, ...rest } = useAppState();
  const { data: history, isFetching: isClientsFetching } = useGetsServiceHistoryDataQuery(prepareParams());
  function prepareParams() {
    const params = {
      pagination: pagination,
    };
    return params;
  }
  const [t] = useTr();
  console.log('his', history);
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
      {history?.list?.map((item) => (
        <p>{item.faName}</p>
      ))}
    </S.AppContainer>
  );
};

export default App;
