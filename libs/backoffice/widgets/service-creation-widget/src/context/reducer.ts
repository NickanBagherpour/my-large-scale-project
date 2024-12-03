import { WidgetActionType, WidgetStateType } from './types';

export const initialStateValue: WidgetStateType = {
  step: 1,
  scopeMode: 'importFromSso',
  generalInfo: {
    tag: null,
    owner: '',
    version: '',
    access: null,
    category: null,
    englishName: '',
    persianName: '',
    throughout: null,
  },
  scope: {
    scopeName: null,
    persianScopeName: '',
  },
  uploadDocs: {},
  message: null,
};

export const reducer = (state: WidgetStateType, action: WidgetActionType): WidgetStateType | undefined => {
  switch (action.type) {
    case 'NEXT_STEP':
      return state.step < 2 ? void state.step++ : undefined;

    case 'PREVIOUS_STEP':
      return state.step > 0 ? void state.step-- : undefined;

    case 'UPDATE_GLOBAL_MESSAGE':
      return void (state.message = action.payload);

    case 'UPDATE_GENERAL_INFO_STEP':
      return void (state.generalInfo = action.payload);

    case 'UPDATE_SCOPE_STEP':
      return void (state.scope = action.payload);

    case 'UPDATE_UPLOAD_DOCS':
      return void (state.uploadDocs = action.payload);

    case 'UPDATE_SCOPE_MODE':
      return void (state.scopeMode = action.payload);

    default:
      throw new Error(`this action type is not supported => ${action['type']}`);
  }
};
