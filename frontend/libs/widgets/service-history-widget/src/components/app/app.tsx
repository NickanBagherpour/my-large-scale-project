import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';

import { i18nBase, useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { Button, Divider } from '@oxygen/ui-kit';

import { useGetsServiceHistoryDataQuery } from '../../services';
import { resetErrorMessageAction, useAppDispatch, useAppState } from '../../context';
import DataTable from '../data-table/data-table';
import { GlobalErrorContainer } from '@oxygen/reusable-components';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = () => {
  const { errorMessage, table } = useAppState();
  const dispatch = useAppDispatch();
  const { data: history } = useGetsServiceHistoryDataQuery(prepareParams());
  const [t] = useTr();
  const router = useRouter();
  const serviceName = useMemo(() => history?.items?.[0]?.[i18nBase.resolvedLanguage + 'Name'], []);
  function prepareParams() {
    const params = {
      pagination: table.pagination,
    };
    return params;
  }
  const handleReturn = () => {
    router.back();
  };

  return (
    <>
      <GlobalErrorContainer
        containerProps={{ marginBottom: '2.4rem' }}
        errorMessage={errorMessage}
        onClose={() => {
          resetErrorMessageAction(dispatch);
        }}
      />
      <S.HistoryContainer title={serviceName}>
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
