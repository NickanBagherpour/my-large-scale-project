import { BusinessUserRole } from './consts';
import { notFound } from 'next/navigation';

export const handleUserRoleRedirect = (userRole: string) => {
  const isUserRoleMissing = !userRole;

  const isValidUserRole = Object.entries(BusinessUserRole).findIndex(([key, value]) => value === userRole) !== -1;

  if (isUserRoleMissing || !isValidUserRole) {
    // return;
    // notFound()
  }
};

export const prepareRequestListParams = (item) => {
  const { searchTerm, page, rowsPerPage, status, sort } = item;

  const reqObj: any = {};

  if (searchTerm) {
    reqObj.orgName = searchTerm;
  }

  if (page) {
    reqObj.page = page;
  }

  if (rowsPerPage) {
    reqObj.size = rowsPerPage;
  }

  if (status) {
    reqObj.searchStatusList = status;
  }

  if (sort) {
    reqObj.sort = sort;
  }

  return reqObj;
};
