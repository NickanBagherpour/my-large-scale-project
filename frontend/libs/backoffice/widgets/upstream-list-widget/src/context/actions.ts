import { ErrorMessageType, Nullable } from '@oxygen/types';
import { ApiUtil } from '@oxygen/utils';

import { WidgetActionType, WidgetDispatchType, WidgetStateType } from './types';

export function updateSearchTerm(dispatch: WidgetDispatchType, searchTerm: WidgetStateType['searchTerm']) {
  dispatch({ type: 'UPDATE_SEARCH_TERM', payload: searchTerm });
}

export function updatePagination(dispatch: WidgetDispatchType) {
  dispatch({ type: 'UPDATE_PAGINATION' });
}

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
