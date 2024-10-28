import { ApiUtil } from '@oxygen/utils';
import { ErrorMessageType, Nullable } from '@oxygen/types';

import { FiltersType, PaginationType, WidgetActionType, WidgetDispatchType, WidgetStateType } from './types';

export function updateSort(dispatch: WidgetDispatchType, sort: WidgetStateType['sort']) {
  dispatch({ type: 'UPDATE_SORT', payload: sort });
}

export function updateStatus(dispatch: WidgetDispatchType, status: WidgetStateType['status']) {
  dispatch({ type: 'UPDATE_STATUS', payload: status });
}

export function updateSearchTerm(dispatch: WidgetDispatchType, searchTerm: WidgetStateType['searchTerm']) {
  dispatch({ type: 'UPDATE_SEARCH_TERM', payload: searchTerm });
}

// export function updateFiltersAction(dispatch: WidgetDispatchType, filters: Partial<FiltersType>) {
//   dispatch({ type: 'UPDATE_FILTERS', payload: filters });
// }

// export function updateSubmitAction(dispatch: WidgetDispatchType, submit: Partial<FiltersType>) {
//   dispatch({ type: 'UPDATE_SUBMIT', payload: submit });
// }

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
