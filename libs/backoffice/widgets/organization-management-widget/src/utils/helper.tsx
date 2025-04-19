import dayjs from 'dayjs';
import { OrganizationParamsType } from '../types';
import { FORM_ITEMS_NAME } from './consts';

export const prepateSubmitOrganizationParams = (_values, orgNationalID) => {
  const test = FORM_ITEMS_NAME;
  const params = {
    organization: {
      legalName: _values[FORM_ITEMS_NAME.LEGAL_ENTITY_NAME],
      legalType: _values[FORM_ITEMS_NAME.LEGAL_ENTITY_TYPE],
      registerNo: _values[FORM_ITEMS_NAME.REGISTRATION_NUMBER],
      registerDate: dayjs(_values[FORM_ITEMS_NAME.REGISTRATION_DATE]).format('YYYY/MM/DD'),
      organizationNationalId: orgNationalID,
      economicCode: _values[FORM_ITEMS_NAME.ECONOMY_CODE],
      activityIndustry: _values[FORM_ITEMS_NAME.ACTIVITY_FIELD],
      postalCode: _values[FORM_ITEMS_NAME.ZIP_CODE],
      phone: _values[FORM_ITEMS_NAME.TELEPHONE],
      registeredAddress: _values[FORM_ITEMS_NAME.LAST_REGISTERED_ADDRESS],
      isAggregator: false,
      aggregatorId: null,
    },
    representative: {
      clientKey: _values[FORM_ITEMS_NAME.CLIENT_KEY.CLIENT_KEY],

      representatives: [
        {
          nameAndLastName: _values[FORM_ITEMS_NAME.REPRESENTATIVE.FIRST_AND_LAST_NAME],
          mobileNumber: _values[FORM_ITEMS_NAME.REPRESENTATIVE.MOBILE_NUMBER],
          fixedPhoneNumber: _values[FORM_ITEMS_NAME.REPRESENTATIVE.LANDLINE_NUMBER],
          representativeType: 1,
        },
        {
          nameAndLastName: _values[FORM_ITEMS_NAME.TECHNICAL_REPRESENTATIVE.FIRST_AND_LAST_NAME],
          mobileNumber: _values[FORM_ITEMS_NAME.TECHNICAL_REPRESENTATIVE.MOBILE_NUMBER],
          fixedPhoneNumber: _values[FORM_ITEMS_NAME.TECHNICAL_REPRESENTATIVE.LANDLINE_NUMBER],
          representativeType: 2,
        },
      ],
    },
  };
  return params;
};
