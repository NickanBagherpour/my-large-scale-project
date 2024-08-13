import { UserType } from '@oxygen-portal/types';

export const isBranchOperatorUser = (type) => type === UserType.BRANCH_OPERATOR;

export const isOperationOfficeUser = (type) => type === UserType.OPERATION_OFFICE_USER;

export const isBranchSupervisorUser = (type) => type === UserType.BRANCH_SUPERVISOR;
