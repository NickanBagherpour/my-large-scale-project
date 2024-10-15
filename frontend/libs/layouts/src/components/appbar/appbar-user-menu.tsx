import React from 'react';

import { MenuProps } from 'antd';

import * as S from './appbar-user-menu.style';
import { cssVar } from '@oxygen/utils';

export default function AppbarUserMenu() {
  const items: MenuProps['items'] = [
    {
      label: <span>1st menu item</span>,
      key: '0',
    },
    {
      label: <span>2nd menu item</span>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: '3rd menu item（disabled）',
      key: '3',
      disabled: true,
    },
  ];
  return (
    <S.StyleDropDown menu={{ items }} trigger={['click']} overlayStyle={{ zIndex: `var(${cssVar.onAppbarZIndex})` }}>
      <a onClick={(e) => e.preventDefault()}>
        علیرضا غفار
        {/* <DownOutlined /> */}
      </a>
    </S.StyleDropDown>
  );
}
