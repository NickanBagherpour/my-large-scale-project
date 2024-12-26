import { ReactNode } from 'react';

export type AvatarModel = {
  image?: string;
  name?: string;
  role?: string;
  code?: string;
  branch?: string;
};

export type MenuItemModel = {
  id?: string;
  title?: string;
  order?: number;
  href?: string;
  active?: boolean;
  selected?: boolean;
  icon?: ReactNode | null;
  description?: string;
  name?: string;
  userType?: string;
  subMenus?: MenuItemModel[];
};