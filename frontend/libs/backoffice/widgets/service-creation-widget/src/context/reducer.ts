import { WidgetActionType, WidgetStateType } from './types';

export const initialStateValue: WidgetStateType = {
  step: 1,
  errorMessage: null,
};

export const reducer = (state: WidgetStateType, action: WidgetActionType): WidgetStateType | undefined => {
  switch (action.type) {
    case 'UPDATE_STEP': {
      return void (state.step = action.payload);
    }
    case 'UPDATE_GLOBAL_ERROR_MESSAGE': {
      return void (state.errorMessage = action.payload);
    }
    default:
      throw new Error(`this action type is not supported => ${action['type']}`);
  }
};
