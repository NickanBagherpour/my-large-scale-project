import { ApiUtil } from '@oxygen/utils';
import { MessageType, Nullable } from '@oxygen/types';

import { FiltersType, WidgetActionType, WidgetDispatchType, WidgetStateType } from './types';

export function updateSort(dispatch: WidgetDispatchType, sort: WidgetStateType['sort']) {
  dispatch({ type: 'UPDATE_SORT', payload: sort });
}

export function updateStatus(dispatch: WidgetDispatchType, status: WidgetStateType['status']) {
  dispatch({ type: 'UPDATE_STATUS', payload: status });
}

export function updateSearchTerm(dispatch: WidgetDispatchType, searchTerm: WidgetStateType['searchTerm']) {
  dispatch({ type: 'UPDATE_SEARCH_TERM', payload: searchTerm });
}

export function updateFiltersAction(dispatch: WidgetDispatchType, filters: Partial<FiltersType>) {
  dispatch({ type: 'UPDATE_FILTERS', payload: filters });
}

export function updateSubmitAction(dispatch: WidgetDispatchType, submit: Partial<FiltersType>) {
  dispatch({ type: 'UPDATE_SUBMIT', payload: submit });
}

export function updatePagination(dispatch: WidgetDispatchType, pagination: WidgetStateType['pagination']) {
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
