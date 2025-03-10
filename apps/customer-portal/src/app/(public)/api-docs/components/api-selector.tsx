'use client';

import type React from 'react';
import styled from 'styled-components';

import { Select } from '@oxygen/ui-kit';
import { cssVar } from '@oxygen/utils';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 4rem;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
  //direction: rtl;
  z-index: 10;
  position: sticky;
  top: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const HeaderTitle = styled.h1`
  font-size: 1.6rem;
  font-weight: 600;
  margin: 0;
  color: ${(p) => p.theme.primary.main};
  //margin-left: 1.5rem;
    //font-family: var(${cssVar.iransansFont}), system-ui, sans-serif;
`;

const SelectWrapper = styled.div`
  //width: 250px;
  //margin-right: auto;

  div.ant-select-selector {
    font-size: 1.2rem;

    span.ant-select-selection-wrap {
      padding: 1rem;
    }
  }
`;

export interface ApiOption {
  label: string;
  value: string;
}

interface ApiSelectorProps {
  options: ApiOption[];
  selectedOption: ApiOption;
  onSelectChange: (option: ApiOption) => void;
  onRefresh?: () => void; // Added refresh capability

}

export function ApiSelector({ options, selectedOption, onSelectChange }: ApiSelectorProps) {
  const handleChange = (value) => {
    const selected = options.find((option) => option.value === value);
    if (selected) {
      onSelectChange(selected);
    }
  };

  return (
    <HeaderContainer>
      <HeaderTitle>مستندات API</HeaderTitle>
      <SelectWrapper>
        <Select
          value={selectedOption.value}
          options={options}
          onChange={handleChange}
          aria-label="انتخاب نسخه API"
          size={'middle'}
          variant={'outlined'}

        />
      </SelectWrapper>
    </HeaderContainer>
  );
}
