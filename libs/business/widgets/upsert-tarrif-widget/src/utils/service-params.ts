import { feeTypeMap } from '@oxygen/reusable-components';
import { AppSchemaType, PostTariffParams } from '../types';

export function prepareParams(values: AppSchemaType) {
  const {
    serviceName,
    serviceType,
    bankingSharePct,
    opsTeamSharePct,
    fieldNameInElastic,
    transactionTypeInElastic,
    special,
    tiered,
    fixed,
    type,
  } = values;

  let params: PostTariffParams = {
    serviceName,
    bankingShare: +bankingSharePct,
    operationShare: +opsTeamSharePct,

    type: transactionTypeInElastic + '',
    aggregationType: serviceType + '',
    fieldName: fieldNameInElastic,

    feeType: feeTypeMap[type],
  };

  if (type === 'fixed') {
    params = { ...params, fee: fixed };
  }

  if (type === 'tiered') {
    const feeSteps: PostTariffParams['feeSteps'] = tiered.map(({ tariff, to, from }) => ({
      fee: tariff,
      fromRate: from,
      toRate: to,
    }));
    params = { ...params, feeSteps };
  }

  if (type === 'special') {
    const transactionFees: PostTariffParams['transactionFees'] = special.map(
      ({ to, from, maximum, minimum, percent }) => ({
        toRate: to,
        fromRate: from,
        max: maximum,
        min: minimum,
        percent,
      })
    );
    params = { ...params, transactionFees };
  }

  return params;
}
