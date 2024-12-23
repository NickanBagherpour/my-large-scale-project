import { ApiUtil } from '@oxygen/utils';
import { MessageType, Nullable } from '@oxygen/types';

import { PaginationType, WidgetActionType, WidgetDispatchType, WidgetStateType } from './types';

export function updatePagination(dispatch: WidgetDispatchType, pagination: Partial<PaginationType>) {
  dispatch({ type: 'UPDATE_PAGINATION', payload: pagination });
}

export function updateMessageAction(dispatch: WidgetDispatchType, message: Nullable<MessageType>) {
  dispatch({ type: 'UPDATE_GLOBAL_MESSAGE', payload: message });
}

export function resetErrorMessageAction(dispatch: WidgetDispatchType) {
  updateMessageAction(dispatch, null);
}

export function updateSearchTerm(dispatch: WidgetDispatchType, searchTerm: WidgetStateType['searchField']) {
  dispatch({ type: 'UPDATE_SEARCH_TERM', payload: searchTerm });
}

function handleError(dispatch, actionType: WidgetActionType['type'], reason, extraPayload) {
  const message = ApiUtil.getErrorMessage(reason);
  dispatch({ type: actionType, payload: { message, ...extraPayload } });
  return null;
}
