import { WidgetActionType, WidgetStateType } from './types';

export const initialStateValue: WidgetStateType = {
  OTP: {
    isOpen: false,
    type: undefined,
    ip: undefined,
    mobileNumber: undefined,
    nationalCode: undefined,
    key: undefined,
  },
  message: null,
};

export const reducer = (state: WidgetStateType, action: WidgetActionType): WidgetStateType | undefined => {
  //console.log(action.type, state, action);
  switch (action.type) {
    case 'UPDATE_GLOBAL_MESSAGE': {
      state.message = action.payload;
      return;
    }
    case 'UPDATE_OTP': {
      state.OTP = { ...state.OTP, ...action.payload };
      return;
    }
    default:
      throw new Error(`this action type is not supported => ${action['type']}`);
  }
};
