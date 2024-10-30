import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { i18nBase, useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { Button, Divider } from '@oxygen/ui-kit';
import { GlobalErrorContainer } from '@oxygen/reusable-components';

import { useGetsServiceHistoryDataQuery } from '../../services';
import { resetErrorMessageAction, useAppDispatch, useAppState } from '../../context';
import DataTable from '../data-table/data-table';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = () => {
  const { errorMessage, table } = useAppState();
  const dispatch = useAppDispatch();
  const { data: history } = useGetsServiceHistoryDataQuery(prepareParams());
  const items = history?.items;
  const [title, setTitle] = useState('');
  const [t] = useTr();
  const router = useRouter();

  function prepareParams() {
    const params = {
      pagination: table.pagination,
    };
    return params;
  }
  const handleReturn = () => {
    router.back();
  };

  useEffect(() => {
    if (items && items.length > 0 && title === '') {
      setTitle(items?.[0]?.[i18nBase.resolvedLanguage + 'Name']);
    }
  }, [items, title]);

  return (
    <>
      <GlobalErrorContainer
        containerProps={{ marginBottom: '2.4rem' }}
        errorMessage={errorMessage}
        onClose={() => {
          resetErrorMessageAction(dispatch);
        }}
      />
      <S.HistoryContainer title={title}>
        <S.TableContainer>
          <DataTable />
        </S.TableContainer>
        <Divider />
        <S.FooterContainer>
          <Button className='btn-return' onClick={handleReturn}>
            {t('button.return')}
          </Button>
        </S.FooterContainer>
      </S.HistoryContainer>
    </>
  );
};

export default App;
