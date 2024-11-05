export const clientCreationTable = async (params): Promise<any> => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      const response = {
        data: {
          serviceName: 'samat-lc-gutr-del',
          persianName: 'دریافت کد‌های ملی متعلق به یک شماره موبایل',
          scope: 'svc-mgmt-iban-inq',
          url: 'localhost:3000/services',
          version: 'V 1.1',
          status: 'status',
          details: 'details',
          remove: 'remove',
        },
      };
      resolve(response);
      // reject({error: 'error'});
    }, 2500);
  });
};
