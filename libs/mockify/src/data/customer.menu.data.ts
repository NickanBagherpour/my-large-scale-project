import { ROUTES } from '@oxygen/utils';

export const menus = [
  {
    id: 1,
    title: 'داشبورد',
    order: 1,
    href: ROUTES.CUSTOMER.DASHBOARD,
    icon: 'icon-home',
    active: true,
    description: null,
    parentId: null,
    children: [],
  },
  {
    id: 2,
    title: 'مدیریت درخواست ها',
    order: 2,
    href: ROUTES.CUSTOMER.REQUESTS_MANAGEMENT,
    icon: 'icon-grid',
    active: true,
    description: null,
    parentId: null,
    children: [],
  },
];
