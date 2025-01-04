import { notFound } from 'next/navigation';

import { ALL_STATUS_LIST, BUSINESS_STATUS_LIST, BusinessUserRole, COMMERCIAL_STATUS_LIST } from './consts';

import { Status, UserRoleType } from '../types/common-types';

import * as S from '../components/filter/filter.style';
import { updateStatus } from '../context';

export const handleUserRoleRedirect = (userRole: UserRoleType) => {
  const isUserRoleMissing = !userRole;

  const isValidUserRole = Object.entries(BusinessUserRole).findIndex(([key, value]) => value === userRole) !== -1;

  if (isUserRoleMissing || !isValidUserRole) {
    notFound();
  }
};

//prepareRequestListParams
export const prepareRequestListParams = (item, userRole) => {
  const { searchTerm, page, rowsPerPage, status, sort } = item;
  const isCommercialBanking = userRole === BusinessUserRole.BUSINESS_ADMIN;

  const reqObj: any = {};

  reqObj.role = userRole;

  if (searchTerm) {
    reqObj.orgName = searchTerm;
  }

  if (page) {
    reqObj.page = page - 1;
  }

  if (rowsPerPage) {
    reqObj.size = rowsPerPage;
  }

  if (status && isCommercialBanking) {
    reqObj.submissionStatusCodeList = status;
  } else {
    reqObj.searchStatusList = status;
  }

  if (sort) {
    reqObj.sort = sort;
  }

  return reqObj;
};

//getChipProps
export const getChipProps = (statusArray: Status[], chipStatus: Status | Status[]) => {
  const isActive = Array.isArray(chipStatus)
    ? chipStatus.every((status) => statusArray.includes(status))
    : statusArray.includes(chipStatus);
  return isActive ? ({ type: 'active', iconProp: 'checked icon-checkmark' } as const) : ({ type: 'unActive' } as const);
};

//renderChips
export const renderChips = (userRole: string, status: Status, dispatch: any, t: any) => {
  const isCommercialAdmin = userRole === BusinessUserRole.BUSINESS_ADMIN;

  const ALL_STATUS = ALL_STATUS_LIST;

  const businessChips = [
    { key: BUSINESS_STATUS_LIST.APPROVED, label: t('chips.initial_approval') },
    { key: BUSINESS_STATUS_LIST.REJECTED, label: t('chips.rejected') },
    { key: BUSINESS_STATUS_LIST.UNDER_REVIEW, label: t('chips.pending') },
  ];
  const commercialChips = [
    { key: COMMERCIAL_STATUS_LIST.FINAL_APPROVED, label: t('chips.final_approval') },
    { key: COMMERCIAL_STATUS_LIST.INITIAL_APPROVED, label: t('chips.initial_approval') },
    { key: COMMERCIAL_STATUS_LIST.REJECTED, label: t('chips.rejected') },
    { key: COMMERCIAL_STATUS_LIST.UNDER_REVIEW, label: t('chips.pending') },
  ];

  return (
    <S.Chips>
      <S.Chip {...getChipProps(status, ALL_STATUS)} onClick={() => updateStatus(dispatch, ALL_STATUS)}>
        {t('chips.all_clients')}
      </S.Chip>

      <S.Divider type='vertical' />

      {(isCommercialAdmin ? commercialChips : businessChips).map(({ key, label }) => (
        <S.Chip {...getChipProps(status, key)} onClick={() => updateStatus(dispatch, key)} key={key}>
          {label}
        </S.Chip>
      ))}
    </S.Chips>
  );
};
