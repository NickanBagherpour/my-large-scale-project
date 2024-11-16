import { ApiUtil } from '@oxygen/utils';
import { MessageType, Nullable } from '@oxygen/types';

import { FiltersType, PaginationType, WidgetActionType, WidgetDispatchType } from './types';

export function updateFiltersAction(dispatch: WidgetDispatchType, filters: Partial<FiltersType>) {
  dispatch({ type: 'UPDATE_FILTERS', payload: filters });
}

export function updateSubmitAction(dispatch: WidgetDispatchType, submit: Partial<FiltersType>) {
  dispatch({ type: 'UPDATE_SUBMIT', payload: submit });
}

export function updatePagination(dispatch: WidgetDispatchType, pagination: Partial<PaginationType>) {
  dispatch({ type: 'UPDATE_PAGINATION', payload: pagination });
}

export function updateErrorMessageAction(dispatch: WidgetDispatchType, errorMessage: Nullable<MessageType>) {
  dispatch({ type: 'UPDATE_GLOBAL_MESSAGE', payload: errorMessage });
}

export function resetErrorMessageAction(dispatch: WidgetDispatchType) {
  updateErrorMessageAction(dispatch, null);
}

function handleError(dispatch, actionType: WidgetActionType['type'], reason, extraPayload) {
  const errorMessage = ApiUtil.getErrorMessage(reason);
  dispatch({ type: actionType, payload: { errorMessage, ...extraPayload } });
  return null;
}

export function updateMessageAction(dispatch: WidgetDispatchType, message: Nullable<MessageType>) {
  dispatch({ type: 'UPDATE_GLOBAL_MESSAGE', payload: message });
}
