import localFont from 'next/font/local';

const iransansLocalFont = localFont({
  src: [
    {
      path: './woff2/IRANSansWeb(FaNum)_UltraLight.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: './woff2/IRANSansWeb(FaNum)_Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './woff2/IRANSansWeb(FaNum).woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './woff2/IRANSansWeb(FaNum)_Medium.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './woff2/IRANSansWeb(FaNum)_Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-iransans',
});

export const iransans = iransansLocalFont.variable;
