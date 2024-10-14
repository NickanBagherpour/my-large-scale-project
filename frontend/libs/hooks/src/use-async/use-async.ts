'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { Nullable } from '@oxygen/types';
import { ApiUtil } from '@oxygen/utils';

type AsyncFunction = () => Promise<any>;

type Error = {
  txt: string;
  type: 'success' | 'info' | 'warning' | 'error' | undefined;
  shouldTranslate: boolean;
};

type UseAsyncResult<T> = {
  asyncState: {
    data: T | null;
    loading: boolean;
    settled: boolean;
    error: Nullable<Error>;
  };
  execute: (asyncFunction?: AsyncFunction | undefined) => Promise<any>;
  cancel: () => void;
  reset: () => void;
};

const useAsync = <T = any>(asyncFunction?: Nullable<AsyncFunction>, manual = false): UseAsyncResult<T> => {
  const initialState = {
    data: null,
    loading: false,
    settled: false,
    error: null,
  };

  const [asyncState, setAsyncState] = useState(initialState);

  function handleError(error) {
    if (error && Object.prototype.hasOwnProperty.call(error, 'txt')) {
      return error;
    }

    return ApiUtil.getErrorMessage(error);
  }

  const execute = useCallback(async (_asyncFunction?: AsyncFunction) => {
    let result: any = null;

    if (!_asyncFunction && !asyncFunction) return;

    setAsyncState((prevState) => ({
      ...prevState,
      loading: true,
      settled: false,
      error: null,
    }));

    try {
      result = await (_asyncFunction ? _asyncFunction() : asyncFunction && asyncFunction());

      setAsyncState((prevState) => ({
        ...prevState,
        data: result,
      }));
    } catch (error) {
      setAsyncState((prevState) => ({
        ...prevState,
        error: handleError(error),
      }));
      // throw error;
    } finally {
      setAsyncState((prevState) => ({
        ...prevState,
        loading: false,
        settled: true,
      }));
    }
    return result;
  }, []);

  useEffect(() => {
    if (!manual && asyncFunction) {
      execute();
    }
  }, [execute, manual]);

  const cancel = useCallback(() => {
    setAsyncState(initialState);
  }, []);

  const reset = useCallback(() => {
    setAsyncState(initialState);
  }, []);

  const memoizedAsyncState = useMemo(() => asyncState, [asyncState]);

  return { asyncState: memoizedAsyncState, execute, cancel, reset };
};

export default useAsync;
