import React, { ReactNode } from 'react';
import * as S from './landing-layout.style';

type LandingLayoutProps = {
  children: ReactNode;
  // isPrimaryAppbar?: boolean;
};
export const LandingLayout = ({ children }: LandingLayoutProps) => {
  // const { config } = useConfig();
  // const { isMobileOrTablet } = useResponsive();
  // const { isAuth, logout } = useAuth();
  //
  // const handleLogout = () => {
  //   // setOpenDrawer(false);
  //   // console.log('logout clicked');
  //
  //   logout();
  // };

  return <S.MainContentLayout>{children}</S.MainContentLayout>;
};

export default LandingLayout;
