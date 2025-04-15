import { MessageType, Nullable } from '@oxygen/types';
import { WidgetDispatchType, WidgetStateType } from './types';

export function updateMessageAction(dispatch: WidgetDispatchType, message: Nullable<MessageType>) {
  dispatch({ type: 'UPDATE_GLOBAL_MESSAGE', payload: message });
}

export function updateSortAction(dispatch: WidgetDispatchType, sort: WidgetStateType['sort']) {
  dispatch({ type: 'UPDATE_SORT', payload: sort });
}

export function updateClientTypeAction(dispatch: WidgetDispatchType, clientType: WidgetStateType['clientType']) {
  dispatch({ type: 'UPDATE_CLIENT_TYPE', payload: clientType });
}

export function updateSearchTermAction(dispatch: WidgetDispatchType, searchTerm: WidgetStateType['searchTerm']) {
  dispatch({ type: 'UPDATE_SEARCH_TERM', payload: searchTerm });
}

export function updateMonthAction(dispatch: WidgetDispatchType, searchTerm: WidgetStateType['month']) {
  dispatch({ type: 'UPDATE_MONTH_FILTER', payload: searchTerm });
}

export function updateYearAction(dispatch: WidgetDispatchType, searchTerm: WidgetStateType['year']) {
  dispatch({ type: 'UPDATE_YEAR_FILTER', payload: searchTerm });
}

export function resetErrorMessageAction(dispatch: WidgetDispatchType) {
  updateMessageAction(dispatch, null);
}
