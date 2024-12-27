import type { MessageType, Nullable } from '@oxygen/types';
import type { ErrorPayload, WidgetDispatchType, WidgetStateType } from './types';

export function updateMessageAction(dispatch: WidgetDispatchType, message: Nullable<MessageType>) {
  dispatch({ type: 'UPDATE_GLOBAL_MESSAGE', payload: message });
}

export function nextStep(dispatch: WidgetDispatchType) {
  dispatch({ type: 'NEXT_STEP' });
}

export function previousStep(dispatch: WidgetDispatchType) {
  dispatch({ type: 'PREVIOUS_STEP' });
}

export function addInitialStep(dispatch: WidgetDispatchType, payload: WidgetStateType['step']) {
  dispatch({ type: 'ADD_INITIAL_STEP', payload });
}

export function addServiceName(dispatch: WidgetDispatchType, payload: WidgetStateType['serviceName']) {
  dispatch({ type: 'ADD_SERVICE_NAME', payload });
}

export function addStepErrors(dispatch: WidgetDispatchType, payload: ErrorPayload) {
  dispatch({ type: 'ADD_STEP_ERRORS', payload });
}

export function goToFirstError(dispatch: WidgetDispatchType) {
  dispatch({ type: 'GO_TO_FIRST_ERROR' });
}

export function resetMessageAction(dispatch: WidgetDispatchType) {
  updateMessageAction(dispatch, null);
}
