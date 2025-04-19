import { FormFieldsType } from '../types';
import { INITIAL_PAGE, INITIAL_ROW_PER_PAGE, SORT_ORDER } from '../utils/consts';
import { SERVICE_MANAGEMENT_STATUS, WidgetActionType, WidgetStateType } from './types';

const initialFilters: FormFieldsType = {
  name: null,
  code: null,
};

export const initialStateValue: WidgetStateType = {
  searchValue: '',
  status: SERVICE_MANAGEMENT_STATUS.ALL,
  sort: SORT_ORDER.ASCENDING,
  table: {
    filters: initialFilters,
    submit: initialFilters,
    pagination: {
      size: INITIAL_ROW_PER_PAGE,
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
    case 'UPDATE_STATUS': {
      state.table.pagination.page = initialStateValue.table.pagination.page;
      state.status = action.payload;
      return;
    }
    case 'UPDATE_SEARCH_VALUE': {
      state.table.pagination.page = initialStateValue.table.pagination.page;
      state.searchValue = action.payload;
      return;
    }
    case 'UPDATE_SORT': {
      state.sort = action.payload;
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
