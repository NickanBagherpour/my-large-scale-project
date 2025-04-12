import { Nullable } from '@oxygen/types';
import { TariffDetailsType } from '../types';
import { feeTypeMapReverse, TARIFF } from '@oxygen/reusable-components';

export function getInitialValues(data: Nullable<TariffDetailsType>) {
  let initialValues = {};

  if (data) {
    const { feeSteps, fee, feeType, transactionFees } = data;

    initialValues = {};

    if (feeTypeMapReverse[feeType] === 'fixed') {
      initialValues = {
        ...initialValues,
        [TARIFF.type]: 'fixed',
        [TARIFF.fixed]: String(fee),
      };
    } else if (feeTypeMapReverse[feeType] === 'tiered') {
      initialValues = {
        ...initialValues,
        [TARIFF.type]: 'tiered',
        [TARIFF.tiered]: feeSteps.map(({ fee, fromRate, toRate }) => ({
          tariff: String(fee),
          from: String(fromRate),
          to: String(toRate),
        })),
      };
    } else {
      initialValues = {
        ...initialValues,
        [TARIFF.type]: 'special',
        [TARIFF.special]: transactionFees.map(({ toRate, fromRate, max, min, percent }) => ({
          to: String(toRate),
          from: String(fromRate),
          maximum: String(max),
          minimum: String(min),
          percent: String(percent),
        })),
      };
    }
  }

  return initialValues;
}
