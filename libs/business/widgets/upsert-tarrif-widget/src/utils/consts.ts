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
} as const;

export const TIERED_TARIFF_NAMES = {
  from: 'from',
  to: 'to',
  tariff: 'tariff',
} as const;

// TODO: create an object for this
export const serviceTariffName = 'serviceTariff';
export const tariffName = 'tariff';
export const tiered = 'tiered';
export const special = 'special';
export const tariffPrice = 'tariffPrice';
