import { notFound } from 'next/navigation';
import { BusinessUserRole } from './consts';
import { UserRoleType } from '../types/common-types';

export const handleUserRoleRedirect = (userRole: UserRoleType) => {
  const isUserRoleMissing = !userRole;

  const isValidUserRole = userRole === BusinessUserRole.BUSINESS_ADMIN;

  if (isUserRoleMissing || !isValidUserRole) {
    return notFound();
  }
};
