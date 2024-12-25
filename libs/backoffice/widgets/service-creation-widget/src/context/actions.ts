import type { MessageType, Nullable } from '@oxygen/types';
import type { WidgetDispatchType, WidgetStateType } from './types';

export function updateMessageAction(dispatch: WidgetDispatchType, message: Nullable<MessageType>) {
  dispatch({ type: 'UPDATE_GLOBAL_MESSAGE', payload: message });
}

export function nextStep(dispatch: WidgetDispatchType) {
  dispatch({ type: 'NEXT_STEP' });
}

export function previousStep(dispatch: WidgetDispatchType) {
  dispatch({ type: 'PREVIOUS_STEP' });
}

export function syncStateWithUrl(dispatch: WidgetDispatchType, payload: Pick<WidgetStateType, 'step' | 'serviceName'>) {
  dispatch({ type: 'SYNC_WITH_URL', payload });
}

export function resetMessageAction(dispatch: WidgetDispatchType) {
  updateMessageAction(dispatch, null);
}
