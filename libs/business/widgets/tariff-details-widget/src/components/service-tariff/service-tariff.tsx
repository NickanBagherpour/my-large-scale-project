import React from 'react';

import { Button } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { Nullable, PageProps } from '@oxygen/types';

import * as S from './service-tariff.style';
import { TariffDetailsType } from '../../types';
import {
  emptySpecialTariff,
  emptyTieredTariff,
  feeTypeMapReverse,
  TARIFF,
  ServiceTariff as Tariff,
} from '@oxygen/reusable-components';
import { Form } from 'antd';

export type ServiceTariffPropsType = PageProps & {
  serviceName: Nullable<string>;
  data: Nullable<TariffDetailsType>;
  isLoading: boolean;
};

export const ServiceTariff: React.FC<ServiceTariffPropsType> = (props) => {
  const { data } = props;
  const [t] = useTr();
  const [form] = Form.useForm();

  const handleDetail = () => {
    console.log('clicked');
  };

  let initialValues = {};

  if (data) {
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
    } = data;

    initialValues = {
      // serviceName,
      // serviceType: aggregationType,
      // bankingSharePct: bankingShare + '', // TODO: see if this should exist or not
      // opsTeamSharePct: operationShare + '', // TODO: see if this should exist or not
      // fieldNameInElastic: fieldName,
      // transactionTypeInElastic: type,
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

  if (!data) return null;

  return (
    <S.ServiceTariffContainer>
      <S.HeaderContainer>
        <S.Title>{t('general_info')}</S.Title>
        <S.BTNContainer>
          <Button variant='filled' onClick={handleDetail}>
            <S.DetailIcon className='icon-clock' />
            {t('button.view_changes_history')}
          </Button>
        </S.BTNContainer>
      </S.HeaderContainer>

      <Form initialValues={initialValues} disabled form={form}>
        <Tariff rule={null} form={form} />
      </Form>
    </S.ServiceTariffContainer>
  );
};
