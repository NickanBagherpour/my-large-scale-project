import { FormFieldsType, initialActiveSelectType, initialFallbackSelectType } from './types';
import { INITIAL_PAGE, INITIAL_ROW_PER_PAGE, RADIO_GROUP_NAME } from '../utils/consts';
import { WidgetActionType, WidgetStateType } from './types';
import { t } from 'i18next';

const initialFilters: FormFieldsType = {
  name: null,
};
const initialActiveSelect: initialActiveSelectType = {
  id: null,
  isInitialized: true,
  cardId: undefined,
};
const fallBackServers = [];
const initialfallbackSelect: initialFallbackSelectType = {
  englishName: undefined,
  persianName: undefined,
  servers: fallBackServers,
};

export const initialStateValue: WidgetStateType = {
  upstreamTab: {
    radioValue: RADIO_GROUP_NAME.SELECT,
    activeSelect: initialActiveSelect,
    fallbackSelect: initialfallbackSelect,
  },
  table: {
    filters: initialFilters,
    submit: initialFilters,
    pagination: {
      rowsPerPage: INITIAL_ROW_PER_PAGE,
      page: INITIAL_PAGE,
    },
  },
  scopeMode: 'importFromSso',
  addScope: { scopeName: '', persianScopeName: '' },
  message: null,
};

export const reducer = (state: WidgetStateType, action: WidgetActionType): WidgetStateType | undefined => {
  //console.log(action.type, state, action);
  switch (action.type) {
    case 'UPDATE_GLOBAL_MESSAGE': {
      return void (state.message = action.payload);
    }

    case 'UPDATE_RADIO_VALUE': {
      state.upstreamTab.radioValue = action.payload;
      return;
    }
    case 'UPDATE_ENGLISH_NAME': {
      state.upstreamTab.fallbackSelect.englishName = action.payload;
      return;
    }
    case 'FILTERED_FALLBACK_SERVER': {
      state.upstreamTab.fallbackSelect.servers = action.payload;
      return;
    }
    case 'UPDATE_FALLBACK_SERVERS': {
      state.upstreamTab.fallbackSelect.servers = [...state.upstreamTab.fallbackSelect.servers, action.payload];
      return;
    }
    case 'UPDATE_PERSIAN_NAME': {
      state.upstreamTab.fallbackSelect.persianName = action.payload;
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
