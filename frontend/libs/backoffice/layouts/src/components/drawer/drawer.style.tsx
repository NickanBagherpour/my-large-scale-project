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
  @media print{
    display:none;
  }
`;

export const Drawer = styled(AntDrawer)`
  &.ant-drawer-content {
    background: ${(p) => p.theme.surface};
  }
  @media print{
    display:none;
    width: 0;
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
    padding: 1.6rem;

    & li.ant-menu-item:not(last-of-type) {
      margin-bottom: 1.2rem;
    }

    li.ant-menu-item-selected {
      background-color: ${(p) => p.theme.primary._100};
      font-weight: bold;
      color: ${(p) => getRelatedColor(p.theme.id, p.theme.primary.main, p.theme.text.primary)};
      position: relative;
    }

    li.ant-menu-item-selected::before {
      content: '';
      display: inline-block;
      position: absolute;
      left: 0;
      width: 0.5rem;
      height: 100%;
      background-color: ${(props) => props.theme.primary.main};
    }

    li.ant-menu-item,
    li.ant-menu-submenu {
      margin: 0 auto;
      text-wrap: unset;
      line-height: 1.5;
      height: 4.4rem;
    }

    li.ant-menu-item i,
    div[role='menuitem'] i {
      font-size: 1.6rem;
    }

    .ant-menu-title-content {
      font-size: 1.4rem;
      font-weight: 500;
      line-height: 2.2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-inline-start: 1.2rem;

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
  @media print {
    display:none;
  }
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
