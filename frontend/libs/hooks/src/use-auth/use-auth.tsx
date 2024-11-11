'use client';

import { useRouter } from 'next/navigation';

import React, { createContext, useContext, useMemo } from 'react';

import { LocalStorageKey } from '@oxygen/types';
import { clearAllCookies, clearLocalStorageExceptForKey } from '@oxygen/utils';
import { client } from '@oxygen/client';

import useLocalStorage from '../use-local-storage/use-local-storage';

const AuthContext = createContext<any>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

type AuthProviderProps = {
  children: React.ReactNode;
  /*  login?: Function;
    logout?: Function;*/
};

const AuthProvider = (props: AuthProviderProps) => {
  const [user, setUser, removeUser] = useLocalStorage<any>(LocalStorageKey.USER, null);
  const [userPhoto, setUserPhoto, removeUserPhoto] = useLocalStorage(LocalStorageKey.USER_PHOTO, null);
  const [, setMenu, removeMenus] = useLocalStorage(LocalStorageKey.MENU);
  const router = useRouter();

  const login = (data: any, path?: string) => {
    clearLocalStorageExceptForKey(LocalStorageKey.CONFIG);
    setUser(data);
    /*    if (props.login) {
          props.login();
        }*/
    // navigate(path ?? '/');
    // router.push(path ?? '/');
    router.replace(path ?? '/');
  };

  const logout = async (path?: string) => {
    try {
      setUser(null);
      removeUser();
      removeUserPhoto();
      setMenu(null);
      removeMenus();
      clearLocalStorageExceptForKey(LocalStorageKey.CONFIG);
      clearAllCookies();

      await client.get(`/signout/`);

      /*   if (props.logout) {
           props.logout();
         }*/

      // console.log('logout inside', localStorage);
      await router.replace(path ?? '/');
    } catch (e) {
      //
    }
  };

  function isAuth(): boolean {
    return true;
    // fixme: make it real
    // return !!user && isTokenValid();
  }

  const isTokenValid = () => {
    const tokenExpiryDate = user?.expireDate;
    if (tokenExpiryDate && tokenExpiryDate < Date.now()) {
      return false;
    } else {
      return true;
    }
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      setUser,
      isAuth: isAuth(),
      userPhoto,
      setUserPhoto,
      removeUserPhoto,
    }),
    [JSON.stringify(user), userPhoto]
  );
  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
};

export default AuthProvider;
