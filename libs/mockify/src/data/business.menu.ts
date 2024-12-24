import { ROUTES } from '@oxygen/utils';

export const menus = [
  {
    id: 1,
    title: 'داشبورد',
    order: 1,
    href: ROUTES.BUSINESS.PROFILE,
    icon: 'icon-grid',
    active: true,
    description: null,
    parentId: null,
    children: [],
  },
  {
    id: 2,
    title: 'مدیریت درخواست ها',
    order: 2,
    href: ROUTES.BUSINESS.REQUEST_LIST,
    icon: 'icon-cloud-2',
    active: true,
    description: null,
    parentId: null,
    children: [],
  },
];
