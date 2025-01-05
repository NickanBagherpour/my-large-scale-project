import { Obj } from '@oxygen/types';

export function getUserFullname(user?: Obj) {
  if (user?.name && user?.family) {
    return `${user.name} ${user.family}`;
  }

  return '-';
}
