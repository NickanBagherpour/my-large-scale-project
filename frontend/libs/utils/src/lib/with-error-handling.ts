import { ApiUtil } from '../index';

type WithErrorHandlingOptions = {
  resetError?: boolean;
  handleErrors?: boolean;
  actionType?: string;
};

const DEFAULT_ACTION_TYPE = 'UPDATE_GLOBAL_ERROR_MESSAGE';

export const withErrorHandling =
  <TReturn>(
    requestFn: () => Promise<{ data: TReturn }>,
    dispatch?: any,
    { resetError = true, handleErrors = true, actionType = DEFAULT_ACTION_TYPE }: WithErrorHandlingOptions = {}
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
    } catch (reason) {
      if (dispatch && handleErrors) {
        const err = ApiUtil.getErrorMessage(reason);
        dispatch({ type: actionType, payload: err });
      }

      throw reason;
    }
  };
