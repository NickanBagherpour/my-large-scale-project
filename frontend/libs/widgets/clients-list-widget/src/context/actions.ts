import { ErrorMessageType, Nullable } from '@oxygen/types';
import { WidgetDispatchType, WidgetStateType } from './types';

export function updateSort(dispatch: WidgetDispatchType, sort: WidgetStateType['sort']) {
  dispatch({ type: 'UPDATE_SORT', payload: sort });
}

export function updateStatus(dispatch: WidgetDispatchType, status: WidgetStateType['status']) {
  dispatch({ type: 'UPDATE_STATUS', payload: status });
}

export function updateSearchTerm(dispatch: WidgetDispatchType, searchTerm: WidgetStateType['searchTerm']) {
  dispatch({ type: 'UPDATE_SEARCH_TERM', payload: searchTerm });
}

export function updatePagination(dispatch: WidgetDispatchType, page: WidgetStateType['page']) {
  dispatch({ type: 'UPDATE_PAGINATION', payload: page });
}

export function updateErrorMessageAction(dispatch: WidgetDispatchType, errorMessage: Nullable<ErrorMessageType>) {
  dispatch({ type: 'UPDATE_GLOBAL_ERROR_MESSAGE', payload: errorMessage });
}

export function resetErrorMessageAction(dispatch: WidgetDispatchType) {
  updateErrorMessageAction(dispatch, null);
}
