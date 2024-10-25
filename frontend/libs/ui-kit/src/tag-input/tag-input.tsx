'use client';

import React from 'react';
import { useTheme } from 'styled-components';
import { Checkbox, Dropdown, DropdownProps } from 'antd';

import { Button } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';

import * as S from './tag-input.style';
import { uuid } from '@oxygen/utils';

export type DropdownOptions = {
  label: string;
  value: string;
};

export type TagInputProps = DropdownProps & {
  buttonCaption: string;
  options: any[];
  multiSelect: boolean;
  handleCheckboxChange?: any;
  checkedItems?: any[];
  setCheckedItems?: any;
};

export const TagInput = (props: TagInputProps) => {
  const { buttonCaption, options, multiSelect, handleCheckboxChange, checkedItems, setCheckedItems } = props;
  const { t } = useTr();
  const theme = useTheme();

  const [open, setOpen] = React.useState<boolean>(false);

  const handleSelectAll = () => {
    if (!multiSelect) return;
    else if (multiSelect && checkedItems) {
      setOpen(true);
      if (checkedItems.length === options.length) {
        setCheckedItems([]); // Deselect all if all are selected
      } else {
        setCheckedItems(options.map((option) => ({ label: option.label, value: option.value }))); // Select all
      }
    }
  };

  function handleMenuClick(e) {
    if (!multiSelect) setCheckedItems([e.key]);
  }

  const generateBaseItems = () => {
    if (!multiSelect) return [];
    else if (multiSelect && checkedItems) {
      return [
        {
          label: (
            <Checkbox
              checked={checkedItems.length === options.length}
              onChange={handleSelectAll}
              indeterminate={checkedItems.length > 0 && checkedItems.length !== options.length}
            >
              {t('uikit.select_all')}
            </Checkbox>
          ),
          key: 'selectAll',
        },
        {
          type: 'divider',
          key: 'divider',
        },
      ];
    }
  };
  const menuItems = options.map((option, index) => {
    if (multiSelect && checkedItems)
      return {
        label: (
          <Checkbox
            checked={checkedItems.some((item) => item.value === option.value)}
            onChange={(e) => {
              handleCheckboxChange(option.value, e);
              setOpen(true); // Ensure dropdown opens when checkbox is clicked
            }}
          >
            {option.label}
          </Checkbox>
        ),
        style: {
          backgroundColor:
            checkedItems && checkedItems.some((item) => item.value === option.value) ? theme.primary._50 : '',
        },
        key: option.value,
      };
    else {
      return {
        label: option,
        style: {
          backgroundColor: checkedItems && checkedItems.some((item) => item === option) ? theme.primary._50 : '',
        },
        key: option,
      };
    }
  });

  const baseItems = generateBaseItems();
  const items: any = baseItems ? [...baseItems, ...menuItems] : menuItems;
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const uniqueId = uuid();
  return (
    <S.TagInputContainer>
      <S.DropdownContainer id={uniqueId}></S.DropdownContainer>
      <Dropdown
        menu={menuProps}
        trigger={['click']}
        open={open}
        onOpenChange={(flag, info) => {
          setOpen(flag);
        }}
        getPopupContainer={() => document.getElementById(uniqueId)!}
      >
        <Button type='default' className={'dropdown-button'} variant={'outlined'}>
          <S.StyledSpace>
            <i className={open ? 'icon-arrow-up' : 'icon-chev-down'} onClick={() => console.log('click')} />
            <span>{buttonCaption}</span>
          </S.StyledSpace>
        </Button>
      </Dropdown>
    </S.TagInputContainer>
  );
};
