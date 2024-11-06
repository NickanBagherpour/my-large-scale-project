import React from 'react';
import { useRouter } from 'next/navigation';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { Box, Button, Tabs, TabsProps } from '@oxygen/ui-kit';

import { useAppDispatch, useAppState } from '../../context';
//import { useGetReportDataQuery } from '../../services';

import * as S from './app.style';
import FirstTab from '../first-tab/first-tab';
import SecondTab from '../second-tab/second-tab';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  const router = useRouter();
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

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: t('first_tab'),
      children: <FirstTab />,
    },
    {
      key: '2',
      label: t('second_tab'),
      children: <SecondTab />,
    },
  ];

  return (
    <S.AppContainer title={t('widget_name')}>
      <S.Content>
        <Tabs defaultActiveKey='1' items={items}></Tabs>
      </S.Content>
      <S.Footer>
        <Button variant={'solid'} onClick={handleReturn}>
          {t('button.return')}
        </Button>
      </S.Footer>
    </S.AppContainer>
  );
};

export default App;
