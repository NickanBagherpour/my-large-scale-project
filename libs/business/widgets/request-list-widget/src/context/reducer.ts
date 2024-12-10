import { WidgetActionType, WidgetStateType } from './types';
import { INITIAL_PAGE, INITIAL_ROW_PER_PAGE } from '../utils/consts';

export const initialStateValue: WidgetStateType = {
  status: 'all',
  searchTerm: '',
  sort: 'newest',
  pagination: {
    page: INITIAL_PAGE,
    rowsPerPage: INITIAL_ROW_PER_PAGE,
  },
  message: null,
};

export const reducer = (state: WidgetStateType, action: WidgetActionType): WidgetStateType | undefined => {
  switch (action.type) {
    case 'UPDATE_GLOBAL_MESSAGE': {
      return void (state.message = action.payload);
    }

    case 'UPDATE_SORT': {
      state.pagination.page = initialStateValue['page'];
      state.sort = action.payload;
      return;
    }

    case 'UPDATE_STATUS': {
      state.pagination.page = initialStateValue['page'];
      state.status = action.payload;
      return;
    }

    case 'UPDATE_SEARCH_TERM': {
      state.pagination.page = initialStateValue['page'];
      state.searchTerm = action.payload;
      return;
    }

    case 'UPDATE_PAGINATION': {
      return void state.pagination.page++;
    }

    default:
      throw new Error(`this action type is not supported => ${action['type']}`);
  }
};
