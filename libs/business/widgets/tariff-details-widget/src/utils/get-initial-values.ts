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
        [TARIFF.fixed]: fee,
      };
    } else if (feeTypeMapReverse[feeType] === 'tiered') {
      initialValues = {
        ...initialValues,
        [TARIFF.type]: 'tiered',
        [TARIFF.tiered]: feeSteps.map(({ fee, fromRate, toRate }) => ({
          tariff: fee,
          from: fromRate + '',
          to: toRate + '',
        })),
      };
    } else {
      initialValues = {
        ...initialValues,
        [TARIFF.type]: 'special',
        [TARIFF.special]: transactionFees.map(({ toRate, fromRate, max, min, percent }) => ({
          to: toRate,
          from: fromRate,
          maximum: max,
          minimum: min,
          percent: percent + '',
        })),
      };
    }
  }

  return initialValues;
}
