'use client';

import React, { useEffect, useState } from 'react';

import { CookieKey, PageProps } from '@oxygen/types';
import { Box, Button, Loading, Typography } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { useAuth } from '@oxygen/hooks';
import { decodeToken, decrypt, ENV_CONSTANTS, getCookie, getRole, ROUTES } from '@oxygen/utils';

import { getSsoUrlAction } from '../../server-actions/get-sso-url.action';
import { handleSSO } from '../../server-actions/handle-sso.action';

import * as S from './app.style';

type AuthWidgetType = PageProps & {
  parentProps?: any;
};

type AuthState = 'ready' | 'processing' | 'error';

const AuthWidget: React.FC<AuthWidgetType> = (props) => {
  const [t] = useTr();
  const [authState, setAuthState] = useState<AuthState>('processing');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { login } = useAuth();

  const code = props?.parentProps?.searchParams['code'] ?? null;
  const ticket = props?.parentProps?.searchParams['ticket'];

  useEffect(() => {
    if (code) {
      handleSSORedirect();
    } else {
      setAuthState('ready');
    }
  }, [code]);

  async function handleSSORedirect() {
    setAuthState('processing');

    try {
      const url = new URL(window.location.href);
      url.search = ''; // Remove all query parameters
      window.history.replaceState({}, document.title, url.toString());

      await handleSSO(code, ticket);
      const role = getRole(decodeToken(decrypt(getCookie(CookieKey.SESSION_ID))));
      login({ role }, ROUTES.BACKOFFICE.DASHBOARD);
    } catch (error) {
      console.error('Failed to handle SSO:', error);
      setErrorMessage(t('auth_error'));
      setAuthState('error');
    }
  }

  const handleLogin = async () => {
    setAuthState('processing');

    if (ENV_CONSTANTS.IS_DEMO /*ENV_CONSTANTS.IS_DEV && !ENV_CONSTANTS.DEV_WITH_SSO*/) {
      await handleSSO('develop', 'ticket');
      return;
    }

    try {
      const ssoUrl = await getSsoUrlAction(); // Call the server action to get the SSO URL
      window.location.href = ssoUrl; // Redirect to the SSO URL
    } catch (error) {
      console.error('Failed to fetch SSO URL:', error);
      setAuthState('error');
    }
  };

  function getLoginButton() {
    return <Button onClick={handleLogin}>{t('button.landing_login')}</Button>;
  }

  return (
    <S.CardWrapper>
      <S.TopSection>{t('title')}</S.TopSection>

      <S.BottomSection>
        {authState === 'ready' && getLoginButton()}

        {authState === 'processing' && <Loading />}

        {authState === 'error' && (
          <>
            <Box marginBottom={'1.6rem'}>
              <Typography.Title type={'danger'} level={5}>
                {errorMessage}
              </Typography.Title>
            </Box>
            {getLoginButton()}
          </>
        )}
      </S.BottomSection>
    </S.CardWrapper>
  );
};

export default AuthWidget;
