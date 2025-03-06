import { ApiUtil } from '@oxygen/utils';
import { MessageType, Nullable } from '@oxygen/types';

import { PaginationType, WidgetActionType, WidgetDispatchType, WidgetStateType } from './types';

export function updatePaginationAction(dispatch: WidgetDispatchType, pagination: Partial<PaginationType>) {
  dispatch({ type: 'UPDATE_PAGINATION', payload: pagination });
}

export function updateMessageAction(dispatch: WidgetDispatchType, message: Nullable<MessageType>) {
  dispatch({ type: 'UPDATE_GLOBAL_MESSAGE', payload: message });
}

export function resetErrorMessageAction(dispatch: WidgetDispatchType) {
  updateMessageAction(dispatch, null);
}

function handleError(dispatch, actionType: WidgetActionType['type'], reason, extraPayload) {
  const message = ApiUtil.getErrorMessage(reason);
  dispatch({ type: actionType, payload: { message, ...extraPayload } });
  return null;
}

export function updateStatusAction(dispatch: WidgetDispatchType, status: WidgetStateType['isActive']) {
  dispatch({ type: 'UPDATE_STATUS', payload: status });
}

export function updateSearchTermAction(dispatch: WidgetDispatchType, searchTerm: WidgetStateType['searchTerm']) {
  dispatch({ type: 'UPDATE_SEARCH_TERM', payload: searchTerm });
}

export function updateSortAction(dispatch: WidgetDispatchType, sort: WidgetStateType['sort']) {
  dispatch({ type: 'UPDATE_SORT', payload: sort });
}
