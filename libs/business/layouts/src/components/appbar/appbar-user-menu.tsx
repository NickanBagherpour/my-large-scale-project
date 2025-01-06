import { ReactNode } from 'react';
import { MenuProps } from 'antd';

import { useTr } from '@oxygen/translation';
import { BusinessUserRole, Nullable } from '@oxygen/types';
import { cssVar, ENV_CONSTANTS } from '@oxygen/utils';
import { Button, Icons, Loading, LocaleSwitcher, ThemeSwitch } from '@oxygen/ui-kit';

import { getUserFullname } from '../../utils/helper';
import * as S from './appbar-user-menu.style';

enum MenuItemKey {
  ChangeLanguage = 'changeLanguage',
  BackgroundColor = 'backgroundColor',
  Divider = 'divider',
  ChangePassword = 'changePassword',
  Username = 'username',
  Logout = 'logout',
  EditInfo = 'editInfo',
}

export default function AppbarUserMenu({
  variant = 'dashboard',
  userInfo,
  onLogout,
  isMobileOrTablet,
  loading = false,
}) {
  const [t] = useTr();

  const handleClose = () => {
    onLogout();
  };

  const handlePreventClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const getMenuItems = () => {
    const baseItems =
      variant === 'auth'
        ? []
        : ([
            {
              label: (
                <S.StyleSpan>
                  {loading ? (
                    <Loading size='small' />
                  ) : !userInfo ? (
                    '-'
                  ) : (
                    <div className='menu-header'>
                      <p className='menu-p'>{getUserFullname(userInfo)}</p>
                      <span className='menu-span'>{getUserRole(userInfo.role)}</span>
                    </div>
                  )}
                </S.StyleSpan>
              ),
              key: MenuItemKey.Username,
            },
            { type: 'divider' },
          ] as const);

    const devItems = ENV_CONSTANTS.IS_DEV
      ? [
          {
            label: (
              <S.StyleDiv onClick={handlePreventClick}>
                <span>{t('appbar.change_language')}</span>
                <LocaleSwitcher type='textPrimary' />
              </S.StyleDiv>
            ),
            key: MenuItemKey.ChangeLanguage,
          },
          {
            label: (
              <S.StyleDiv onClick={handlePreventClick}>
                <span>{t('appbar.background_color')}</span>
                <ThemeSwitch />
              </S.StyleDiv>
            ),
            key: MenuItemKey.BackgroundColor,
          },
        ]
      : [];

    const authVariantItems =
      variant === 'auth'
        ? []
        : [
            // {
            //   label: `${t('appbar.edit_info')}`,
            //   icon: <i className='icon-pencil-square' style={{ fontSize: '2.2rem' }} />,
            //   key: MenuItemKey.EditInfo,
            // },
            // {
            //   label: `${t('appbar.change_password')}`,
            //   icon: <i className='icon-input-password' style={{ fontSize: '2.2rem' }} />,
            //   key: MenuItemKey.ChangePassword,
            // },
            {
              label: <span onClick={handleClose}>{t('appbar.logout')}</span>,
              icon: <i className='icon-sign-out' style={{ fontSize: '2.2rem' }} />,
              key: MenuItemKey.Logout,
              danger: true,
            },
          ];

    return [...baseItems, ...devItems, ...authVariantItems];
  };

  function getUserRole(role?: Nullable<string>): ReactNode {
    switch (role) {
      case BusinessUserRole.COMMERCIAL_BANKING_ADMIN:
        return t('common.user_role.commercial_banking_admin');
      case BusinessUserRole.BUSINESS_ADMIN:
        return t('common.user_role.business_admin');
      default:
        return '-';
    }
  }

  const items: MenuProps['items'] = getMenuItems();

  return (
    <S.StyleDropDown
      menu={{ items }}
      trigger={['click']}
      placement='bottomLeft'
      overlayStyle={{ zIndex: `var(${cssVar.onAppbarZIndex})` }}
      dropdownRender={(node) => {
        return <S.Overlay>{node}</S.Overlay>;
      }}
    >
      {isMobileOrTablet ? (
        <Button
          variant='text'
          shape='circle'
          icon={<S.StyleIcon className={'icon-three-dots-vertical'}></S.StyleIcon>}
        />
      ) : (
        <S.StyleParagraph onClick={(e) => e.preventDefault()}>
          <Icons.UserProfile />
          {loading ? <Loading size='small' /> : getUserFullname(userInfo)}
          <Icons.ArrowDown />
        </S.StyleParagraph>
      )}
    </S.StyleDropDown>
  );
}
