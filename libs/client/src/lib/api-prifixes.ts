const basePrefix = process.env.NEXT_PUBLIC_PORTAL_PREFIX || 'back-api';

export const API_PREFIX = {
  AUTH: 'api/auth',
  PORTAL: basePrefix,
  PUBLISHER: `${basePrefix}/publisher/api`,
  CUSTOMER: `${basePrefix}`,
  BUSINESS: `${basePrefix}/business/api`,
  COMMERCIAL: `${basePrefix}/commercial/api`,
  REPORT: `${basePrefix}/analytics/api`,
  INVOICE: `${basePrefix}/invoice/api`,
  MANAGEMENT: `${basePrefix}/management/api`,
  // METABASE: `${basePrefix}/metabase`,
};
