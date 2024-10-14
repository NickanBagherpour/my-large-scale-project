'use client';

import React, { createContext, useCallback, useContext, useMemo } from 'react';

import { LocalStorageKey } from '@oxygen/types';

import useLocalStorage from '../use-local-storage/use-local-storage';

const MenuContext = createContext<any>(null);

export const useMenu = () => {
  return useContext(MenuContext);
};

type MenuProviderProps = {
  children: React.ReactNode;
};

const MenuProvider = (props: MenuProviderProps) => {
  const [menu, setMenu, removeMenu] = useLocalStorage(LocalStorageKey.MENU, null);

  const setMenuCallback = useCallback(setMenu, []);

  function removeMenuHandler() {
    setMenu(null);
    removeMenu();
  }

  // const removeMenuCallback = useCallback(removeMenuHandler, []);

  const value = useMemo(() => {
    return {
      menu,
      setMenu: setMenuCallback,
      removeMenu: removeMenuHandler,
    };
  }, [JSON.stringify(menu)]);

  /*  const value = {
    menu,
    setMenu,
    removeMenu,
  };*/

  return <MenuContext.Provider value={value}>{props.children}</MenuContext.Provider>;
};

export default MenuProvider;
