import React from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { Loading } from '@oxygen/ui-kit';

import { useAppDispatch, useAppState } from '../../context';
import { EnhancedRedoc } from '../enhanced-redoc/enhanced-redoc';
import { ApiSelector, type ApiOption } from '../api-selector/api-selector';
import { useApiSpecs } from '../../hooks/use-api-specs';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const [t] = useTr();

  const API_OPTIONS: ApiOption[] = [
    {
      label: t('all'),
      value: 'ALL',
    },
    {
      label: t('auth'),
      value: 'AUTH',
    },
    {
      label: t('statement'),
      value: 'STATEMENT',
    },
    {
      label: t('transfer'),
      value: 'TRANSFER',
    },
    {
      label: t('loan_service'),
      value: 'LOAN_SERVICE',
    },
  ];

  const { selectedOption, spec, loading, error, selectApiOption, refreshSpec } = useApiSpecs(API_OPTIONS[0]);

  return (
    <S.PageContainer>
      {/* <ApiSelector
        options={API_OPTIONS}
        selectedOption={selectedOption}
        onSelectChange={selectApiOption}
        onRefresh={refreshSpec}
      /> */}
      <S.RedocContainer>
        {loading ? (
          <Loading containerProps={{ display: 'flex', alignItems: 'center', height: '100%' }} />
        ) : error ? (
          <S.ErrorMessage>{error}</S.ErrorMessage>
        ) : (
          <EnhancedRedoc specObject={spec} />
        )}
      </S.RedocContainer>
    </S.PageContainer>
  );
};

export default App;
