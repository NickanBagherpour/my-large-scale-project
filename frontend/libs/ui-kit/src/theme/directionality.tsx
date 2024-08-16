import { ReactNode } from 'react';

import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

interface IDirectionalityProps {
  isRtl: boolean;
  children: ReactNode;
}

// Create rtl cache
const cacheRtl = {
  key: 'muidir',
  stylisPlugins: [prefixer, rtlPlugin],
};

const cacheLtr = {
  key: 'muidir',
  stylisPlugins: [prefixer],
};

export const Directionality = (props: IDirectionalityProps) => {
  const stylisPlugins = props.isRtl ? cacheRtl : cacheLtr;
  return (
    <AppRouterCacheProvider options={stylisPlugins}>
      {props.children}
    </AppRouterCacheProvider>
  );
};

// export default Directionality;
