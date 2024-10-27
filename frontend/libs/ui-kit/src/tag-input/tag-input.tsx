'use client';

import React, { ReactNode, useState } from 'react';
import { useTheme } from 'styled-components';
import { Checkbox, Dropdown, DropdownProps, MenuProps } from 'antd';

import { Button } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { uuid } from '@oxygen/utils';

import * as S from './tag-input.style';

export type DropdownOption = {
  label: string;
  value: string;
};

export type TagInputProps = DropdownProps & {
  title?: ReactNode;
  options?: DropdownOption[];
  multiSelect?: boolean;
  onChange?: (e, values: DropdownOption[], value: DropdownOption) => void;
  defaultValue?: DropdownOption[];
  loading?: boolean;
};

export const TagInput = (props: TagInputProps) => {
  const { title, options = [], defaultValue = [], multiSelect = false, onChange, loading = false, ...rest } = props;

  const [checkedItems, setCheckedItems] = useState<DropdownOption[]>(defaultValue);

  const { t } = useTr();
  const theme = useTheme();

  const [open, setOpen] = React.useState<boolean>(false);

  const IS_SELECTED_ALL = !!options && checkedItems?.length === options?.length;

  const handleSelectAll = (e) => {
    if (!multiSelect) return;

    handleOnChange(e, null, true);
  };

  function updateSelectedValues(option: DropdownOption, isSelectAll = false) {
    console.log('updateSelectedValues');
    if (isSelectAll) {
      return IS_SELECTED_ALL ? [] : options;
    }

    const existingItem = checkedItems?.find((item: DropdownOption) => item.value === option?.value);

    if (!multiSelect) {
      if (existingItem) {
        return [];
      } else {
        return [option];
      }
    }

    if (existingItem) {
      return checkedItems?.filter((item) => item.value !== option?.value);
    } else {
      const optionToAdd = options.find((item) => item.value === option?.value);
      return optionToAdd ? [...checkedItems, { label: optionToAdd.label, value: option.value }] : checkedItems;
    }
  }

  const handleOnChange = (e, value, isSelectAll = false) => {
    console.log('handleOnChange');

    const newValues = updateSelectedValues(value, isSelectAll);

    setCheckedItems(newValues);

    if (onChange) {
      onChange(e, newValues, value);
    }
  };

  function handleMenuClick(info) {
    console.log('handleMenuClick', info.key, info.item, info.domEvent);
    /*
    console.log('menu click');
        if (!multiSelect) setCheckedItems([e.key]);
      */
    // info.domEvent.nativeEvent.stopPropagation();

    if (info.key === 'selectAll') {
      //handle selectAll
      handleSelectAll(info.domEvent);
      return;
    }

    if (info.domEvent.target.tagName.toUpperCase() === 'INPUT') {
      return;
    }

    if (!multiSelect) {
      setOpen(false);
      // return;
    }

    const foundItem = getOptionByKey(info.key);

    handleOnChange(null, foundItem);

    // console.log('handleMenuClick', foundItem, info.domEvent.target.tagName.toUpperCase());
  }

  const handleLabelClick = (e: React.MouseEvent) => {
    console.log('handleLabelClick');
    e.stopPropagation();

    if (multiSelect) {
      e.preventDefault(); // Prevent default behavior to keep dropdown open
      setOpen(true);
    }
  };

  function getOptionByKey(key: string) {
    return options.find((item) => item.value === key);
  }

  const generateBaseItems = (): any[] => {
    if (multiSelect) {
      return [
        {
          label: (
            <Checkbox
              checked={IS_SELECTED_ALL}
              // onChange={handleSelectAll}
              indeterminate={checkedItems?.length > 0 && checkedItems?.length !== options?.length}
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
    } else return [];
  };

  const menuItems = options?.map((option, index) => {
    return {
      label: multiSelect ? (
        <Checkbox
          checked={checkedItems?.some((item) => item.value === option.value)}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => {
            // handleOnChange(e, option);
            // setOpen(true); // Ensure dropdown opens when checkbox is clicked
          }}
        >
          <span onMouseDown={handleLabelClick}>{option.label}</span>
          {/* Prevent dropdown close on label click */}
          {/* {option.label} */}
        </Checkbox>
      ) : (
        <span
          onClick={(e) => {
            // handleOnChange(e, option);
          }}
        >
          {option.label}
        </span>
      ),
      style: {
        backgroundColor: checkedItems?.some((item) => item.value === option.value) ? theme.primary._50 : '',
      },
      key: option.value,
    };
  });

  const items: any = [...generateBaseItems(), ...menuItems];

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
          if (!multiSelect || flag || info.source === 'trigger') setOpen(flag); // Only close in single-select mode
        }}
        getPopupContainer={() => document.getElementById(uniqueId)!}
        {...rest}
      >
        <Button type='default' className={'dropdown-button'} variant={'outlined'} loading={loading}>
          <S.StyledSpace>
            <i className={open ? 'icon-arrow-up' : 'icon-chev-down'} />
            <span>{title ?? ''}</span>
          </S.StyledSpace>
        </Button>
      </Dropdown>
    </S.TagInputContainer>
  );
};
