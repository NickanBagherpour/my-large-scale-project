import type { MessageType, Nullable } from '@oxygen/types';
import type { WidgetDispatchType } from './types';
import type { GeneralInfoValuesType, RouteType } from '../types';

export function updateMessageAction(dispatch: WidgetDispatchType, message: Nullable<MessageType>) {
  dispatch({ type: 'UPDATE_GLOBAL_MESSAGE', payload: message });
}

export function nextStep(dispatch: WidgetDispatchType) {
  dispatch({ type: 'NEXT_STEP' });
}

export function previousStep(dispatch: WidgetDispatchType) {
  dispatch({ type: 'PREVIOUS_STEP' });
}

export function updateGetInfoStep(dispatch: WidgetDispatchType, payload: GeneralInfoValuesType) {
  dispatch({ type: 'UPDATE_GENERAL_INFO_STEP', payload });
}

export function updateRouteStep(dispatch: WidgetDispatchType, payload: RouteType) {
  dispatch({ type: 'UPDATE_ROUTE_STEP', payload });
}

export function resetMessageAction(dispatch: WidgetDispatchType) {
  updateMessageAction(dispatch, null);
}
