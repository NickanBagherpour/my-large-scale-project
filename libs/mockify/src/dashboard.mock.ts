import { allocatedSecurities, customerInquiry, generalData } from './data/dashboard.data';

export const getDashboardCustomerInquiry = async (): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const response = {
        data: customerInquiry,
      };

      resolve(response);
    }, 500);
  });
};

export const getDashboardAllocatedSecurities = async (): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const response = {
        data: allocatedSecurities,
      };

      resolve(response);
    }, 800);
  });
};

export const getDashboardGeneralData = async (): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const response = {
        data: generalData,
      };

      resolve(response);
    }, 800);
  });
};
