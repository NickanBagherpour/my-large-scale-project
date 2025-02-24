'use client';

import React from 'react';
import { Checkbox, Dropdown, DropdownProps, Form } from 'antd';
import { ItemType } from 'antd/lib/menu/interface';

import { useAppTheme } from '@oxygen/hooks';
import { Button, Loading } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';

import * as S from './dropdown-select.styles';

export type MenuItemType = ItemType;

export type DropdownSelectProps = Omit<DropdownProps, ' menu'> & {
  menu?: MenuItemType[];
  multiSelect?: boolean;
  onChange?: (values: MenuItemType[]) => void;
  defaultValue?: MenuItemType[];
  value?: MenuItemType[];
  loading?: boolean;
  iconPosition?: 'start' | 'end';
  firstIconClassName?: string;
};

export const DropdownSelect = (props: DropdownSelectProps) => {
  const {
    children,
    menu = [],
    value,
    defaultValue = [],
    multiSelect = false,
    onChange,
    loading = false,
    iconPosition = 'end',
    ...rest
  } = props;

  const checkedItems = value ?? defaultValue ?? [];
  const IS_SELECTED_ALL = !!menu && checkedItems.length === menu?.length;

  const { errors } = Form.Item.useStatus();
  const { t } = useTr();
  const theme = useAppTheme();

  const [open, setOpen] = React.useState<boolean>(false);
  const uniqueId = React.useId();

  const hasError = () => {
    if (errors && errors.length > 0) return true;
    return false;
  };

  const handleSelectAll = () => {
    if (!multiSelect) return;
    handleOnChange(null, true);
  };

  function updateSelectedValues(option: MenuItemType | null, isSelectAll = false) {
    if (isSelectAll) {
      return IS_SELECTED_ALL ? [] : menu;
    }

    if (!option) {
      return checkedItems;
    }

    const existingItem = checkedItems?.find((item: MenuItemType) => item && item.key === option?.key);

    if (!multiSelect) {
      return existingItem ? [] : [option];
    }

    if (existingItem) {
      return checkedItems.filter((item) => item && item.key !== option.key);
    } else {
      const optionToAdd = menu.find((item) => item && item.key === option?.key);
      return optionToAdd ? [...checkedItems, optionToAdd] : checkedItems;
    }
  }

  const handleOnChange = (option: MenuItemType | null, isSelectAll = false) => {
    const newValues = updateSelectedValues(option, isSelectAll);

    if (onChange) {
      onChange(newValues);
    }
  };

  function handleMenuClick(info) {
    if (info.key === '___selectAll') {
      handleSelectAll();
      return;
    }

    if (!multiSelect) {
      setOpen(false);
    }

    const selectedOption = getOptionByKey(info.key) ?? null;

    handleOnChange(selectedOption);
  }

  function getOptionByKey(key: string) {
    return menu.find(
      (item) =>
        item && item.key == key /* Using == to allow comparison between item.key and key even if their types differ */
    );
  }

  const generateBaseItems = (): any[] => {
    if (multiSelect) {
      return [
        {
          label: (
            <Checkbox
              checked={IS_SELECTED_ALL}
              indeterminate={checkedItems?.length > 0 && checkedItems?.length !== menu?.length}
            >
              <span>{t('uikit.select_all')}</span>
            </Checkbox>
          ),
          key: '___selectAll',
        },
        {
          type: 'divider',
          key: 'divider',
        },
      ];
    } else return [];
  };

  const menuItems = menu?.map((option: any) => {
    return {
      label: multiSelect ? (
        <Checkbox checked={checkedItems.some((item) => item && item?.key === option?.key)}>
          <span>{option.label}</span>
        </Checkbox>
      ) : (
        <span>{option.label}</span>
      ),
      style: {
        backgroundColor: checkedItems.some((item) => item && item.key === option?.key) ? theme.primary._50 : '',
      },
      key: option?.key,
    };
  });

  const items: any = [...generateBaseItems(), ...menuItems];

  const menuProps = { items, onClick: handleMenuClick };

  return (
    <S.DropdownSelectContainer $error={hasError()} $iconPosition={iconPosition}>
      <S.DropdownContainer id={uniqueId} />
      <Dropdown
        menu={menuProps}
        trigger={['click']}
        open={open}
        onOpenChange={(flag, info) => {
          if (!multiSelect || flag || info.source === 'trigger') setOpen(flag); // Only close in single-select mode
        }}
        getPopupContainer={() => document.getElementById(uniqueId)!}
        disabled={loading}
        {...rest}
      >
        <Button
          type='default'
          className={'dropdown-button'}
          icon={
            loading ? (
              <Loading size={'small'} />
            ) : (
              <S.StyledIcon className={`icon-chev-down ${open ? 'select-open' : ''}`} />
            )
          }
          variant={'outlined'}
          iconPosition={iconPosition}
        >
          <S.StyledSpace>{children}</S.StyledSpace>
        </Button>
      </Dropdown>
    </S.DropdownSelectContainer>
  );
};
