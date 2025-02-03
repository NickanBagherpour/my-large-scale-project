import { WidgetActionType, WidgetStateType } from './types';
import { INITIAL_PAGE, INITIAL_ROW_PER_PAGE } from '../utils/consts';

export const initialStateValue: WidgetStateType = {
  table: {
    pagination: {
      rowsPerPage: INITIAL_ROW_PER_PAGE,
      page: INITIAL_PAGE,
    },
  },
  message: null,
  searchField: null,
  sort: 'createDate,CDESC',
  errorMessage: null,
};

export const reducer = (state: WidgetStateType, action: WidgetActionType): WidgetStateType | undefined => {
  // console.log(action.type, state, action);
  switch (action.type) {
    case 'UPDATE_GLOBAL_MESSAGE': {
      state.message = action.payload;
      return;
    }

    case 'UPDATE_ERROR_MESSAGE': {
      state.errorMessage = action.payload;
      return;
    }

    case 'UPDATE_SEARCH_TERM': {
      state.searchField = action.payload;
      return;
    }

    case 'UPDATE_PAGINATION': {
      state.table.pagination = { ...state.table.pagination, ...action.payload };
      return;
    }

    default:
      throw new Error(`this action type is not supported => ${action['type']}`);
  }
};
