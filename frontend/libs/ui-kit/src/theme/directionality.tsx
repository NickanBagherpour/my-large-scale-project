import { ReactNode } from 'react';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';

interface IDirectionalityProps {
  isRtl: boolean;
  children: ReactNode;
}

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const cacheLtr = createCache({
  key: 'muiltr',
  stylisPlugins: [prefixer],
});

export const Directionality = (props: IDirectionalityProps) => {
  const stylisPlugins = props.isRtl ? cacheRtl : cacheLtr;
  return <CacheProvider value={stylisPlugins}>{props.children}</CacheProvider>;
};

// export default Directionality;
