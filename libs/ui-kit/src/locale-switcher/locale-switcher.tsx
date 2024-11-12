'use client';

import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

import { useTr } from '@oxygen/translation';
import { useConfig } from '@oxygen/hooks';
import { Direction, Locale } from '@oxygen/types';

export type LocaleSwitcherProps = {
  children?: React.ReactNode;
  onToggleLocale?: any;
  color?: string;
  type?: 'textPrimary' | 'onPrimary';
};

export const Wrapper = styled.div<LocaleSwitcherProps>`
  & button {
    font-size: 1.8rem;
    color: ${(p) => {
      if (p.color) {
        return p.color;
      } else if (p.type) {
        return p.theme[p.type];
      }

      return p.theme.onPrimary;
    }} !important;
    padding: 0 1rem;
  }

  margin: 0;
  margin-left: 1.6rem;
`;

export const LocaleSwitcher = (props: LocaleSwitcherProps) => {
  const { children, ...rest } = props;
  const { config, updateConfig } = useConfig();
  const [t] = useTr();

  const onToggleLocale = () => {
    const newLocale = ['en', 'en-us', 'en_us'].includes(config.locale.toLocaleLowerCase())
      ? Locale.FA_IR
      : Locale.EN_US;
    const newDir = config.direction === Direction.RTL ? Direction.LTR : Direction.RTL;

    updateConfig({
      ...config,
      locale: newLocale,
      direction: newDir,
    });

    if (props.onToggleLocale) {
      props.onToggleLocale();
    }
  };

  const getLocaleText = () => {
    if (['en', 'en-us', 'en-US'].includes(config.locale.toLowerCase())) {
      return t('locale.fa');
    } else if (['fa', 'fa-ir', 'fa-IR'].includes(config.locale.toLowerCase())) {
      return t('locale.en');
    }
    return '';
  };

  return (
    <Wrapper color={props.color} type={props.type}>
      <Button type='link' onClick={onToggleLocale} size='small' color='primary'>
        {getLocaleText()}
      </Button>
    </Wrapper>
  );
};
