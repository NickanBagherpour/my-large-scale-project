import { ApiUtil } from '@oxygen/utils';
import { ErrorMessageType, Nullable } from '@oxygen/types';

import { PaginationType, WidgetActionType, WidgetDispatchType } from './types';

export function updateErrorMessageAction(dispatch: WidgetDispatchType, errorMessage: Nullable<ErrorMessageType>) {
  dispatch({ type: 'UPDATE_GLOBAL_ERROR_MESSAGE', payload: errorMessage });
}

export function resetErrorMessageAction(dispatch: WidgetDispatchType) {
  updateErrorMessageAction(dispatch, null);
}

function handleError(dispatch, actionType: WidgetActionType['type'], reason, extraPayload) {
  const errorMessage = ApiUtil.getErrorMessage(reason);
  dispatch({ type: actionType, payload: { errorMessage, ...extraPayload } });
  return null;
}
