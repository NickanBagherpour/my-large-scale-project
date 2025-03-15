import { emptySpecialTariff, emptyTieredTariff, feeTypeMapReverse, TARIFF } from '@oxygen/reusable-components';
import { AppSchemaType, Fee } from '../types';
import { GENERAL_INFO_NAMES } from './consts';

export function getInitialValues(serviceName: string, feeData: Fee | undefined) {
  let initialValues: Partial<AppSchemaType> = {
    serviceName,
  };

  if (feeData) {
    const {
      serviceName,
      servicePersianName,
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
      [GENERAL_INFO_NAMES.serviceName]: serviceName,
      [GENERAL_INFO_NAMES.persianServiceName]: servicePersianName,
      [GENERAL_INFO_NAMES.serviceType]: aggregationType,
      [GENERAL_INFO_NAMES.bankingSharePct]: String(bankingShare),
      [GENERAL_INFO_NAMES.opsTeamSharePct]: String(operationShare),
      [GENERAL_INFO_NAMES.fieldNameInElastic]: fieldName,
      [GENERAL_INFO_NAMES.transactionTypeInElastic]: type,
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
    } else if (feeTypeMapReverse[feeType] === 'special') {
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
      [GENERAL_INFO_NAMES.serviceName]: serviceName,
      [TARIFF.special]: emptySpecialTariff,
      [TARIFF.tiered]: emptyTieredTariff,
    };
  }

  return initialValues;
}
