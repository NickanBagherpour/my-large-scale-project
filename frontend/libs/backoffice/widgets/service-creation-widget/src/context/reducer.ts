import { WidgetActionType, WidgetStateType } from './types';

export const initialStateValue: WidgetStateType = {
  step: 1,
  message: null,
};

export const reducer = (state: WidgetStateType, action: WidgetActionType): WidgetStateType | undefined => {
  switch (action.type) {
    case 'UPDATE_STEP': {
      return void (state.step = action.payload);
    }
    case 'UPDATE_GLOBAL_MESSAGE': {
      return void (state.message = action.payload);
    }
    default:
      throw new Error(`this action type is not supported => ${action['type']}`);
  }
};
