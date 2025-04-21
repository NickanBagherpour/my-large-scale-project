import { WidgetActionType, WidgetStateType } from './types';

export const initialStateValue: WidgetStateType = {
  page: 1,
  size: 5,
  sort: 'newest',
  clientType: 'all',
  searchTerm: '',
  month: 0,
  year: 0,
  message: null,
};

export const reducer = (state: WidgetStateType, action: WidgetActionType): WidgetStateType | undefined => {
  function resetPagination() {
    state.page = initialStateValue['page'];
    state.size = initialStateValue['size'];
  }

  switch (action.type) {
    case 'UPDATE_GLOBAL_MESSAGE':
      return void (state.message = action.payload);

    case 'UPDATE_SORT': {
      state.sort = action.payload;
      resetPagination();
      break;
    }

    case 'UPDATE_CLIENT_TYPE': {
      resetPagination();
      state.clientType = action.payload;
      break;
    }

    case 'UPDATE_SEARCH_TERM': {
      resetPagination();
      state.searchTerm = action.payload;
      break;
    }

    case 'UPDATE_MONTH_FILTER': {
      resetPagination();
      state.month = action.payload;
      break;
    }

    case 'UPDATE_YEAR_FILTER': {
      resetPagination();
      state.year = action.payload;
      break;
    }

    case 'UPDATE_PAGINATION': {
      const { size, page } = action.payload;
      state.size = size;
      state.page = page;
      return;
    }

    default:
      throw new Error(`this action type is not supported => ${action['type']}`);
  }
};
