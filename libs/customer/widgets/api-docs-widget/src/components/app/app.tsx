import React from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { Loading } from '@oxygen/ui-kit';

import { useAppDispatch, useAppState } from '../../context';
//import { useGetReportDataQuery } from '../../services';
import { EnhancedRedoc } from '../enhanced-redoc/enhanced-redoc';
import { ApiSelector, type ApiOption } from '../api-selector/api-selector';
import { useApiSpecs } from '../../hooks/use-api-specs';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  const API_OPTIONS: ApiOption[] = [
    {
      label: 'Oxygen Services v1.0',
      value: 'OXYGEN_SERVICES',
    },
    {
      label: 'Oxygen Services v2.0',
      value: 'OXYGEN_SERVICES_V2',
    },
    {
      label: 'User Management API',
      value: 'USER_MANAGEMENT',
    },
    {
      label: 'External API v1',
      value: 'external-v1',
    },
  ];

  const { selectedOption, spec, loading, error, selectApiOption, refreshSpec } = useApiSpecs(API_OPTIONS[0]);

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
    <S.PageContainer>
      <ApiSelector
        options={API_OPTIONS}
        selectedOption={selectedOption}
        onSelectChange={selectApiOption}
        onRefresh={refreshSpec}
      />
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
