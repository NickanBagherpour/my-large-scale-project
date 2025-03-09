import { emptySpecialTariff, emptyTieredTariff, feeTypeMapReverse, TARIFF } from '@oxygen/reusable-components';
import { AppSchemaType, Fee } from '../types';

export function getInitialValues(serviceName: string, feeData: Fee | undefined) {
  let initialValues: Partial<AppSchemaType> = {
    serviceName,
  };

  if (feeData) {
    const {
      serviceName,
      feeSteps,
      fee,
      type,
      feeType,
      fieldName,
      bankingShare,
      operationShare,
      aggregationType,
      transactionFees,
    } = feeData;

    initialValues = {
      serviceName,
      serviceType: aggregationType,
      bankingSharePct: bankingShare + '', // TODO: see if this should exist or not
      opsTeamSharePct: operationShare + '', // TODO: see if this should exist or not
      fieldNameInElastic: fieldName,
      transactionTypeInElastic: type,
      // @ts-expect-error fix this later
      [TARIFF.tiered]: emptyTieredTariff,
      // @ts-expect-error fix this later
      [TARIFF.special]: emptySpecialTariff,
    };

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
        [TARIFF.tiered]:
          feeSteps.map(({ fee, fromRate, toRate }) => ({
            tariff: fee,
            from: fromRate,
            to: toRate,
          })) ?? emptyTieredTariff,
      };
    } else {
      initialValues = {
        ...initialValues,
        [TARIFF.type]: 'special',
        [TARIFF.special]:
          transactionFees.map(({ toRate, fromRate, max, min, percent }) => ({
            to: toRate,
            from: fromRate,
            maximum: max,
            minimum: min,
            percent: percent,
          })) ?? emptySpecialTariff,
      };
    }
  } else {
    initialValues = {
      serviceName,
      // @ts-expect-error fix this later
      [TARIFF.special]: emptySpecialTariff,
      // @ts-expect-error fix this later
      [TARIFF.tiered]: emptyTieredTariff,
    };
  }

  return initialValues;
}
