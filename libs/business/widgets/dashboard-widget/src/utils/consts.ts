import { UserRole } from '@oxygen/types';

export const AVAILABLE_ROWS_PER_PAGE = [5, 10, 25, 50, 100];
export const INITIAL_ROW_PER_PAGE = AVAILABLE_ROWS_PER_PAGE[0];
export const INITIAL_PAGE = 1;

export const reportUrlList = {
  [UserRole.BUSINESS_ADMIN]: 'http://uat.metabase.oxygenpro.ir/public/dashboard/33f1b81d-a9c6-4bd4-85c0-c1d7a743c980',

  [UserRole.COMMERCIAL_BANKING_ADMIN]:
    'http://uat.metabase.oxygenpro.ir/public/dashboard/925a1159-ae21-406a-82ce-0278bdb311d9',
};
