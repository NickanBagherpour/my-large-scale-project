import { FormFieldsType, initialActiveSelectType } from './types';
import { INITIAL_PAGE, INITIAL_ROW_PER_PAGE } from '../utils/consts';
import { WidgetActionType, WidgetStateType } from './types';

const initialFilters: FormFieldsType = {
  name: null,
};

const initialActiveSelect: initialActiveSelectType = {
  id: null,
  isInitialized: true,
  cardId: undefined,
};

export const initialStateValue: WidgetStateType = {
  serviceName: undefined,
  upstreamTab: {
    activeSelect: initialActiveSelect,
  },
  scopeTab: {
    activeSelect: initialActiveSelect,
  },
  scopeName: undefined,
  table: {
    filters: initialFilters,
    submit: initialFilters,
    pagination: {
      rowsPerPage: INITIAL_ROW_PER_PAGE,
      page: INITIAL_PAGE,
    },
  },
  scopeMode: 'importFromSso',
  message: null,
};

export const reducer = (state: WidgetStateType, action: WidgetActionType): WidgetStateType | undefined => {
  //console.log(action.type, state, action);
  switch (action.type) {
    case 'UPDATE_GLOBAL_MESSAGE': {
      return void (state.message = action.payload);
    }
    case 'UPDATE_SCOPE_NAME':
      return {
        ...state,
        scopeName: action.payload,
      };
    case 'CLEAR_SCOPE':
      return {
        ...state,
        scopeName: null, // Or `undefined` depending on your preference
      };
    case 'UPDATE_SERVICE_NAME': {
      state.serviceName = action.payload;
      return;
    }
    case 'UPDATE_UPSTREAM': {
      state.upstreamTab.activeSelect = { ...state.upstreamTab.activeSelect, ...action.payload };
      return;
    }
    case 'UPDATE_UPSTREAM_TAB_CREATION': {
      return void ((state.upstreamTab.activeSelect.isInitialized = true),
      (state.upstreamTab.activeSelect.id = state.upstreamTab.activeSelect.cardId),
      (state.upstreamTab.activeSelect.cardId = undefined));
    }
    case 'UPDATE_SCOPE_TAB_CREATION': {
      return void ((state.scopeTab.activeSelect.isInitialized = true),
      (state.scopeTab.activeSelect.id = state.scopeTab.activeSelect.cardId),
      (state.scopeTab.activeSelect.cardId = undefined));
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

    case 'UPDATE_SCOPE_MODE':
      return void (state.scopeMode = action.payload);

    default:
      throw new Error(`this action type is not supported => ${action['type']}`);
  }
};
