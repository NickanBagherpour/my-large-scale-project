import { INITIAL_PAGE, INITIAL_ROW_PER_PAGE } from '../utils/consts';
import { WidgetActionType, WidgetStateType } from './types';

export const initialStateValue: WidgetStateType = {
  pagination: {
    pageSize: INITIAL_ROW_PER_PAGE,
    page: INITIAL_PAGE,
  },
  searchField: '',
  message: null,
};

export const reducer = (state: WidgetStateType, action: WidgetActionType): WidgetStateType | undefined => {
  switch (action.type) {
    case 'UPDATE_GLOBAL_MESSAGE': {
      state.message = action.payload;
      return;
    }

    case 'UPDATE_PAGINATION': {
      state.pagination = { ...state.pagination, ...action.payload };
      return;
    }

    case 'UPDATE_SEARCH_TERM': {
      state.pagination.page = initialStateValue.pagination.page;
      state.searchField = action.payload;
      return;
    }

    default:
      throw new Error(`this action type is not supported => ${action['type']}`);
  }
};
