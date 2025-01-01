import { FormFieldsType } from '../types';
import { INITIAL_PAGE, INITIAL_ROW_PER_PAGE } from '../utils/consts';
import { WidgetActionType, WidgetStateType, FirstStepType, SecondStepType } from './types';

const initialFilters: FormFieldsType = {
  name: null,
  code: null,
};

export const initialStateValue: WidgetStateType = {
  status: undefined,
  searchTerm: '',
  page: 0,
  size: 100,
  sort: 'newest',
  requestMode: 'selectOrganization',
  organizationId: '',
  submissionId: '',
  firstStepDisabledSubmit: true,
  firstStep: {
    aggregator_status: 'nothing',
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
  secondStep: {
    persian_name: undefined,
    mobile_number: undefined,
    phone_number: undefined,
    technical_persian_name: undefined,
    technical_mobile_number: undefined,
    technical_Phone_number: undefined,
    clientKey: undefined,
  },
  thirdStep: { table: [] },
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
  switch (action.type) {
    case 'UPDATE_GLOBAL_MESSAGE': {
      state.message = action.payload;
      return;
    }

    case 'UPDATE_FIRST_STEP_FORM': {
      state.firstStep = { ...action.payload } as FirstStepType;
      state.firstStepDisabledSubmit = false;
      return;
    }
    case 'UPDATE_ORGANIZATION_ID_AND_SUBMISSION_ID': {
      state.organizationId = action.payload.organization.id;
      state.submissionId = action.payload.submissionId;
      return;
    }
    case 'UPDATE_SECOND_STEP': {
      state.secondStep = { ...action.payload } as SecondStepType;
      return;
    }

    case 'UPDATE_THIRD_STEP_TABLE': {
      // Check if the id exists in the table
      const exists = state.thirdStep.table.some((item) => item.id === action.payload.id);

      // If it doesn't exist, add the new item
      if (!exists) {
        return {
          ...state,
          thirdStep: {
            ...state.thirdStep,
            table: [...state.thirdStep.table, { ...action.payload }],
          },
        };
      }

      // If it exists, return the state unchanged
      return state;
    }

    case 'UPDATE_THIRD_STEP_TABLE_AFTER_DELETE': {
      const updatedTable = state.thirdStep.table.filter((item) => {
        return item.id !== action.payload.service.serviceId;
      });
      return {
        ...state,
        thirdStep: {
          ...state.thirdStep,
          table: updatedTable, // Update the table with the filtered array
        },
      };
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
