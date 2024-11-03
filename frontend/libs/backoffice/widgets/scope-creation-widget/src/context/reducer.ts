import { WidgetActionType, WidgetStateType } from './types';

export const initialStateValue: WidgetStateType = {
  errorMessage: null,
};

export const reducer = (state: WidgetStateType, action: WidgetActionType): WidgetStateType | undefined => {
  //console.log(action.type, state, action);
  switch (action.type) {
    case 'UPDATE_GLOBAL_ERROR_MESSAGE': {
      state.errorMessage = action.payload;
      return;
    }

    default:
      throw new Error(`this action type is not supported => ${action['type']}`);
  }
};
