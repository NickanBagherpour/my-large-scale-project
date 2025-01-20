import { WidgetActionType, WidgetStateType } from './types';
import { INITIAL_PAGE, INITIAL_ROW_PER_PAGE, SORT_ORDER } from '../utils/consts';

export const initialStateValue: WidgetStateType = {
  status: [null],
  searchTerm: '',
  sort: SORT_ORDER.ASCENDING,
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
      state.pagination.page = initialStateValue.pagination.page;
      state.sort = action.payload;
      return;
    }

    case 'UPDATE_STATUS': {
      state.pagination.page = initialStateValue.pagination.page;

      if (action.payload) {
        if (Array.isArray(action.payload)) {
          const isAllIncluded = action.payload.every((item) => state.status.includes(item));

          if (isAllIncluded) {
            state.status = state.status.filter((item) => !action.payload.includes(item));

            if (state.status.length === 0) {
              state.status = [null];
            }
          } else {
            state.status = [...state.status.filter((item) => item !== null), ...action.payload];
          }
        } else {
          if (state.status.includes(action.payload)) {
            state.status = state.status.filter((item) => item !== action.payload);

            if (state.status.length === 0) {
              state.status = [null];
            }
          } else {
            state.status = [...state.status.filter((item) => item !== null), action.payload];
          }
        }
      } else {
        state.status = [null];
      }

      return;
    }

    case 'UPDATE_SEARCH_TERM': {
      state.pagination.page = initialStateValue.pagination.page;
      state.searchTerm = action.payload;
      return;
    }

    case 'UPDATE_PAGINATION': {
      state.pagination = action.payload;
      return;
    }

    default:
      throw new Error(`this action type is not supported => ${action['type']}`);
  }
};
