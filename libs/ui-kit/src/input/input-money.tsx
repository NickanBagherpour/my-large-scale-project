'use client';

import { ReactNode } from 'react';

import { useTr } from '@oxygen/translation';
import { numberToPersian, rialToToman } from '@oxygen/utils';

import * as S from './input.style';
import { InputNumberProps } from 'antd';

export type InputMoneyProps = InputNumberProps<number> & {
  showLetter?: boolean;
  subtitle?: ReactNode;
};

export const InputMoney = (props: InputMoneyProps) => {
  const { children, addonAfter, value, showLetter = true, subtitle, ...rest } = props;

  const [t] = useTr();

  const _addonAfter = addonAfter ?? t('common.rial');

  function getSubtitle() {
    if (!showLetter) return null;
    if (value === undefined || value === null) return null;

    let _subtitle: ReactNode = '';

    if (subtitle !== null && subtitle !== undefined) {
      _subtitle = subtitle;
    } else {
      _subtitle = `${numberToPersian(rialToToman(value))} ${t('common.toman')}`;
    }

    if (value.toString().length > 3 && value > 100) {
      return <S.SubtitleText>{_subtitle}</S.SubtitleText>;
    }

    return null;
  }

  return (
    <S.InputMoneyWrapper>
      <S.InputMoney
        addonAfter={_addonAfter}
        maxLength={19}
        formatter={(value) => (value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '')}
        parser={(value) => value?.replace(/,/g, '') as unknown as number}
        value={value}
        {...rest}
      >
        {children}
      </S.InputMoney>
      {getSubtitle()}
    </S.InputMoneyWrapper>
  );
};
