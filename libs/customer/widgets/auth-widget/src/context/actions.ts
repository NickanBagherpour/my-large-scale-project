import { MessageType, Nullable } from '@oxygen/types';

import { FiltersType, OTPType, WidgetDispatchType } from './types';

export function updateOTPAction(dispatch: WidgetDispatchType, OTP: Nullable<OTPType>) {
  dispatch({ type: 'UPDATE_OTP', payload: OTP });
}

export function updateSubmitAction(dispatch: WidgetDispatchType, submit: Partial<FiltersType>) {
  dispatch({ type: 'UPDATE_SUBMIT', payload: submit });
}

export function updateMessageAction(dispatch: WidgetDispatchType, message: Nullable<MessageType>) {
  dispatch({ type: 'UPDATE_GLOBAL_MESSAGE', payload: message });
}

export function resetErrorMessageAction(dispatch: WidgetDispatchType) {
  updateMessageAction(dispatch, null);
}
