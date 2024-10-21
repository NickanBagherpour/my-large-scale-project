import React from 'react';
import { useTheme } from 'styled-components';
import { Checkbox, Dropdown, DropdownProps } from 'antd';

import { useTr } from '@oxygen/translation';
import { Button, Chip, Divider } from '@oxygen/ui-kit';

import * as S from './tag-input.style';

export type DropdownOptions = {
  label: string;
  value: string;
};

export type TagInputProps = DropdownProps & {
  buttonCaption: string;
  options: DropdownOptions[];
};

export const TagInput = (props: TagInputProps) => {
  const { buttonCaption, options } = props;
  const { t } = useTr();
  const theme = useTheme();

  const [checkedItems, setCheckedItems] = React.useState<DropdownOptions[]>([]);
  const [open, setOpen] = React.useState<boolean>(false);

  const handleCheckboxChange = (value: string, e) => {
    e.stopPropagation();
    setCheckedItems((prev) => {
      const existingItem = prev.find((item) => item.value === value);
      if (existingItem) {
        // Remove item if it's already checked
        return prev.filter((item) => item.value !== value);
      } else {
        // Find the corresponding option and add it
        const optionToAdd = options.find((option) => option.value === value);
        return optionToAdd ? [...prev, { label: optionToAdd.label, value }] : prev;
      }
    });
  };

  const handleSelectAll = () => {
    setOpen(true);
    if (checkedItems.length === options.length) {
      setCheckedItems([]); // Deselect all if all are selected
    } else {
      setCheckedItems(options.map((option) => ({ label: option.label, value: option.value }))); // Select all
    }
  };

  function handleMenuClick(e) {
    console.log('click', e);
  }

  const baseItems = [
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
      icon: <></>,
    },
    {
      type: 'divider',
      key: 'divider1',
    },
  ];

  const menuItems = options.map((option, index) => {
    return {
      label: (
        <Checkbox
          checked={checkedItems.some((item) => item.value === option.value)}
          onChange={(e) => {
            setOpen(true);
            handleCheckboxChange(option.value, e);
          }}
        >
          {option.label}
        </Checkbox>
      ),
      style: { backgroundColor: checkedItems.some((item) => item.value === option.value) ? theme.primary._50 : '' },
      key: option.value,
      icon: <></>,
      // danger: true,
      // disabled: true,
    };
  });

  const items = [...baseItems, ...menuItems];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <S.TagInputContainer>
      <S.DropdownContainer id={'area'}></S.DropdownContainer>
      <Dropdown
        menu={menuProps}
        trigger={['click']}
        open={open}
        onOpenChange={(flag) => setOpen(flag)}
        getPopupContainer={() => document.getElementById('area')}
      >
        <Button>
          <S.StyledSpace>
            <i className={open ? 'icon-arrow-up' : 'icon-chev-down'} onClick={() => console.log('click')} />
            <span>{buttonCaption}</span>
          </S.StyledSpace>
        </Button>
      </Dropdown>
      {checkedItems.length > 0 && <Divider type='vertical' style={{ height: 'auto' }} />}
      {checkedItems.map((item) => {
        return (
          <S.ChipsContainer key={item.value}>
            <Chip closable={true} onClose={(e) => handleCheckboxChange(item.value, e)}>
              {item.label}
            </Chip>
          </S.ChipsContainer>
        );
      })}
    </S.TagInputContainer>
  );
};
