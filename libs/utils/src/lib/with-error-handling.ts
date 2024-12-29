import { ApiUtil, isAxiosError } from '../index';

type WithErrorHandlingOptions = {
  resetError?: boolean;
  handleErrors?: boolean;
  actionType?: string;
  ignore404Errors?: boolean;
};

const DEFAULT_ACTION_TYPE = 'UPDATE_GLOBAL_MESSAGE';

export const withErrorHandling =
  <TReturn>(
    requestFn: () => Promise<{ data: TReturn }>,
    dispatch?: any,
    {
      resetError = true,
      handleErrors = true,
      actionType = DEFAULT_ACTION_TYPE,
      ignore404Errors = false,
    }: WithErrorHandlingOptions = {}
    // fullResponse = false,
  ) =>
  async () => {
    try {
      if (dispatch && resetError) {
        dispatch({
          type: actionType,
          payload: null,
        });
      }
      const response = await requestFn();
      return response.data;
      // return fullResponse ? response : response.data;
    } catch (reason) {
      const shouldIgnore404Errors = isAxiosError(reason) && reason.status === 404 && ignore404Errors;
      if (dispatch && handleErrors && !shouldIgnore404Errors) {
        const err = ApiUtil.getErrorMessage(reason);
        dispatch({ type: actionType, payload: err });
      }
      throw reason;
    }
  };
