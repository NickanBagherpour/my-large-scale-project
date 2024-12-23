import { INITIAL_PAGE, INITIAL_ROW_PER_PAGE } from '../utils/consts';
import { WidgetActionType, WidgetStateType } from './types';

export const initialStateValue: WidgetStateType = {
  table: {
    pagination: {
      rowsPerPage: INITIAL_ROW_PER_PAGE,
      page: INITIAL_PAGE,
    },
  },
  message: null,
  requestId: null,
  userRole: null,
};

export const reducer = (state: WidgetStateType, action: WidgetActionType): WidgetStateType | undefined => {
  //console.log(action.type, state, action);
  switch (action.type) {
    case 'UPDATE_GLOBAL_MESSAGE': {
      state.message = action.payload;
      return;
    }

    case 'UPDATE_PAGINATION': {
      state.table.pagination = { ...state.table.pagination, ...action.payload };
      return;
    }

    case 'UPDATE_REQUEST_ID': {
      state.requestId = action.payload;
      return;
    }

    case 'UPDATE_USER_ROLE': {
      state.userRole = action.payload;
      return;
    }

    default:
      throw new Error(`this action type is not supported => ${action['type']}`);
  }
};
