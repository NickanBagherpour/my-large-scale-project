'use client';

import { ChangeEvent, ReactNode, useState } from 'react';

import { useTr } from '@oxygen/translation';
import { addThousandSeparator, convertToEnglishNumbers, numberToPersian, rialToToman } from '@oxygen/utils';

import * as S from './input.style';
import { InputProps } from 'antd';

export type InputMoneyProps = Omit<InputProps, 'value'> & {
  showLetter?: boolean;
  subtitle?: ReactNode;
  value?: string; // TODO: see if you could remove this
};

const formatter = (value?: string) => {
  if (value === null || value === undefined) return value;
  const englishValue = convertToEnglishNumbers(value);
  return addThousandSeparator(englishValue);
};

const parser = (value: string) => value?.replace(/,/g, '') as unknown as string;

export const InputMoney = (props: InputMoneyProps) => {
  const { children, addonAfter, value, onChange, showLetter = true, subtitle, ...rest } = props;

  const formattedValue = formatter(value);

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

    if (value.toString().length > 3 && +value > 100) {
      return <S.SubtitleText>{_subtitle}</S.SubtitleText>;
    }

    return null;
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.({ ...e, target: { ...e.target, value: parser(e.target.value) } });
  };

  return (
    <S.InputMoneyWrapper>
      <S.InputMoney addonAfter={_addonAfter} onChange={handleOnChange} value={formattedValue} {...rest}>
        {children}
      </S.InputMoney>
      {getSubtitle()}
    </S.InputMoneyWrapper>
  );
};
