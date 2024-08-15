import { ReactNode } from 'react';

import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache, { Options as CacheOptions } from '@emotion/cache';

interface IDirectionalityProps {
  isRtl: boolean;
  children: ReactNode;
}

// Create rtl cache
const cacheRtl = createCache({
  key: 'muidir',
  stylisPlugins: [prefixer, rtlPlugin],
} satisfies CacheOptions);

const cacheLtr = createCache({
  key: 'muidir',
  stylisPlugins: [prefixer],
} satisfies CacheOptions);

export const Directionality = (props: IDirectionalityProps) => {
  const stylisPlugins = props.isRtl ? cacheRtl : cacheLtr;
  return <CacheProvider value={stylisPlugins}>{props.children}</CacheProvider>;
};

// export default Directionality;
