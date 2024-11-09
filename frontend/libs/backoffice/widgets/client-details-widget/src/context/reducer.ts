import { WidgetActionType, WidgetStateType } from './types';

export const initialStateValue: WidgetStateType = {
  message: null,
};

export const reducer = (state: WidgetStateType, action: WidgetActionType): WidgetStateType | undefined => {
  switch (action.type) {
    case 'UPDATE_GLOBAL_MESSAGE': {
      state.message = action.payload;
      return;
    }
    default:
      throw new Error(`this action type is not supported => ${action['type']}`);
  }
};
