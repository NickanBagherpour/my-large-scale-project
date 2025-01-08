import { ApiUtil } from '@oxygen/utils';
import { MessageType, Nullable } from '@oxygen/types';

import { WidgetActionType, WidgetDispatchType, WidgetStateType } from './types';
import { PaginationType } from '../../../applicant-history-widget/src/context/types';

export function updateSearchTermAction(dispatch: WidgetDispatchType, searchTerm: WidgetStateType['searchTerm']) {
  dispatch({ type: 'UPDATE_SEARCH_TERM', payload: searchTerm });
}

export function updatePagination(dispatch: WidgetDispatchType, pagination: PaginationType) {
  dispatch({ type: 'UPDATE_PAGINATION', payload: pagination });
}

export function updateMessageAction(dispatch: WidgetDispatchType, message: Nullable<MessageType>) {
  dispatch({ type: 'UPDATE_GLOBAL_MESSAGE', payload: message });
}

export function resetMessageAction(dispatch: WidgetDispatchType) {
  updateMessageAction(dispatch, null);
}

function handleError(dispatch, actionType: WidgetActionType['type'], reason, extraPayload) {
  const message = ApiUtil.getErrorMessage(reason);
  dispatch({ type: actionType, payload: { message, ...extraPayload } });
  return null;
}
