//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

const base_path = process.env.NEXT_PUBLIC_BASE_URL;
const api_base_url = process.env.API_BASE_URL;
const auth_prefix = process.env.NEXT_PUBLIC_AUTH_PREFIX || 'api2';
const portal_prefix = process.env.NEXT_PUBLIC_PORTAL_PREFIX || '';

const rewritesConfig = [
  {
    source: `/${auth_prefix}/:path*`,
    destination: `/${auth_prefix}/:path*`,
  },
  {
    source: `/${portal_prefix}/:path*`,
    destination: `${api_base_url}/${portal_prefix}/:path*`,
  },
];

const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // {
  //   key: 'Referrer-Policy',
  //   value: 'strict-origin-when-cross-origin',
  // },
  // {
  //   key: 'Content-Security-Policy',
  //   value: "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';",
  // },
];

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  output: 'standalone',
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: true,
  },
  images: {
    unoptimized: true,
  },
  staticPageGenerationTimeout: 180,
  basePath: base_path /* process.env.NODE_ENV === 'development' ? '' :  base_url*/,
  rewrites: async () => {
    return rewritesConfig;
  },
  headers: async () => {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  compiler: {
    // For other options, see https://nextjs.org/docs/architecture/nextjs-compiler#emotion
    styledComponents: true,
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
