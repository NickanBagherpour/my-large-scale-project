import { FormFieldsType } from '../types';
import { WidgetActionType, WidgetStateType } from './types';

const initialFilters: FormFieldsType = {
  name: null,
  code: null,
};

export const initialStateValue: WidgetStateType = {
  message: null,
};

export const reducer = (state: WidgetStateType, action: WidgetActionType): WidgetStateType | undefined => {
  //console.log(action.type, state, action);
  switch (action.type) {
    case 'UPDATE_GLOBAL_MESSAGE': {
      state.message = action.payload;
      return;
    }

    default:
      throw new Error(`this action type is not supported => ${action['type']}`);
  }
};
