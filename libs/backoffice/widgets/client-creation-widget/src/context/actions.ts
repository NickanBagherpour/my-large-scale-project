import { ApiUtil } from '@oxygen/utils';
import { MessageType, Nullable } from '@oxygen/types';

import { FiltersType, OrganizationInfo, WidgetActionType, WidgetDispatchType, WidgetStateType } from './types';

export function updateOrganizationInfoAction(dispatch: WidgetDispatchType, organizationInfo: OrganizationInfo) {
  dispatch({ type: 'ADD_ORGANIZATION_INFO', payload: organizationInfo });
}
export function updateFirstStepAction(dispatch: WidgetDispatchType, firstStep: WidgetStateType['firstStep']) {
  dispatch({ type: 'UPDATE_FIRST_STEP_FORM', payload: firstStep });
}
export function addClientStatus(dispatch: WidgetDispatchType, payload: WidgetStateType['clientStatus']) {
  dispatch({ type: 'ADD_CLIENT_STATUS', payload });
}
export function addClientName(dispatch: WidgetDispatchType, payload: WidgetStateType['clientName']) {
  dispatch({ type: 'ADD_CLIENT_NAME', payload });
}

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
