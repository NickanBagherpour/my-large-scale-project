'use client';

import React, { useEffect, useState } from 'react';
import { CookieKey, PageProps } from '@oxygen/types';
import { Button, Loading } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { useAuth } from '@oxygen/hooks';
import { decodeJWT, decrypt, ENV_CONSTANTS, getCookie, getRole, ROUTES } from '@oxygen/utils';

import { getSsoUrlAction } from '../../server-actions/get-sso-url.action';
import { handleSSO } from '../../server-actions/handle-sso.action';

import * as S from './app.style';

type AuthWidgetType = PageProps & {
  parentProps?: any;
};

const AuthWidget: React.FC<AuthWidgetType> = (props) => {
  const [loading, setLoading] = useState(true);
  const { user, login } = useAuth();
  const [t] = useTr();

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
        const role = getRole(decodeJWT(decrypt(getCookie(CookieKey.SESSION_ID)))?.payload);
        // console.log('SSO success', );
        login({role}, ROUTES.BUSINESS.REQUEST_LIST);
      }
      // Clear query parameters from the URL
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

    if (ENV_CONSTANTS.IS_DEMO /*ENV_CONSTANTS.IS_DEV && !ENV_CONSTANTS.DEV_WITH_SSO*/) {
      setCode('develop');
      return;
    }

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
