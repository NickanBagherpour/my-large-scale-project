import { ApiUtil } from '@oxygen/utils';
import { MessageType, Nullable } from '@oxygen/types';

import { PaginationType, WidgetActionType, WidgetDispatchType } from './types';
import { RequestId } from '../types';

export function updatePagination(dispatch: WidgetDispatchType, pagination: Partial<PaginationType>) {
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

export function updateRequestIdAction(dispatch: WidgetDispatchType, requestId: RequestId) {
  dispatch({ type: 'UPDATE_REQUEST_ID', payload: requestId });
}

export function updateUserRoleAction(dispatch: WidgetDispatchType, userRole: Nullable<string>) {
  dispatch({ type: 'UPDATE_USER_ROLE', payload: userRole });
}
