export const GENERAL_INFO_NAMES = {
  serviceName: 'serviceName',
  bankingSharePct: 'bankingSharePct',
  opsTeamSharePct: 'opsTeamSharePct',
  serviceType: 'serviceType',
  fieldNameInElastic: 'fieldNameInElastic',
  transactionTypeInElastic: 'transactionTypeInElastic',
} as const;

export const tariffTypes = ['fixed', 'tiered', 'special'] as const;

export const gold = {
  bg: '#FFFBEB',
  dark: '#D97706',
  normal: '#F59E0B',
};

export const SPECIAL_TARIFF_NAMES = {
  from: 'from',
  to: 'to',
  minimum: 'minimum',
  maximum: 'maximum',
  percent: 'percent',
} as const;

export const TIERED_TARIFF_NAMES = {
  from: 'from',
  to: 'to',
  tariff: 'tariff',
} as const;

export const tariff = {
  serviceTariff: 'serviceTariff',
  tariff: 'tariff',
  tiered: 'tiered',
  fixed: 'fixed',
  special: 'special',
  tariffPrice: 'tariffPrice',
} as const;

export const feeTypeMap = {
  fixed: '1',
  tiered: '2',
  special: '3',
} as const satisfies Record<(typeof tariffTypes)[number], string>;

export const feeTypeMapReverse = Object.entries(feeTypeMap).reduce(
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {} as { [K in keyof typeof feeTypeMap as (typeof feeTypeMap)[K]]: K }
);
