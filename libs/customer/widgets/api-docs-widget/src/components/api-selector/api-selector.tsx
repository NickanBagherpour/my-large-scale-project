'use client';

import type React from 'react';
import Link from 'next/link';
import { ROUTES } from '@oxygen/utils';
import { ThemeID } from '@oxygen/types';
import { useAppTheme } from '@oxygen/hooks';
import { useTr } from '@oxygen/translation';

import { Select, Icons } from '@oxygen/ui-kit';
import * as S from './api-selector.style';

export interface ApiOption {
  label: string;
  value: string;
}

interface ApiSelectorProps {
  options: ApiOption[];
  selectedOption: ApiOption;
  onSelectChange: (option: ApiOption) => void;
  onRefresh?: () => void;
}

export function ApiSelector({ options, selectedOption, onSelectChange }: ApiSelectorProps) {
  const handleChange = (value) => {
    const selected = options.find((option) => option.value === value);
    if (selected) {
      onSelectChange(selected);
    }
  };

  const theme = useAppTheme();
  const [t] = useTr();

  return (
    <S.HeaderContainer>
      <S.HeaderTitle>
        <span className={'appbar-title-oxygen-logo'}>
          <Link href={ROUTES.CUSTOMER.DASHBOARD}>
            {theme.id !== ThemeID.DARK ? <Icons.OxygenTextLogo /> : <Icons.OxygenDarkTextLogo />}
          </Link>
        </span>
        مستندات API
      </S.HeaderTitle>
      <S.SelectWrapper>
        <Select
          value={selectedOption.value}
          options={options}
          onChange={handleChange}
          aria-label={t('choose_api_version')}
          size={'middle'}
          variant={'outlined'}
        />
      </S.SelectWrapper>
    </S.HeaderContainer>
  );
}
