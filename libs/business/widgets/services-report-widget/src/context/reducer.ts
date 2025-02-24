import { INITIAL_PAGE, INITIAL_ROW_PER_PAGE, SORT_ORDER } from '../utils/consts';
import { WidgetActionType, WidgetStateType } from './types';

export const initialStateValue: WidgetStateType = {
  searchTerm: '',
  sort: SORT_ORDER.ASCENDING,
  status: 'all',
  pagination: {
    page: INITIAL_PAGE,
    rowsPerPage: INITIAL_ROW_PER_PAGE,
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

    case 'UPDATE_SORT': {
      state.sort = action.payload;
      state.pagination.page = initialStateValue.pagination.page;
      return;
    }

    case 'UPDATE_STATUS': {
      state.pagination.page = initialStateValue.pagination.page;
      state.status = action.payload;
      return;
    }

    case 'UPDATE_SEARCH_TERM': {
      state.pagination.page = initialStateValue.pagination.page;
      state.searchTerm = action.payload;
      return;
    }

    case 'UPDATE_PAGINATION': {
      state.pagination = { ...state.pagination, ...action.payload };
      return;
    }

    default:
      throw new Error(`this action type is not supported => ${action['type']}`);
  }
};
