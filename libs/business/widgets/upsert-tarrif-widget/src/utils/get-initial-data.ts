import { emptySpecialTariff, emptyTieredTariff, feeTypeMapReverse, TARIFF } from '@oxygen/reusable-components';
import { AppSchemaType, Fee } from '../types';
import { GENERAL_INFO_NAMES } from './consts';

function defaultStrNum(value: number | null) {
  return typeof value === 'number' ? String(value) : '';
}

function defaultStr(value: string | null) {
  return typeof value === 'string' ? value : '';
}

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
      typeFieldName,
    } = feeData;

    initialValues = {
      [GENERAL_INFO_NAMES.serviceName]: serviceName,
      [GENERAL_INFO_NAMES.persianServiceName]: servicePersianName,
      [GENERAL_INFO_NAMES.serviceType]: +defaultStrNum(aggregationType),
      [GENERAL_INFO_NAMES.bankingSharePct]: defaultStrNum(bankingShare),
      [GENERAL_INFO_NAMES.opsTeamSharePct]: defaultStrNum(operationShare),
      [GENERAL_INFO_NAMES.fieldNameInElastic]: defaultStr(fieldName),
      [GENERAL_INFO_NAMES.transactionTypeInElastic]: defaultStr(type),
      [GENERAL_INFO_NAMES.transferTypeParamElastic]: defaultStr(typeFieldName),
      [TARIFF.tiered]: emptyTieredTariff,
      [TARIFF.special]: emptySpecialTariff,
    };

    if (feeType === null) return initialValues;

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
          feeSteps?.map(({ fee, fromRate, toRate }) => ({
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
          transactionFees?.map(({ toRate, fromRate, max, min, percent }) => ({
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
