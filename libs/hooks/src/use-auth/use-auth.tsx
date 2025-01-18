'use client';

import { useRouter } from 'next/navigation';

import React, { createContext, useContext, useMemo } from 'react';

import { CookieKey, LocalStorageKey, User } from '@oxygen/types';
import { clearAllCookiesExceptForKey, clearLocalStorageExceptForKey, getCookie } from '@oxygen/utils';
import { queryClient } from '@oxygen/client';

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
  // const user = {};//useSession()?.data?.user as User;
  const [userPhoto, setUserPhoto, removeUserPhoto] = useLocalStorage(LocalStorageKey.USER_PHOTO, null);
  const [, setMenu, removeMenus] = useLocalStorage(LocalStorageKey.MENU);
  const router = useRouter();

  const login = async (data: any, path?: string) => {
    clearLocalStorageExceptForKey(LocalStorageKey.CONFIG);
    // const res = await signIn('credentials', { ...data, redirect: false });
    setUser({ ...data });
    /*    if (props.login) {
           props.login();
         }*/
    // navigate(path ?? '/');
    // router.push(path ?? '/');
    router.replace(path ?? '/');
  };

  const logout = async (path?: string) => {
    try {
      const response = await fetch(`/api/auth/signout`);
      const result = await response.json();

      if (result.success) {
        setUser(null);
        removeUser();
        removeUserPhoto();
        setMenu(null);
        removeMenus();
        clearLocalStorageExceptForKey(LocalStorageKey.CONFIG);
        // clearAllCookiesExceptForKey(CookieKey.CONFIG);

        queryClient?.clear();

        /*
        if (props.logout) {
             props.logout();
        }
        */

        await router.replace(path ?? '/');
      } else {
        console.error('Logout failed:', result.error);
      }
    } catch (e) {
      console.error('Logout failed', e);
    }
  };

  function isAuth(): boolean {
    const token = getCookie(CookieKey.SESSION_ID);
    return !!token;
    // return !!user; //&& isTokenValid();
  }

  function isUserExist(): boolean {
    return user && (user?.name || user?.family);
  }

  /* const isTokenValid = () => {
     const tokenExpiryDate = useSession().data?.expires;
     if (tokenExpiryDate && tokenExpiryDate < Date.now()) {
       return false;
     } else {
       return true;
     }
   };*/

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      setUser,
      isAuth: isAuth(),
      isUserExist: isUserExist(),
      userPhoto,
      setUserPhoto,
      removeUserPhoto,
    }),
    [JSON.stringify(user), userPhoto]
  );
  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
};

export default AuthProvider;
