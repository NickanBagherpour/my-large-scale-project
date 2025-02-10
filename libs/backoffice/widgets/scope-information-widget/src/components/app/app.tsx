import React from 'react';
import { redirect, useRouter, useSearchParams } from 'next/navigation';

import { useTr } from '@oxygen/translation';
import { Nullable, PageProps } from '@oxygen/types';
import { Button, Tabs, TabsProps } from '@oxygen/ui-kit';
import { GlobalMessageContainer } from '@oxygen/reusable-components';

import FirstTab from '../first-tab/first-tab';
import SecondTab from '../second-tab/second-tab';
import { resetErrorMessageAction, useAppDispatch, useAppState } from '../../context';

import * as S from './app.style';
import { getWidgetTitle } from '@oxygen/utils';
import { useGetFirstTabReportDataQuery } from '../../services';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  const router = useRouter();
  const searchParams = useSearchParams();

  const scopeName: Nullable<string> = searchParams.get('name');
  const id: Nullable<string> = searchParams.get('id');

  if (!id) {
    redirect('/not-found');
  }

  const { data, isFetching } = useGetFirstTabReportDataQuery({ id });

  const latinName = data?.name;
  const farsiName = data?.description;

  const handleReturn = () => {
    router.back();
  };

  const items: TabsProps['items'] = [
    {
      key: 'scop-info',
      label: t('first_tab.name'),
      children: <FirstTab id={id} />,
    },
    {
      key: 'services',
      label: t('second_tab.name'),
      children: <SecondTab id={id} />,
    },
  ];

  return (
    <S.AppContainer
      title={getWidgetTitle({
        defaultTitle: t('widget_name'),
        primaryTitle: farsiName,
        secondaryTitle: latinName,
      })}
    >
      <GlobalMessageContainer
        message={state.message}
        onClose={() => {
          resetErrorMessageAction(dispatch);
        }}
      />
      <S.Content>
        <Tabs defaultActiveKey='scop-info' items={items}></Tabs>
      </S.Content>
      <S.Footer>
        <Button variant={'outlined'} onClick={handleReturn}>
          {t('button.return')}
        </Button>
      </S.Footer>
    </S.AppContainer>
  );
};

export default App;
