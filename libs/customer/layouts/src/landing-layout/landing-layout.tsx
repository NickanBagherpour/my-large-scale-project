import React, { ReactNode } from 'react';

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

  return <>{children}</>;
};

export default LandingLayout;
