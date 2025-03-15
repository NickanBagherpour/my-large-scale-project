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
      bankingSharePct: String(bankingShare),
      opsTeamSharePct: String(operationShare),
      fieldNameInElastic: fieldName,
      transactionTypeInElastic: type,
      [TARIFF.tiered]: emptyTieredTariff,
      [TARIFF.special]: emptySpecialTariff,
    };

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
        [TARIFF.tiered]:
          feeSteps.map(({ fee, fromRate, toRate }) => ({
            tariff: String(fee),
            from: String(fromRate),
            to: String(toRate),
          })) ?? emptyTieredTariff,
      };
    } else {
      initialValues = {
        ...initialValues,
        [TARIFF.type]: 'special',
        [TARIFF.special]:
          transactionFees.map(({ toRate, fromRate, max, min, percent }) => ({
            to: String(toRate),
            from: String(fromRate),
            maximum: String(max),
            minimum: String(min),
            percent: String(percent),
          })) ?? emptySpecialTariff,
      };
    }
  } else {
    initialValues = {
      serviceName,
      [TARIFF.special]: emptySpecialTariff,
      [TARIFF.tiered]: emptyTieredTariff,
    };
  }

  return initialValues;
}
