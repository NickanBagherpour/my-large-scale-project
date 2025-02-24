import { FormFieldsType } from '../types';
import { INITIAL_PAGE, INITIAL_ROW_PER_PAGE } from '../utils/consts';
import { WidgetActionType, WidgetStateType } from './types';

// const initialFilters: FormFieldsType = {
//   name: null,
//   code: null,
// };

export const initialStateValue: WidgetStateType = {
  searchTerm: '',
  page: 1,
  table: {
    filters: {},
    submit: {},
    pagination: {
      rowsPerPage: INITIAL_ROW_PER_PAGE,
      page: INITIAL_PAGE,
    },
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

    case 'UPDATE_SEARCH_TERM': {
      state.table.pagination.page = initialStateValue['page'];
      state.searchTerm = action.payload;
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
