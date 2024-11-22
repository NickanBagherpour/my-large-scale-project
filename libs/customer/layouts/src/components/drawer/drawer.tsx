import { Badge, Empty, Input, Menu, MenuProps, Result } from 'antd';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';

import { useAsync, useAuth, useMenu } from '@oxygen/hooks';
import { useTr } from '@oxygen/translation';
import { Direction } from '@oxygen/types';
import { Box, Button, Loading } from '@oxygen/ui-kit';
import { cssVar, BACKOFFICE_ROUTE_GROUPS } from '@oxygen/utils';

import { Api } from '../../services';
import { findActiveMenuItem, findActiveParentKeys, searchMenuItems } from '../../utils/utils';
import UserSection from '../user-section/user-section';

import * as S from './drawer.style';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  disabled?: boolean,
  children?: MenuItem[]
): MenuItem {
  return {
    label,
    key,
    icon,
    disabled,
    children,
  } as MenuItem;
}

export type DrawerProps = {
  shouldDisplaySider: boolean;
  shouldDisplayDrawer: boolean;
  openDrawer: boolean;
  direction: string;
  siderCollapsed: boolean;
  onToggleDrawer?: React.MouseEventHandler;
  children?: React.ReactNode;
  onBreakpoint?: (broken: boolean) => void;
  onClose?: () => void;
};

const Drawer = (props: DrawerProps) => {
  const {
    direction,
    shouldDisplaySider = false,
    shouldDisplayDrawer = false,
    siderCollapsed = false,
    openDrawer = false,
    onBreakpoint,
    onClose,
  } = props;

  const { menu, setMenu } = useMenu();

  const [t] = useTr();
  const [searchQuery, setSearchQuery] = useState('');
  const [openKeys, setOpenKeys] = useState<string[]>();
  const router = useRouter();
  const pathname = usePathname();

  const filteredItems = useMemo(() => searchMenuItems(menu, searchQuery), [menu, searchQuery]);
  const filteredMenuItems = useMemo(() => generateMenuItems(filteredItems?.result), [filteredItems]);
  const menuSelectedKeys = useMemo(() => getDefaultSelectedKeys(), [menu, pathname]);
  // console.log('defaultOpenKeys', pathname, filteredItems.parentIds, filteredItems, menuSelectedKeys);

  const { asyncState: stateMenu, execute: executeMenu } = useAsync();

  useEffect(() => {
    if (!menu && !stateMenu?.data) {
      fetchMenu();
    }
    getActiveParentKeys();
  }, [menu]);

  const fetchMenu = async () => {
    try {
      const response = await executeMenu(async () => await Api.getCustomerMenus());

      setMenu(response);
      return response;
    } catch (error) {
      return null;
    }
  };

  function getMenuLabelNode(menuItem) {
    const badgeCount = 0; // Replace with your non-zero value
    const badge = badgeCount > 0 ? <Badge className={'menu-item-badge'} count={badgeCount} showZero={false} /> : null;

    const isLink = menuItem.href && menuItem.active;

    return (
      <>
        {isLink ? <Link href={menuItem.href}>{menuItem.title}</Link> : menuItem.title}
        {badge}
      </>
    );
  }

  function generateMenuItems(menuItems: any[] | null): MenuItem[] | undefined {
    const items: MenuItem[] = [];

    if (!menuItems) return undefined;

    menuItems.forEach((menuItem) => {
      // if (!menuItem?.v3_ready) {
      //   return;
      // }

      const item: MenuItem = getItem(
        getMenuLabelNode(menuItem),
        menuItem?.id?.toString(),
        menuItem.icon ? <i className={menuItem.icon} /> : undefined,
        !menuItem?.active,
        menuItem.children && menuItem.children.length > 0 ? generateMenuItems(menuItem.children) : undefined
      );
      items.push(item);
    });

    return items.length > 0 ? items : undefined;
  }

  function handleSearchChange(e) {
    setSearchQuery(e.target.value);
  }

  function handleMenuTryAgain(e) {
    fetchMenu();
  }

  function getDefaultSelectedKeys() {
    const activeMenuItem = findActiveMenuItem(menu, pathname, BACKOFFICE_ROUTE_GROUPS);

    if (!activeMenuItem) {
      return [];
    }

    return [activeMenuItem.id.toString()];
  }

  function getActiveParentKeys() {
    if (!menu) return false;
    const activeKeys = findActiveParentKeys(menu, +menuSelectedKeys[0]);
    setOpenKeys(activeKeys);
  }

  function getMenu() {
    return (
      <S.MenuWrapper>
        {stateMenu?.error ? (
          <Result
            status='error'
            icon={<i className={'ri-alert-fill ri-3x'} />}
            subTitle={t('layout.menu_error_message')}
            extra={[
              <Box>
                <Button type={'link'} onClick={handleMenuTryAgain}>
                  {t('button.retry')}
                </Button>
              </Box>,
            ]}
          ></Result>
        ) : (
          <>
            {/*<div className='menu-search-input-container'>*/}
            {/*  <Input*/}
            {/*    placeholder={`${t('field.search')}`}*/}
            {/*    onChange={handleSearchChange}*/}
            {/*    prefix={<i className={'ri-search-line'} />}*/}
            {/*    size='middle'*/}
            {/*  />*/}
            {/*</div>*/}

            {stateMenu?.loading ? (
              <div className='menu-spin-container'>
                <Loading height='100%' containerProps={{ paddingTop: '4rem' }} />
              </div>
            ) : (
              <>
                <Menu
                  // theme='dark'
                  mode='inline'
                  openKeys={openKeys}
                  defaultSelectedKeys={menuSelectedKeys}
                  selectedKeys={menuSelectedKeys}
                  onOpenChange={(newOpenKeys: string[]) => setOpenKeys(newOpenKeys)}
                  items={filteredMenuItems /*?? items*/}
                  getPopupContainer={(node) => node.parentNode as HTMLElement}
                />
                {menu && !filteredMenuItems && <Empty style={{ marginTop: '6rem' }} description={false}></Empty>}
              </>
            )}
          </>
        )}
      </S.MenuWrapper>
    );
  }

  function getMenuContainer() {
    return (
      <S.SiderItemsWrapper>
        {/*<UserSection />*/}
        {getMenu()}
      </S.SiderItemsWrapper>
    );
  }

  return (
    <>
      {shouldDisplaySider && (
        <S.Sider
          trigger={null}
          theme={'light'}
          collapsible
          collapsed={siderCollapsed}
          breakpoint={'md'}
          onBreakpoint={onBreakpoint}
          collapsedWidth={0}
          width={`var(${cssVar.drawerWidth})`}
        >
          {getMenuContainer()}
        </S.Sider>
      )}

      {shouldDisplayDrawer && (
        <S.Drawer
          // title='Basic Drawer'
          placement={direction === Direction.RTL ? 'right' : 'left'}
          closable={false}
          onClose={onClose}
          open={openDrawer}
          getContainer={'div'}
          width={`var(${cssVar.drawerWidth})`}
          styles={{
            body: {
              padding: 0,
            },
          }}
        >
          {getMenuContainer()}
        </S.Drawer>
      )}
    </>
  );
};

export default Drawer;
