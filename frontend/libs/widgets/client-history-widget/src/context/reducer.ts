import { INITIAL_PAGE, INITIAL_ROW_PER_PAGE } from '../utils/consts';
import { WidgetActionType, WidgetStateType } from './types';

export const initialStateValue: WidgetStateType = {
  table: {
    filters: {},
    submit: {},
    pagination: {
      limit: INITIAL_ROW_PER_PAGE,
      page: INITIAL_PAGE,
    },
  },
  errorMessage: null,
};

export const reducer = (state: WidgetStateType, action: WidgetActionType): WidgetStateType | undefined => {
  // console.log('reducer', action.type, state, action);
  switch (action.type) {
    case 'UPDATE_GLOBAL_ERROR_MESSAGE': {
      state.errorMessage = action.payload;
      return;
    }

    case 'UPDATE_SUBMIT': {
      state.table.submit = { ...state.table.submit, ...action.payload };
      return;
    }

    case 'UPDATE_FILTERS': {
      state.table.filters = { ...state.table.filters, ...action.payload };
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
