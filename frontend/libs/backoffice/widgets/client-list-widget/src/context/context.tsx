'use client';

import { ReactNode, createContext, useContext } from 'react';

import { useImmerReducer } from 'use-immer';

import { initialStateValue, reducer } from './reducer';
import { WidgetDispatchType, WidgetStateType } from './types';

type AppProviderProps = {
  children: ReactNode;
};

const AppStateContext = createContext<WidgetStateType | undefined>(undefined);
AppStateContext.displayName = 'WidgetStateProvider';

const AppDispatchContext = createContext<WidgetDispatchType | undefined>(undefined);
AppDispatchContext.displayName = 'WidgetDispatchProvider';

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within a AppProvider');
  }

  return context;
};

export const useAppDispatch = () => {
  const context = useContext(AppDispatchContext);
  if (context === undefined) {
    throw new Error('useAppDispatch must be used within a AppProvider');
  }

  return context;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [state, dispatch] = useImmerReducer(reducer, initialStateValue);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};
