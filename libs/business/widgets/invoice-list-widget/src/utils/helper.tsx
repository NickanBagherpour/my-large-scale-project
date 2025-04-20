import { notFound } from 'next/navigation';

import { ALL_STATUS_LIST, BusinessUserRole, StatusBadge } from './consts';

import { Status, UserRoleType } from '../types/common-types';

import { updateStatus } from '../context';

import * as S from '../components/filter/filter.style';

export const handleUserRoleRedirect = (userRole: UserRoleType) => {
  const isUserRoleMissing = !userRole;

  const isValidUserRole = Object.entries(BusinessUserRole).findIndex(([key, value]) => value === userRole) !== -1;

  if (isUserRoleMissing || !isValidUserRole) {
    return notFound();
  }
};

export const prepareInvoiceListParams = (item, userRole, filters) => {
  const { searchTerm, page, rowsPerPage, status, sort } = item;
  const isCommercialBanking = userRole === BusinessUserRole.BUSINESS_ADMIN;

  const reqObj: any = {};

  reqObj.role = userRole;

  if (searchTerm) {
    reqObj.searchTerm = searchTerm;
  }

  if (page) {
    reqObj.page = page - 1;
  }

  if (rowsPerPage) {
    reqObj.size = rowsPerPage;
  }

  if (status) {
    const filteredStatus = status.filter((item) => item !== null);

    reqObj.status = filteredStatus.join(',') || 1;
    // if (filteredStatus.length) {
    // if (isCommercialBanking) {
    //   // reqObj.submissionStatusCodeList = filteredStatus[filteredStatus.length - 1];
    //   reqObj.submissionStatusCodeList = filteredStatus.join(',');
    // } else {
    //   // reqObj.searchStatusList = filteredStatus[filteredStatus.length - 1];
    //   reqObj.searchStatusList = filteredStatus.join(',');
    // }
    // }
  }

  if (sort) {
    reqObj.sort = 'createDate,' + (sort === 'ascending' ? 'DESC' : 'ASC');
  }
  if (filters) {
    reqObj.filters = filters;
  }
  console.log('reqObj, filters', reqObj, filters);

  return reqObj;
};

export const getChipProps = (statusArray: Status[], chipStatus: Status | Status[]) => {
  // console.log('chipStatus, statusArray',chipStatus, statusArray);
  const isActive = Array.isArray(chipStatus)
    ? chipStatus.every((status) => statusArray.includes(status))
    : statusArray.includes(chipStatus);
  return isActive ? ({ type: 'active', iconProp: 'checked icon-checkmark' } as const) : ({ type: 'unActive' } as const);
};

export const renderChips = (userRole: string, status: Status, dispatch: any, t: any) => {
  const ALL_STATUS = ALL_STATUS_LIST;
  const chips = [
    { key: StatusBadge.UNDER_REVIEW_COMMERCIAL_BANK, label: t('chips.pend_bank') },
    { key: StatusBadge.UNDER_REVIEW_BUSINESS_UNIT, label: t('chips.pend_business') },
    { key: StatusBadge.ISSUED, label: t('chips.issued') },
    { key: StatusBadge.DELETED, label: t('chips.deleted') },
  ];

  return (
    <S.Chips>
      <S.Chip {...getChipProps(status, ALL_STATUS)} onClick={() => updateStatus(dispatch, ALL_STATUS)}>
        {t('chips.all_clients')}
      </S.Chip>

      <S.Divider type='vertical' />
      {chips.map(({ key, label }) => (
        <S.Chip {...getChipProps(status, key)} onClick={() => updateStatus(dispatch, key)} key={key}>
          {label}
        </S.Chip>
      ))}
    </S.Chips>
  );
};
