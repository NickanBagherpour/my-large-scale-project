import { ApiUtil } from '@oxygen/utils';
import { MessageType, Nullable } from '@oxygen/types';

import { initialActiveSelectType, WidgetActionType, WidgetDispatchType } from './types';

export function updateServerNameAction(dispatch: WidgetDispatchType, serviceName: Nullable<string>) {
  dispatch({ type: 'UPDATE_SERVICE_NAME', payload: serviceName });
}

export function updateUpstreamAction(dispatch: WidgetDispatchType, initialupstream: initialActiveSelectType) {
  dispatch({ type: 'UPDATE_UPSTREAM', payload: initialupstream });
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
