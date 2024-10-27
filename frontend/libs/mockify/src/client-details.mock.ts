import { clientInfo } from './data/client-info.details.data';

export const getClientInfo = async () => {
  return new Promise<{ data: typeof clientInfo }>((resolve) => {
    setTimeout(() => {
      resolve({ data: clientInfo });
    }, 700);
  });
};
