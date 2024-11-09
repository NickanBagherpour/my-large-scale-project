import { ApiUtil } from '@oxygen/utils';
import { MessageType, Nullable } from '@oxygen/types';

import { FiltersType, WidgetActionType, WidgetDispatchType } from './types';

export function updateSecondStepTableAction(dispatch: WidgetDispatchType, secondStepTable: Partial<FiltersType>) {
  dispatch({ type: 'UPDATE_SECOND_STEP_TABLE', payload: secondStepTable });
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
