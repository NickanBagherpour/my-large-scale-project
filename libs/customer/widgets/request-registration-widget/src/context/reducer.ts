import { FormFieldsType } from '../types';
import { INITIAL_PAGE, INITIAL_ROW_PER_PAGE } from '../utils/consts';
import { WidgetActionType, WidgetStateType, OrganizationDefineStepType, RepresentativeDefineStepType } from './types';
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
  organizationDefineStepDisabledSubmit: true,
  organizationDefineStep: {
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
  representativeDefineStep: {
    persian_name: undefined,
    mobile_number: undefined,
    phone_number: undefined,
    technical_persian_name: undefined,
    technical_mobile_number: undefined,
    technical_Phone_number: undefined,
    clientKey: undefined,
  },
  serviceSelectStep: { table: [] },
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

    case 'UPDATE_ORGANIZATION_DEFINE_STEP_FORM': {
      state.organizationDefineStep = { ...action.payload } as OrganizationDefineStepType;
      state.organizationDefineStepDisabledSubmit = false;
      return;
    }
    case 'UPDATE_ORGANIZATION_ID_AND_SUBMISSION_ID': {
      state.organizationId = action.payload.organization.id;
      state.submissionId = action.payload.submissionId;
      return;
    }
    case 'UPDATE_REPRESENTATIVE_DEFINE_STEP': {
      state.representativeDefineStep = { ...action.payload } as RepresentativeDefineStepType;
      return;
    }

    case 'UPDATE_SERVICE_SELECT_STEP_TABLE': {
      // Check if the id exists in the table
      const exists = state.serviceSelectStep.table.some((item) => item.id === action.payload.id);

      // If it doesn't exist, add the new item
      if (!exists) {
        return {
          ...state,
          serviceSelectStep: {
            ...state.serviceSelectStep,
            table: [...state.serviceSelectStep.table, { ...action.payload }],
          },
        };
      }

      // If it exists, return the state unchanged
      return state;
    }

    case 'UPDATE_SERVICE_SELECT_STEP_TABLE_AFTER_DELETE': {
      const updatedTable = state.serviceSelectStep.table.filter((item) => {
        return item.id !== action.payload.service.serviceId;
      });
      return {
        ...state,
        serviceSelectStep: {
          ...state.serviceSelectStep,
          table: updatedTable, // Update the table with the filtered array
        },
      };
    }

    case 'UPDATE_ALL_STATE_FROM_DRAFTS': {
      state.organizationDefineStep.aggregator_status = action.payload.isAggregator
        ? 'isAggregator'
        : action.payload.aggregatorId
        ? 'hasAggregator'
        : 'nothing';
      state.organizationDefineStep.aggregator_value = action.payload.organization.aggregatorId;
      state.organizationDefineStep.legal_person_name = action.payload.organization.legalName;
      state.organizationDefineStep.legal_person_type = action.payload.organization.legalType === 'PUBLIC' ? '1' : '2';
      state.organizationDefineStep.registration_number = action.payload.organization.registerNo;
      state.organizationDefineStep.registration_date = dayjs(action.payload.organization.registerDate).calendar(
        'gregory'
      );

      state.organizationDefineStep.national_id = action.payload.organization.organizationNationalId;
      state.organizationDefineStep.economy_code = action.payload.organization.economicCode;
      state.organizationDefineStep.activity_field = action.payload.organization.activityIndustry;
      state.organizationDefineStep.postal_code = action.payload.organization.postalCode;
      state.organizationDefineStep.phone = action.payload.organization.phone;
      state.organizationDefineStep.last_registration_address = action.payload.organization.registeredAddress;
      state.organizationId = action.payload.organization.id;
      state.submissionId = action.payload.submissionInfoDto.submissionId;
      state.requestMode = 'registerOrganization';
      state.organizationDefineStepDisabledSubmit = false;
      state.representativeDefineStep.persian_name = action.payload.representativeSet[0]?.nameAndLastName;
      state.representativeDefineStep.mobile_number = action.payload.representativeSet[0]?.mobileNumber;
      state.representativeDefineStep.phone_number = action.payload.representativeSet[0]?.fixedPhoneNumber;
      state.representativeDefineStep.technical_persian_name = action.payload.representativeSet[1]?.nameAndLastName;
      state.representativeDefineStep.technical_mobile_number = action.payload.representativeSet[1]?.mobileNumber;
      state.representativeDefineStep.technical_Phone_number = action.payload.representativeSet[1]?.fixedPhoneNumber;
      state.serviceSelectStep.table = action.payload.services;
      return;
    }

    case 'UPDATE_REQUEST_MODE':
      return void (state.requestMode = action.payload);

    case 'UPDATE_STATUS': {
      state.organizationDefineStep.aggregator_status = action.payload;
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
