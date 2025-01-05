import { getValueOrDash } from '@oxygen/utils';

import { Representative, SubmissionDetailType } from '../types';

import * as S from '../components/details-collapse/details-collapse.style';

export const getSubmissionInfo = (
  submissionInfoDto: SubmissionDetailType['submissionInfoDto'],
  representativeName: string,
  t
) => {
  return [
    {
      key: t('organization_name'),
      value: getValueOrDash(submissionInfoDto?.organizationName),
    },
    {
      key: t('client_name'),
      value: getValueOrDash(submissionInfoDto?.clientName),
    },
    {
      key: t('register_date'),
      value: getValueOrDash(submissionInfoDto?.createDate),
    },
    {
      key: t('organization_representative_name'),
      value: getValueOrDash(representativeName),
    },
  ];
};

export const getOrganizationInfo = (organization: SubmissionDetailType['organization'], t) => {
  return [
    {
      key: t('legal_name'),
      value: getValueOrDash(organization?.legalName),
    },
    {
      key: t('national_id'),
      value: getValueOrDash(organization?.organizationNationalId),
    },
    {
      key: t('legal_type'),
      value: getValueOrDash(organization?.legalType.title),
    },
    {
      key: t('register_no'),
      value: getValueOrDash(organization?.registerNo),
    },
    {
      key: t('register_date'),
      value: getValueOrDash(organization?.registerDate),
    },
    {
      key: t('activity_industry'),
      value: getValueOrDash(organization?.activityIndustry),
    },
    {
      key: t('economic_code'),
      value: getValueOrDash(organization?.economicCode),
    },
    {
      key: t('aggregator_status'),
      value: getValueOrDash(
        `${t(organization?.isAggregator ? 'has_aggregator' : 'dont_have_aggregator')}${
          organization?.aggregatorName ? getValueOrDash(organization?.aggregatorName) : ''
        }`
      ),
    },
    {
      fullwidth: true,
      key: '',
      value: <S.StyledDivider />,
    },
    {
      key: t('registered_address'),
      value: getValueOrDash(organization?.registeredAddress),
    },
    {
      key: t('postal_code'),
      value: getValueOrDash(organization?.postalCode),
    },
    {
      key: t('phone'),
      value: getValueOrDash(organization?.phone),
    },
  ];
};

// export const getRepresentativeInfo = (representativeSet: SubmissionDetailType['representativeSet'], t) => {
//   if (!representativeSet || representativeSet.length ===0) {
//     return [];
//   }
//
//   return [
//     {
//       key: t('representative_name'),
//       value: getValueOrDash(representativeSet[0]?.name),
//     },
//     {
//       key: t('mobile_number'),
//       value: getValueOrDash(representativeSet[0]?.mobileNumber),
//     },
//     {
//       key: t('fixed_phone'),
//       value: getValueOrDash(representativeSet[0]?.fixedPhone),
//     },
//     {
//       fullwidth: true,
//       key: '',
//       value: '',
//     },
//     {
//       key: t('technical_representative_name'),
//       value: getValueOrDash(representativeSet[1]?.name),
//     },
//     {
//       key: t('mobile_number'),
//       value: getValueOrDash(representativeSet[1]?.mobileNumber),
//     },
//     {
//       key: t('fixed_phone'),
//       value: getValueOrDash(representativeSet[1]?.fixedPhone),
//     },
//   ];
// };

export const getRepresentativeInfo = (representativeSet, t) => {
  if (!representativeSet || representativeSet.length === 0) {
    return [];
  }

  // Sort representatives so that the one with type === 1 comes first
  representativeSet.sort((a, b) => a.type - b.type);

  // Map the sorted representatives to their respective details
  const infoItems = representativeSet
    .map((rep, index) => {
      const details: any = [
        {
          key: t(rep.type === 2 ? 'technical_representative_name' : 'representative_name'),
          value: getValueOrDash(rep.name),
        },
        {
          key: t('mobile_number'),
          value: getValueOrDash(rep.mobileNumber),
        },
        {
          key: t('fixed_phone'),
          value: getValueOrDash(rep.fixedPhone),
        },
      ];

      // If this is not the last representative, add a fullwidth separator
      if (index < representativeSet.length - 1) {
        details.push({
          fullwidth: true,
          key: '',
          value: '',
        });
      }

      return details;
    })
    .flat(); // Flatten the array of arrays to a single array

  return infoItems;
};
