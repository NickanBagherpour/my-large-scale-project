import { WidgetActionType, WidgetStateType } from './types';

export const initialStateValue: WidgetStateType = {
  message: null,
  currentConfig: null,
};

export const reducer = (state: WidgetStateType, action: WidgetActionType): WidgetStateType | undefined => {
  switch (action.type) {
    case 'UPDATE_CURRENT_CONFIG': {
      state.currentConfig = action.payload;
      return;
    }

    case 'UPDATE_GLOBAL_MESSAGE': {
      state.message = action.payload;
      return;
    }
    default:
      throw new Error(`this action type is not supported => ${action['type']}`);
  }
};
