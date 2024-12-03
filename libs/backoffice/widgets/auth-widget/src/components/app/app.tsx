'use client';

import React, { useEffect, useState } from 'react';
import { PageProps } from '@oxygen/types';
import { Button, Loading } from '@oxygen/ui-kit';
import { getSsoUrlAction } from '../../server-actions/get-sso-url.action';
import { handleSSO } from '../../server-actions/handle-sso.action';

import * as S from './app.style';
import { useAuth } from '@oxygen/hooks';
import { ROUTES } from '@oxygen/utils';

const AuthWidget: React.FC<PageProps> = (props: any) => {
  const [loading, setLoading] = useState(false);
  const { user, login } = useAuth();

  const [code, setCode] = useState<string | null>(props?.parentProps.searchParams['code'] ?? null);
  const ticket = props?.parentProps.searchParams['ticket'];

  async function handleRedirect() {
    setLoading(true);

    try {
      const url = new URL(window.location.href);
      url.search = ''; // Remove all query parameters
      window.history.replaceState({}, document.title, url.toString());
      setCode(null);

      await handleSSO(code, ticket);
      // Clear query parameters from the URL
      login({}, ROUTES.BACKOFFICE.CLIENT_LIST);
    } catch (error) {
      console.error('Failed to handle SSO:', error);
    }

    setLoading(false);
  }

  // handleSignOut();

  useEffect(() => {
    if (code) {
      handleRedirect();
    }
  }, [code]);

  const handleLogin = async () => {
    setLoading(true);

    try {
      const ssoUrl = await getSsoUrlAction(); // Call the server action to get the SSO URL
      window.location.href = ssoUrl; // Redirect to the SSO URL
    } catch (error) {
      console.error('Failed to fetch SSO URL:', error);
      setLoading(false);
    }
  };

  return (
    <S.AppContainer title={'AuthWidget'}>
      {loading ? <Loading fullscreen={true} /> : <Button onClick={handleLogin}>Login</Button>}
    </S.AppContainer>
  );
};

export default AuthWidget;
