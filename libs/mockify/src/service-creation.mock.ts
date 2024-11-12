import { Scope } from '@oxygen/types';
import { items } from './data/service-creation.data';

export const getScopes = async () => {
  return new Promise<{ data: Scope[] }>((resolve) => {
    setTimeout(() => {
      resolve({ data: items });
    }, 700);
  });
};
