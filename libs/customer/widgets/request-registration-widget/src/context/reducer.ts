import { FormFieldsType } from '../types';
import { INITIAL_PAGE, INITIAL_ROW_PER_PAGE } from '../utils/consts';
import { WidgetActionType, WidgetStateType, FirstStepType, SecondStepType } from './types';
import { dayjs } from '@oxygen/utils';
import jalaliday from 'jalaliday';

dayjs.extend(jalaliday);

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

    case 'UPDATE_ALL_STATE_FROM_DRAFTS': {
      // debugger;
      // console.log(action.payload);
      // const jalaliDate = '1403/10/20'; // Jalali date in YYYY/MM/DD format

      // // Parse the Jalali date and convert it to a Day.js object
      // const parsedDate = dayjs(jalaliDate, { format: 'YYYY/MM/DD' });

      // console.log(parsedDate.toISOString()); // ISO string format
      // console.log(parsedDate.toDate()); // JavaScript Date object

      state.firstStep.aggregator_status = action.payload.isAggregator
        ? 'isAggregator'
        : action.payload.aggregatorId
        ? 'hasAggregator'
        : 'nothing';
      state.firstStep.aggregator_value = action.payload.organization.aggregatorId;
      state.firstStep.legal_person_name = action.payload.organization.legalName;
      state.firstStep.legal_person_type = action.payload.organization.legalType === 'PUBLIC' ? '1' : '2';
      state.firstStep.registration_number = action.payload.organization.registerNo;
      state.firstStep.registration_date = dayjs(action.payload.organization.registerDate, { format: 'YYYY/MM/DD' });
      state.firstStep.national_id = action.payload.organization.organizationNationalId;
      state.firstStep.economy_code = action.payload.organization.economicCode;
      state.firstStep.postal_code = action.payload.organization.postalCode;
      state.firstStep.phone = action.payload.organization.phone;
      state.firstStep.last_registration_address = action.payload.organization.registeredAddress;
      state.organizationId = action.payload.organization.id;
      state.submissionId = action.payload.submissionInfoDto.submissionId;
      state.requestMode = 'registerOrganization';
      state.firstStepDisabledSubmit = false;

      // {
      //   aggregator_status: 'nothing',
      //   aggregator_value: undefined,
      //   legal_person_name: undefined,
      //   legal_person_type: undefined,
      //   registration_number: undefined,
      //   registration_date: undefined,
      //   national_id: undefined,
      //   economy_code: undefined,
      //   activity_field: undefined,
      //   postal_code: undefined,
      //   phone: undefined,
      //   last_registration_address: undefined,
      // },
      // state.submissionId = action.payload.submissionId;

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
