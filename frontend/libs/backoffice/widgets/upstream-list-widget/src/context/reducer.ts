import { WidgetActionType, WidgetStateType } from './types';

export const initialStateValue: WidgetStateType = {
  searchTerm: '',
  page: 1,
  errorMessage: null,
};

export const reducer = (state: WidgetStateType, action: WidgetActionType): WidgetStateType | undefined => {
  //console.log(action.type, state, action);
  switch (action.type) {
    case 'UPDATE_GLOBAL_ERROR_MESSAGE': {
      state.errorMessage = action.payload;
      return;
    }

    case 'UPDATE_SEARCH_TERM': {
      state.page = initialStateValue['page'];
      state.searchTerm = action.payload;
      return;
    }

    case 'UPDATE_PAGINATION': {
      state.page++;
      return;
    }

    default:
      throw new Error(`this action type is not supported => ${action['type']}`);
  }
};
