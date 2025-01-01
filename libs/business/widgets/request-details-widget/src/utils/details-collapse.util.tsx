import { getValueOrDash } from '@oxygen/utils';

import { SubmissionDetailType } from '../types';

import * as S from '../components/details-collapse/details-collapse.style';

export const getSubmissionInfo = (submissionInfoDto: SubmissionDetailType['submissionInfoDto'], t) => {
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
      key: t('representative_name'),
      value: getValueOrDash(submissionInfoDto?.representativeName),
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

export const getRepresentativeInfo = (representativeSet: SubmissionDetailType['representativeSet'], t) => {
  if (!representativeSet || representativeSet.length < 2) {
    return [];
  }

  return [
    {
      key: t('representative_name'),
      value: getValueOrDash(representativeSet[0]?.name),
    },
    {
      key: t('mobile_number'),
      value: getValueOrDash(representativeSet[0]?.mobileNumber),
    },
    {
      key: t('fixed_phone'),
      value: getValueOrDash(representativeSet[0]?.fixedPhone),
    },
    {
      fullwidth: true,
      key: '',
      value: '',
    },
    {
      key: t('technical_representative_name'),
      value: getValueOrDash(representativeSet[1]?.name),
    },
    {
      key: t('mobile_number'),
      value: getValueOrDash(representativeSet[1]?.mobileNumber),
    },
    {
      key: t('fixed_phone'),
      value: getValueOrDash(representativeSet[1]?.fixedPhone),
    },
  ];
};
