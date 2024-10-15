import { cssVar, getRelatedColor, hideScrollbar, respondTo } from '@oxygen/utils';
import { Drawer as AntDrawer, Layout } from 'antd';
import styled from 'styled-components';

const { Sider: AntSider } = Layout;

export const Sider = styled(AntSider)`
  overflow: auto;
  // height: 100vh',
  position: fixed !important;
  top: calc(var(${cssVar.appBarHeight}) + var(${cssVar.verticalGap}));
  left: var(${cssVar.drawerSideGap});
  bottom: 0;
  background: ${(p) => p.theme.surface} !important;
`;

export const Drawer = styled(AntDrawer)`
  &.ant-drawer-content {
    background: ${(p) => p.theme.surface};
  }
`;

export const MenuWrapper = styled.div`
  overflow-y: auto;
  margin-bottom: var(${cssVar.verticalGap});
  background: ${(p) => p.theme.surface};
  height: 100%;
  // border-radius: var(${cssVar.radius});

  .menu-search-input-container {
    margin-top: 2.4rem;
    margin-bottom: 2.4rem;
    padding: 0 1.6rem;

    input {
      border-radius: 0.4rem;
    }
  }

  ul.ant-menu-root {
    background-color: transparent;
    border-inline-end: none !important;
    color: ${(p) => p.theme.text.secondary};

    li.ant-menu-item-selected {
      background-color: ${(p) => p.theme.primary._200};
      font-weight: bold;
      color: ${(p) => getRelatedColor(p.theme.id, p.theme.primary.main, p.theme.text.primary)};
    }

    li.ant-menu-item,
    li.ant-menu-submenu {
      margin: 0 auto;
      text-wrap: unset;
      line-height: 1.5;
    }

    li.ant-menu-item i,
    div[role='menuitem'] i {
      font-size: 2rem;
    }

    .ant-menu-title-content {
      font-size: 1.4rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .menu-item-badge {
        color: white;

        .ant-badge-count {
          color: inherit;
        }
      }
    }

    //li.ant-menu-item:hover {
    //  background-color: blue !important;
    //}

    //li.ant-menu-submenu:hover {
    //  background-color: blue !important;
    //}
  }

  .menu-spin-container {
    height: 100%;
    display: flex;
    //align-items: center;
    justify-content: center;
    padding-top: 4rem;
  }

  .ant-result-icon {
    color: ${(p) => p.theme.error.main};
  }

  ${hideScrollbar()}
`;

export const SiderItemsWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  gap: 2.4rem;
  background: transparent;

  ${respondTo.down('sm')} {
    gap: 0;
  }
`;
