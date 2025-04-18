import { TFunction } from 'i18next';

export const getJalalliMonths = (t: TFunction) => {
  return {
    1: t('months.farvardin'),
    2: t('months.ordibehesht'),
    3: t('months.khordad'),
    4: t('months.tir'),
    5: t('months.mordad'),
    6: t('months.shahrivar'),
    7: t('months.mehr'),
    8: t('months.aban'),
    9: t('months.azar'),
    10: t('months.dey'),
    11: t('months.bahman'),
    12: t('months.esfand'),
  };
};
