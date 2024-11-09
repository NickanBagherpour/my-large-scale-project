import { WidgetActionType, WidgetStateType } from './types';

export const initialStateValue: WidgetStateType = {
  step: 0,
  scopeMode: 'importFromSso',
  getInfo: {
    host: '',
    path: '',
    tag: null,
    owner: '',
    version: '',
    access: null,
    category: null,
    upstream: '',
    protocole: null,
    englishName: '',
    persianName: '',
    throughout: null,
    actionOrMethod: '',
  },
  addScope: {
    scopeName: '',
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

    case 'UPDATE_GET_INFO_STEP':
      return void (state.getInfo = action.payload);

    case 'UPDATE_ADD_SCOPE_STEP':
      return void (state.addScope = action.payload);

    case 'UPDATE_UPLOAD_DOCS':
      return void (state.uploadDocs = action.payload);

    case 'UPDATE_SCOPE_MODE':
      return void (state.scopeMode = action.payload);

    default:
      throw new Error(`this action type is not supported => ${action['type']}`);
  }
};
