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

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  const router = useRouter();
  const searchParams = useSearchParams();

  const id: Nullable<string> = searchParams.get('id');

  if (!id) {
    redirect('/not-found');
  }

  const scopeName: Nullable<string> = searchParams.get('name');
  const title = scopeName ? `${t('widget_name')} ${t(scopeName)}` : t('widget_name');

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
    <S.AppContainer title={title}>
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
