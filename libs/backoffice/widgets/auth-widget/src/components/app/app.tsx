'use client';

import React, { useEffect, useState } from 'react';
import { PageProps } from '@oxygen/types';
import { Button, Loading } from '@oxygen/ui-kit';
import { getSsoUrlAction } from '../../server-actions/get-sso-url.action';
import { handleSSO } from '../../server-actions/handle-sso.action';

import * as S from './app.style';
import { useAuth } from '@oxygen/hooks';
import { ENV_CONSTANTS, ROUTES } from '@oxygen/utils';
import { useTranslation } from 'react-i18next';

type AuthWidgetType = PageProps & {
  parentProps?: any;
};
const AuthWidget: React.FC<AuthWidgetType> = (props) => {
  const [loading, setLoading] = useState(true);
  const { user, login } = useAuth();
  const [t] = useTranslation();

  const [code, setCode] = useState<string | null>(props?.parentProps.searchParams['code'] ?? null);
  const ticket = props?.parentProps.searchParams['ticket'];

  async function handleRedirect() {
    setLoading(true);

    try {
      const url = new URL(window.location.href);
      url.search = ''; // Remove all query parameters
      window.history.replaceState({}, document.title, url.toString());
      setCode(null);
      if (code) {
        await handleSSO(code, ticket);
      }
      // Clear query parameters from the URL
      login({}, ROUTES.BACKOFFICE.CLIENT_LIST);
    } catch (error) {
      console.error('Failed to handle SSO:', error);
    }

    setLoading(false);
  }

  useEffect(() => {
    if (code) {
      handleRedirect();
    } else {
      setLoading(false);
    }
  }, [code]);

  const handleLogin = async () => {
    setLoading(true);

    /*  if (ENV_CONSTANTS.IS_DEV) {
      setCode('develop');
      return;
    }*/

    try {
      const ssoUrl = await getSsoUrlAction(); // Call the server action to get the SSO URL
      window.location.href = ssoUrl; // Redirect to the SSO URL
    } catch (error) {
      console.error('Failed to fetch SSO URL:', error);
      setLoading(false);
    }
  };

  return (
    <S.CardWrapper>
      {loading && <Loading fullscreen={true} />}
      <S.TopSection>{t('title')}</S.TopSection>
      <S.BottomSection>
        <Button onClick={handleLogin}>{t('button.landing_login')}</Button>
      </S.BottomSection>
    </S.CardWrapper>
  );
};

export default AuthWidget;
