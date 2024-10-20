import React from 'react';
import { Checkbox, Dropdown, DropdownProps, Space } from 'antd';

import { useTr } from '@oxygen/translation';

import { Button, Chip, Divider } from '@oxygen/ui-kit';

import * as S from './tag-input.style';
import { useTheme } from 'styled-components';

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

  const [checkedItems, setCheckedItems] = React.useState<string[]>([]);
  const [open, setOpen] = React.useState<boolean>(false);

  const theme = useTheme();
  const handleCheckboxChange = (value: string) => {
    setCheckedItems((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  };

  const handleSelectAll = () => {
    setOpen(true);
    if (checkedItems.length === options.length) {
      setCheckedItems([]); // Deselect all if all are selected
    } else {
      setCheckedItems(options.map((option) => option.value)); // Select all
    }
  };

  function handleMenuClick(e) {
    // message.info('Click on menu item.');
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
      key: '0',
      icon: <></>,
    },
    {
      type: 'divider',
      key: 'divider1', // Unique key for the divider
      style: { backgroundColor: theme.border._300 }, // Custom styles for the divider
    },
  ];

  const menuItems = options.map((option, index) => {
    return {
      label: (
        <Checkbox checked={checkedItems.includes(option.value)} onChange={() => handleCheckboxChange(option.value)}>
          {option.label}
        </Checkbox>
      ),
      key: index,
      icon: <></>,
      danger: true,
      disabled: true,
    };
  });

  const items = [...baseItems, ...menuItems];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <S.TagInputContainer>
      <Dropdown
        menu={menuProps}
        trigger={['click']}
        open={open}
        onOpenChange={(flag) => setOpen(flag)}
        overlayClassName={'drop-down'}
        overlayStyle={{ height: '20vh' }}
      >
        <Button>
          <Space>
            <i className={open ? 'icon-arrow-up' : 'icon-chev-down'} onClick={() => console.log('click')} />
            <span>{buttonCaption}</span>
          </Space>
        </Button>
      </Dropdown>
      {checkedItems.length > 0 && <Divider type='vertical' style={{ height: 'auto' }} />}
      {checkedItems.map((item) => {
        return (
          <Chip
            closable={true}
            onClose={() => handleCheckboxChange(item)}
            style={{ backgroundColor: theme.border._300, border: 0 }}
          >
            {item}
          </Chip>
        );
      })}
    </S.TagInputContainer>
  );
};
