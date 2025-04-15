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
  switch (action.type) {
    case 'UPDATE_GLOBAL_MESSAGE':
      return void (state.message = action.payload);

    case 'UPDATE_SORT':
      return void (state.sort = action.payload);

    case 'UPDATE_CLIENT_TYPE':
      return void (state.clientType = action.payload);

    case 'UPDATE_SEARCH_TERM':
      return void (state.searchTerm = action.payload);

    case 'UPDATE_MONTH_FILTER':
      return void (state.month = action.payload);

    case 'UPDATE_YEAR_FILTER':
      return void (state.year = action.payload);

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
