import React from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';

import { FooterButtonContainer, GlobalErrorContainer, NoResult } from '@oxygen/reusable-components';

import { resetErrorMessageAction, useAppDispatch, useAppState } from '../../context';
import { useGetReportDataQuery } from '../../services';
import DataList from '../data-list/data-list';

import * as S from './app.style';
import { Button } from '@oxygen/ui-kit';
import { useRouter } from 'next/navigation';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();
  // console.log('app state', state);

  const router = useRouter();

  const {
    table: { pagination },
  } = state;

  // console.log('pagination', pagination);
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
  const handleReturn = () => {
    router.back();
  };

  const { data, isFetching, isError } = useGetReportDataQuery(prepareParams());

  function prepareParams() {
    const params = {
      pagination: pagination,
    };

    return params;
  }

  return (
    <S.AppContainer fillContainer={true} subtitle={'Todo subtitle '}>
      {/*//related to selected client*/}
      <GlobalErrorContainer
        containerProps={{ marginBottom: '2.4rem' }}
        errorMessage={state.errorMessage}
        onClose={() => {
          resetErrorMessageAction(dispatch);
        }}
      />
      {data?.content ? <DataList data={data} isFetching={isFetching} /> : <NoResult isLoading={isFetching} />}
      <FooterButtonContainer>
        <Button
          className={'return-button'}
          variant={'outlined'}
          color={'primary'}
          size={'large'}
          onClick={handleReturn}
        >
          {t('button.return')}
        </Button>
      </FooterButtonContainer>
    </S.AppContainer>
  );
};

export default App;
