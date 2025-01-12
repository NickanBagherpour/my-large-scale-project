import { ApiUtil } from '@oxygen/utils';
import { MessageType, Nullable } from '@oxygen/types';

import { PaginationType, WidgetActionType, WidgetDispatchType, WidgetStateType } from './types';

export function updateSort(dispatch: WidgetDispatchType, sort: WidgetStateType['sort']) {
  dispatch({ type: 'UPDATE_SORT', payload: sort });
}

export function updateStatus(dispatch: WidgetDispatchType, status: WidgetStateType['status']) {
  dispatch({ type: 'UPDATE_STATUS', payload: status });
}

export function updateUpstreamInfo(dispatch: WidgetDispatchType, upstreamInfo: WidgetStateType['upstreamInfo']) {
  dispatch({ type: 'UPDATE_UPSTREAM_INFO', payload: upstreamInfo });
}

export function updateSearchTerm(dispatch: WidgetDispatchType, searchTerm: WidgetStateType['searchTerm']) {
  dispatch({ type: 'UPDATE_SEARCH_TERM', payload: searchTerm });
}

export function updatePagination(dispatch: WidgetDispatchType, pagination: PaginationType) {
  dispatch({ type: 'UPDATE_PAGINATION', payload: pagination });
}

export function updateErrorMessageAction(dispatch: WidgetDispatchType, errorMessage: Nullable<MessageType>) {
  dispatch({ type: 'UPDATE_GLOBAL_MESSAGE', payload: errorMessage });
}

export function updateMessageAction(dispatch: WidgetDispatchType, message: Nullable<MessageType>) {
  dispatch({ type: 'UPDATE_GLOBAL_MESSAGE', payload: message });
}

export function resetErrorMessageAction(dispatch: WidgetDispatchType) {
  updateErrorMessageAction(dispatch, null);
}

function handleError(dispatch, actionType: WidgetActionType['type'], reason, extraPayload) {
  const errorMessage = ApiUtil.getErrorMessage(reason);
  dispatch({ type: actionType, payload: { errorMessage, ...extraPayload } });
  return null;
}
