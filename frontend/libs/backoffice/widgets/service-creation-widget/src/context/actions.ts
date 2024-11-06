import { MessageType, Nullable } from '@oxygen/types';

import { Step, WidgetDispatchType } from './types';

export function updateErrorMessageAction(dispatch: WidgetDispatchType, errorMessage: Nullable<MessageType>) {
  dispatch({ type: 'UPDATE_GLOBAL_MESSAGE', payload: errorMessage });
}

export function updateStep(dispatch: WidgetDispatchType, step: Step) {
  dispatch({ type: 'UPDATE_STEP', payload: step });
}

export function resetErrorMessageAction(dispatch: WidgetDispatchType) {
  updateErrorMessageAction(dispatch, null);
}
