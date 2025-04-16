import { TFunction } from 'i18next';

export const getMonthsWithValues = (t: TFunction) => [
  {
    text: t('months.farvardin'),
    value: 1,
  },
  {
    text: t('months.ordibehesht'),
    value: 2,
  },
  {
    text: t('months.khordad'),
    value: 3,
  },
  {
    text: t('months.tir'),
    value: 4,
  },
  {
    text: t('months.mordad'),
    value: 5,
  },
  {
    text: t('months.shahrivar'),
    value: 6,
  },
  {
    text: t('months.mehr'),
    value: 7,
  },
  {
    text: t('months.aban'),
    value: 8,
  },
  {
    text: t('months.azar'),
    value: 9,
  },
  {
    text: t('months.dey'),
    value: 10,
  },
  {
    text: t('months.bahman'),
    value: 11,
  },
  {
    text: t('months.esfand'),
    value: 12,
  },
];

export const years = [
  {
    text: '1404',
    value: 1404,
  },
  {
    text: '1403',
    value: 1403,
  },
  {
    text: '1402',
    value: 1402,
  },
  {
    text: '1401',
    value: 1401,
  },
  {
    text: '1400',
    value: 1400,
  },
  {
    text: '1399',
    value: 1399,
  },
];

export const clientTypeMap = {
  client: 1,
  aggregator: 2,
};
