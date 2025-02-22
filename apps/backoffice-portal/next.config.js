//@ts-check

const { composePlugins, withNx } = require('@nx/next');

const base_url = process.env.API_BASE_URL;
const auth_prefix = process.env.NEXT_PUBLIC_AUTH_PREFIX || 'api2';
const portal_prefix = process.env.NEXT_PUBLIC_PORTAL_PREFIX || '';
const report_base_url = process.env.API_REPORT_BASE_URL || '';
const report_prefix = process.env.API_REPORT_PREFIX || '';

const rewritesConfig = [
  {
    source: `/${auth_prefix}/:path*`,
    destination: `/${auth_prefix}/:path*`,
  },
  {
    source: `/${portal_prefix}/:path*`,
    destination: `${base_url}/${portal_prefix}/:path*`,
  },
  {
    source: `/${report_prefix}/:path*`,
    destination: `${report_base_url}/${report_prefix}/:path*`,
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
  // basePath: process.env.NODE_ENV === 'development' ? '' : base_url,
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
