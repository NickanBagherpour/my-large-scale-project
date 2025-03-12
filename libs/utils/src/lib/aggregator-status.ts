import { TFunction } from 'i18next';

export interface AggregatorStatusParams {
  organizationNationalId?: string | null;
  isAggregator?: boolean | null;
  aggregatorId?: number | null;
  aggregatorName?: string | null;
}

export function aggregatorStatusDisplay<T extends AggregatorStatusParams>(t: TFunction, data?: T) {
  return data?.organizationNationalId
    ? data?.isAggregator
      ? t('reusable.company_is_aggregator')
      : data?.aggregatorId
      ? `${t('reusable.company_has_aggregator')} - ${data?.aggregatorName}`
      : t('reusable.company_is_not_aggregator')
    : null;
}
