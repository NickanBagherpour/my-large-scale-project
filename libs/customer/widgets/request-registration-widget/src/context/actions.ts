import { ApiUtil } from '@oxygen/utils';
import { MessageType, Nullable } from '@oxygen/types';
import { WidgetStateType } from '../context/types';

import { FiltersType, PaginationType, WidgetActionType, WidgetDispatchType, RequestMode } from './types';

export function updateFirstStepAction(dispatch: WidgetDispatchType, firstStep: Partial<FiltersType>) {
  dispatch({ type: 'UPDATE_FIRST_STEP_FORM', payload: firstStep });
}

export function updateOrganizationIdAndSubmissionId(dispatch: WidgetDispatchType, orgAndSubId: Partial<FiltersType>) {
  dispatch({ type: 'UPDATE_ORGANIZATION_ID_AND_SUBMISSION_ID', payload: orgAndSubId });
}

export function updateSecondStepAction(dispatch: WidgetDispatchType, secondStep: Partial<FiltersType>) {
  dispatch({ type: 'UPDATE_SECOND_STEP', payload: secondStep });
}

export function updateThirdStepTableAction(
  dispatch: WidgetDispatchType,
  thirdStepTable: Partial<FiltersType> | { serviceId: number }
) {
  if ('serviceId' in thirdStepTable) {
    dispatch({ type: 'UPDATE_THIRD_STEP_TABLE_AFTER_DELETE', payload: { service: thirdStepTable } });
  } else {
    dispatch({ type: 'UPDATE_THIRD_STEP_TABLE', payload: thirdStepTable });
  }
}

export function updateRequestMode(dispatch: WidgetDispatchType, payload: RequestMode) {
  dispatch({ type: 'UPDATE_REQUEST_MODE', payload });
}

export function updateStatus(dispatch: WidgetDispatchType, status: WidgetStateType['status']) {
  dispatch({ type: 'UPDATE_STATUS', payload: status });
}

export function updateFiltersAction(dispatch: WidgetDispatchType, filters: Partial<FiltersType>) {
  dispatch({ type: 'UPDATE_FILTERS', payload: filters });
}

export function updateSubmitAction(dispatch: WidgetDispatchType, submit: Partial<FiltersType>) {
  dispatch({ type: 'UPDATE_SUBMIT', payload: submit });
}

export function updatePagination(dispatch: WidgetDispatchType, pagination: Partial<PaginationType>) {
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
