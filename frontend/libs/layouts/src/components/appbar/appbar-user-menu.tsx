import React from 'react';

import { Divider, MenuProps, Space } from 'antd';

import * as S from './appbar-user-menu.style';
import { cssVar } from '@oxygen/utils';
import { ArrowDown, InputPassword, PencilSquare, SignOut, UserProfile } from '@oxygen/ui-kit';

export default function AppbarUserMenu({ userName, onLogout }) {
  const handleclose = () => {
    onLogout();
  };

  const items: MenuProps['items'] = [
    {
      label: <S.StyleSpan>{userName}</S.StyleSpan>,
      key: '0',
    },
    {
      type: 'divider',
    },
    {
      label: 'ویرایش مشخصات ',
      icon: <PencilSquare />,
      key: '1',
    },
    {
      label: 'تغییر رمز عبور',
      icon: <InputPassword />,
      key: '2',
    },

    {
      label: <S.StyleSpan onClick={handleclose}>خروج از حساب کاربری</S.StyleSpan>,
      icon: <SignOut />,
      key: '4',
      danger: true,
    },
  ];
  return (
    <S.StyleDropDown
      menu={{ items }}
      trigger={['click']}
      placement='bottomLeft'
      overlayStyle={{ zIndex: `var(${cssVar.onAppbarZIndex})` }}
      //   dropdownRender={(menu) => (
      //     <div>
      //       {React.cloneElement(menu as React.ReactElement)}
      //       <Divider style={{ margin: 0 }} />
      //       <p>علیرضا غفار</p>
      //       <span>مسئول اصلی</span>
      //     </div>
      //   )}
    >
      <S.StyleParagraph onClick={(e) => e.preventDefault()}>
        <UserProfile />
        {userName}
        <ArrowDown />
      </S.StyleParagraph>
    </S.StyleDropDown>
  );
}
