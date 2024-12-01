import React from 'react';
import { PageProps } from '@oxygen/types';
import * as S from './app.style';
import { Button } from '@oxygen/ui-kit';

const SSO_URL =
  'http://185.135.30.10:9443/identity/oauth2/auth/authorize?response_type=code&client_id=oxygen-portal-sd-client&scope=batch-user-info&state=xyz-_123&sso=1&redirect_uri=http%3A%2F%2F192.168.52.138%3A3000%2Fauth';

const App: React.FC<PageProps> = (_) => {
  return (
    <S.AppContainer title={'AuthWidget'}>
      <Button href={SSO_URL}>Login</Button>
    </S.AppContainer>
  );
};

export default App;
