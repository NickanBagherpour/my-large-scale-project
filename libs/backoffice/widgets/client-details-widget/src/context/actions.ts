import { MessageType, Nullable } from '@oxygen/types';
import { WidgetDispatchType, WidgetStateType } from './types';

export function updateMessageAction(dispatch: WidgetDispatchType, message: Nullable<MessageType>) {
  dispatch({ type: 'UPDATE_GLOBAL_MESSAGE', payload: message });
}

export function updateCurrentConfig(dispatch: WidgetDispatchType, currentConfig: WidgetStateType['currentConfig']) {
  dispatch({ type: 'UPDATE_CURRENT_CONFIG', payload: currentConfig });
}

export function resetErrorMessageAction(dispatch: WidgetDispatchType) {
  updateMessageAction(dispatch, null);
}
