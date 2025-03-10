'use client';

import styled from 'styled-components';

import { Loading } from '@oxygen/ui-kit';

import { EnhancedRedoc } from './components/enhanced-redoc';
import { ApiSelector, type ApiOption } from './components/api-selector';
import { useApiSpecs } from './hooks/use-api-specs';

// Define available API versions
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

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
`;

const RedocContainer = styled.div`
    flex: 1;
    overflow: auto;
`;

const ErrorMessage = styled.div`
    padding: 2rem;
    color: #e53935;
    text-align: center;
    font-weight: 500;
`;

export default function ApiDocs() {
  const { selectedOption, spec, loading, error, selectApiOption, refreshSpec } = useApiSpecs(API_OPTIONS[0]);

  return (
    <PageContainer>
      <ApiSelector
        options={API_OPTIONS}
        selectedOption={selectedOption}
        onSelectChange={selectApiOption}
        onRefresh={refreshSpec}
      />
      <RedocContainer>
        {loading ? (
          <Loading containerProps={{ display: 'flex', alignItems: 'center', height: '100%' }} />
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          <EnhancedRedoc specObject={spec} />
        )}
      </RedocContainer>
    </PageContainer>
  );
}

