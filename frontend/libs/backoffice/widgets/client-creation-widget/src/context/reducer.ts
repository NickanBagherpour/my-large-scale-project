import { FormFieldsType } from '../types';
import { INITIAL_PAGE, INITIAL_ROW_PER_PAGE } from '../utils/consts';
import { WidgetActionType, WidgetStateType } from './types';

export const initialStateValue: WidgetStateType = {
secondStep:{  table: []
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

 

    case 'UPDATE_SECOND_STEP_TABLE': {
      state.secondStep.table = [ ...state.secondStep.table, {...action.payload} ];
      return;
    }



    default:
      throw new Error(`this action type is not supported => ${action['type']}`);
  }
};
