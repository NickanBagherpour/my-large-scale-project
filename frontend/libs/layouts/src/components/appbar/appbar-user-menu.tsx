import { MenuProps } from 'antd';
import { useTr } from '@oxygen/translation';

import * as S from './appbar-user-menu.style';
import { cssVar } from '@oxygen/utils';
import {
  ArrowDown,
  Button,
  InputPassword,
  LocaleSwitcher,
  PencilSquare,
  SignOut,
  ThemeSwitch,
  UserProfile,
} from '@oxygen/ui-kit';

enum MenuItemKey {
  ChangeLanguage = 'changeLanguage',
  BackgroundColor = 'backgroundColor',
  Divider = 'divider',
  ChangePassword = 'changePassword',
  Username = 'username',
  Logout = 'logout',
  EditInfo = 'editInfo',
}
export default function AppbarUserMenu({ userInfo, onLogout, isMobileOrTablet }) {
  const [t] = useTr();

  const isDevelopment = process.env.NODE_ENV === 'development';

  const handleClose = () => {
    onLogout();
  };

  const items: MenuProps['items'] = [
    {
      label: (
        <S.StyleSpan>
          <div className='menu-header'>
            <p className='menu-p'>{userInfo.userName}</p>
            <span className='menu-span'>{userInfo.userRole}</span>
          </div>
          <S.styleDivider />
        </S.StyleSpan>
      ),
      key: MenuItemKey.Username,
      disabled: true,
    },
    ...(isDevelopment
      ? [
          {
            label: (
              <S.styleDiv>
                {t('appbar.change_language')}
                <LocaleSwitcher type='textPrimary' />
              </S.styleDiv>
            ),
            key: MenuItemKey.ChangeLanguage,
          },
          {
            label: (
              <S.styleDiv>
                {t('appbar.background_color')}
                <ThemeSwitch />
              </S.styleDiv>
            ),
            key: MenuItemKey.BackgroundColor,
          },
        ]
      : []),
    {
      label: `${t('appbar.edit_info')}`,
      icon: <PencilSquare />,
      key: MenuItemKey.EditInfo,
    },
    {
      label: `${t('appbar.change_password')}`,
      icon: <InputPassword />,
      key: MenuItemKey.ChangePassword,
    },
    {
      label: <span onClick={handleClose}>{t('appbar.logout')}</span>,
      icon: <SignOut />,
      key: MenuItemKey.Logout,
      danger: true,
    },
  ];
  return (
    <S.StyleDropDown
      menu={{ items }}
      trigger={['click']}
      placement='bottomLeft'
      overlayStyle={{ zIndex: `var(${cssVar.onAppbarZIndex})` }}
    >
      {isMobileOrTablet ? (
        <Button type='text' shape='circle' icon={<S.styleIcon className={'icon-three-dots-vertical'}></S.styleIcon>} />
      ) : (
        <S.StyleParagraph onClick={(e) => e.preventDefault()}>
          <UserProfile />
          {userInfo.userName}
          <ArrowDown />
        </S.StyleParagraph>
      )}
    </S.StyleDropDown>
  );
}
