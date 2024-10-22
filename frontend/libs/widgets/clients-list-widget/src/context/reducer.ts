import { WidgetActionType, WidgetStateType } from './types';

export const initialStateValue: WidgetStateType = {
  status: 'all',
  searchTerm: '',
  page: 1,
  sort: 'newest',
  errorMessage: null,
};

export const reducer = (state: WidgetStateType, action: WidgetActionType): WidgetStateType | undefined => {
  switch (action.type) {
    case 'UPDATE_GLOBAL_ERROR_MESSAGE': {
      state.errorMessage = action.payload;
      return;
    }

    case 'UPDATE_SORT': {
      return void (state.sort = action.payload);
    }

    case 'UPDATE_STATUS': {
      return void (state.status = action.payload);
    }

    case 'UPDATE_SEARCH_TERM': {
      return void (state.searchTerm = action.payload);
    }

    case 'UPDATE_PAGINATION': {
      return void state.page++;
    }

    default:
      throw new Error(`this action type is not supported => ${action['type']}`);
  }
};
