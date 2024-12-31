import { FormFieldsType } from '../types';
import { INITIAL_PAGE, INITIAL_ROW_PER_PAGE } from '../utils/consts';
import { WidgetActionType, WidgetStateType } from './types';

const initialFilters: FormFieldsType = {
  name: null,
  code: null,
};

export const initialStateValue: WidgetStateType = {
  status: 'all',
  searchTerm: '',
  page: 1,
  sort: 'newest',
  message: null,
};

export const reducer = (state: WidgetStateType, action: WidgetActionType): WidgetStateType | undefined => {
  //console.log(action.type, state, action);
  switch (action.type) {
    case 'UPDATE_GLOBAL_MESSAGE': {
      return void (state.message = action.payload);
    }

    case 'UPDATE_SORT': {
      state.page = initialStateValue['page'];
      state.sort = action.payload;
      return;
    }

    case 'UPDATE_STATUS': {
      state.page = initialStateValue['page'];
      state.status = action.payload;
      return;
    }

    case 'UPDATE_SEARCH_TERM': {
      state.page = initialStateValue['page'];
      state.searchTerm = action.payload;
      return;
    }

    case 'UPDATE_PAGINATION': {
      return void state.page++;
    }

    default:
      throw new Error(`this action type is not supported => ${action['type']}`);
  }
};
