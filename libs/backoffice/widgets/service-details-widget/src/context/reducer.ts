import { FormFieldsType, UpstreamData } from './types';
import { INITIAL_PAGE, INITIAL_ROW_PER_PAGE } from '../utils/consts';
import { WidgetActionType, WidgetStateType } from './types';
import { t } from 'i18next';

const initialFilters: FormFieldsType = {
  name: null,
};
const initialUpstreamTab: UpstreamData = {
  id: null,
  isInitialized: true,
};
export const initialStateValue: WidgetStateType = {
  upstreamTab: initialUpstreamTab,
  table: {
    filters: initialFilters,
    submit: initialFilters,
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
      return void (state.message = action.payload);
    }

    case 'UPDATE_UPSTREAM': {
      state.upstreamTab = { ...state.upstreamTab, ...action.payload };
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
