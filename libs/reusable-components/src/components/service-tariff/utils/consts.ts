export const tariffTypes = ['fixed', 'tiered', 'special'] as const;

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

export const emptySpecialTariff = [
  {
    [SPECIAL_TARIFF_NAMES.to]: null,
    [SPECIAL_TARIFF_NAMES.from]: null,
    [SPECIAL_TARIFF_NAMES.percent]: null,
    [SPECIAL_TARIFF_NAMES.minimum]: null,
    [SPECIAL_TARIFF_NAMES.maximum]: null,
  },
];

export const emptyTieredTariff = [
  {
    [TIERED_TARIFF_NAMES.from]: null,
    [TIERED_TARIFF_NAMES.to]: null,
    [TIERED_TARIFF_NAMES.tariff]: null,
  },
];

export const TARIFF = {
  type: 'type',
  fixed: 'fixed',
  tiered: 'tiered',
  special: 'special',
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
