'use client';

import { useRouter } from 'next/navigation';

import React, { createContext, useContext, useMemo } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

import { LocalStorageKey } from '@oxygen/types';
import { clearLocalStorageExceptForKey } from '@oxygen/utils';

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
  // const [user, setUser, removeUser] = useLocalStorage<any>(LocalStorageKey.USER, null);
  // const user = useSession()?.data?.user;
  const user=true
  const [userPhoto, setUserPhoto, removeUserPhoto] = useLocalStorage(LocalStorageKey.USER_PHOTO, null);
  const [, setMenu, removeMenus] = useLocalStorage(LocalStorageKey.MENU);
  const router = useRouter();

  const login2 = (data: any, path?: string) => {
    clearLocalStorageExceptForKey(LocalStorageKey.CONFIG);
    // setUser(data);
    /*    if (props.login) {
          props.login();
        }*/
    // navigate(path ?? '/');
    // router.push(path ?? '/');
    router.replace(path ?? '/');
  };

  const login = async (data: any, path?: string) => {
    clearLocalStorageExceptForKey(LocalStorageKey.CONFIG);
    await signIn('credentials', { ...data, redirect: false });
    /*    if (props.login) {
          props.login();
        }*/
    // navigate(path ?? '/');
    // router.push(path ?? '/');
    router.replace(path ?? '/');
  };

  const logout = async (path?: string) => {
    try {
      //fixme
      // setUser(null);
      // removeUser();
      removeUserPhoto();
      setMenu(null);
      removeMenus();
      clearLocalStorageExceptForKey(LocalStorageKey.CONFIG);
      // clearAllCookies();

      // await client.get(`/signout/`);
      await signOut();

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
    return !!user; //&& isTokenValid();
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
      // setUser,
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
