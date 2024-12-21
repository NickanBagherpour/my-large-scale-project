import { FormFieldsType } from '../types';
import { INITIAL_PAGE, INITIAL_ROW_PER_PAGE } from '../utils/consts';
import { WidgetActionType, WidgetStateType, FirstStepType } from './types';

const initialFilters: FormFieldsType = {
  name: null,
  code: null,
};

export const initialStateValue: WidgetStateType = {
  status: undefined,
  searchTerm: '',
  page: 1,
  sort: 'newest',
  requestMode: 'selectOrganization',
  firstStep: {
    aggregator_status: undefined,
    aggregator_value: undefined,
    legal_person_name: undefined,
    legal_person_type: undefined,
    registration_number: undefined,
    registration_date: undefined,
    national_id: undefined,
    economy_code: undefined,
    activity_field: undefined,
    postal_code: undefined,
    phone: undefined,
    last_registration_address: undefined,
  },
  secondStep: { table: [] },
  table: {
    filters: initialFilters,
    submit: initialFilters,
    pagination: {
      limit: INITIAL_ROW_PER_PAGE,
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

    case 'UPDATE_FIRST_STEP_FORM': {
      state.firstStep = { ...action.payload } as FirstStepType;
      return;
    }
    case 'UPDATE_SECOND_STEP_TABLE': {
      state.secondStep.table = [...state.secondStep.table, { ...action.payload }];
      return;
    }

    case 'UPDATE_REQUEST_MODE':
      return void (state.requestMode = action.payload);

    case 'UPDATE_STATUS': {
      state.firstStep.aggregator_status = action.payload;
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
