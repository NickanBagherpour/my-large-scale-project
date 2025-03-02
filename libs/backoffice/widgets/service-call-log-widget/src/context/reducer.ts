import { INITIAL_PAGE, INITIAL_ROW_PER_PAGE } from '../utils/consts';
import { WidgetActionType, WidgetStateType } from './types';

export const initialStateValue: WidgetStateType = {
  status: null,
  searchTerm: null,
  page: 1,
  sort: 'ascending',
  table: {
    filters: {},
    submit: {},
    pagination: {
      rowsPerPage: INITIAL_ROW_PER_PAGE,
      page: INITIAL_PAGE,
    },
  },
  message: null,
  filters: undefined,
};

export const reducer = (state: WidgetStateType, action: WidgetActionType): WidgetStateType | undefined => {
  switch (action.type) {
    case 'UPDATE_GLOBAL_MESSAGE': {
      return void (state.message = action.payload);
    }

    case 'UPDATE_SORT': {
      state.table.pagination.page = initialStateValue['page'];
      state.sort = action.payload;
      return;
    }

    case 'UPDATE_STATUS': {
      state.table.pagination.page = initialStateValue['page'];
      state.status = action.payload;
      return;
    }

    case 'UPDATE_SEARCH_TERM': {
      state.table.pagination.page = initialStateValue['page'];
      state.table.filters = action.payload;
      console.log(action.payload, 'action.payloadaction.payload');

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
