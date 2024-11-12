'use client';

import React, { useState } from 'react';

import { PopoverProps } from 'antd';
import * as S from './filter-popover.style';

export type FilterType = {
  key: string;
  title: string;
  icon: string;
};

export type FilterPopoverProps = PopoverProps & {
  filters: FilterType[];
  initialValue?: string;
  onChange: (key: string) => void;
  className?: string;
};

export const FilterPopover = (props: FilterPopoverProps) => {
  const { filters, initialValue, onChange, className = '' } = props;

  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [filterValue, setFilterValue] = useState(initialValue);
  const [open, setOpen] = useState(false);

  const handleFilterButtonClick = () => {
    setFilterIsOpen(!filterIsOpen);
  };

  const handleFilterItemClick = (key: string) => {
    onChange(key);
    setFilterValue(key);
    setOpen(false);
    setFilterIsOpen(!filterIsOpen);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    setFilterIsOpen(!filterIsOpen);
  };

  const content = () => (
    <S.ContentContainer>
      {filters.map((filter, index) => (
        <S.ContentItem key={index}>
          <p
            onClick={() => handleFilterItemClick(filter.key)}
            className={filter.key === filterValue ? 'active-item' : ''}
          >
            <i className={`icon-item ${filter.icon}`} />
            {filter.title}
          </p>
        </S.ContentItem>
      ))}
    </S.ContentContainer>
  );

  return (
    <S.StyledFilterPopover
      content={content}
      open={open}
      trigger='click'
      placement='bottomLeft'
      onOpenChange={handleOpenChange}
      className={className}
    >
      <S.FilterButton onClick={handleFilterButtonClick}>
        <i className={`${filterIsOpen ? 'rotate-up' : 'rotate-down'} icon-fill-arrow-down`} />
        <i className='icon-sort' />
      </S.FilterButton>
    </S.StyledFilterPopover>
  );
};
