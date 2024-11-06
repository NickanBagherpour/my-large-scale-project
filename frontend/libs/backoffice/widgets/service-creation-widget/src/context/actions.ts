import type { MessageType, Nullable } from '@oxygen/types';
import type { ScopeMode, WidgetDispatchType } from './types';
import type { AddScopeType, GetInfoValuesType, UploadDocsType } from '../types';

export function updateErrorMessageAction(dispatch: WidgetDispatchType, errorMessage: Nullable<MessageType>) {
	dispatch({ type: 'UPDATE_GLOBAL_MESSAGE', payload: errorMessage });
}

export function nextStep(dispatch: WidgetDispatchType) {
	dispatch({ type: 'NEXT_STEP' });
}

export function previousStep(dispatch: WidgetDispatchType) {
	dispatch({ type: 'PREVIOUS_STEP' });
}

export function updateScopeMode(dispatch: WidgetDispatchType, payload: ScopeMode) {
	dispatch({ type: 'UPDATE_SCOPE_MODE', payload });
}

export function updateGetInfoStep(dispatch: WidgetDispatchType, payload: GetInfoValuesType) {
	dispatch({ type: 'UPDATE_GET_INFO_STEP', payload });
}

export function updateAddScopeStep(dispatch: WidgetDispatchType, payload: AddScopeType) {
	dispatch({ type: 'UPDATE_ADD_SCOPE_STEP', payload });
}

export function updateUploadDocs(dispatch: WidgetDispatchType, payload: UploadDocsType) {
	dispatch({ type: 'UPDATE_UPLOAD_DOCS', payload });
}

export function resetErrorMessageAction(dispatch: WidgetDispatchType) {
	updateErrorMessageAction(dispatch, null);
}
