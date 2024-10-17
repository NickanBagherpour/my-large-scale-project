import React from 'react';
import styled from 'styled-components';
import { Switch as AntSwitch, SwitchProps as AntSwitchProps } from 'antd';

import { getRelatedColor, respondTo } from '@oxygen/utils';
import { useConfig } from '@oxygen/hooks';
import { ThemeID } from '@oxygen/types';

export type ThemeSwitchProps = AntSwitchProps & {
  children?: React.ReactNode;
};

const ThemeSwitchWrapper = styled(AntSwitch)`
  background-color: ${(p) => getRelatedColor(p.theme.id, p.theme.background.main, p.theme.onPrimary)}80 !important;
  box-shadow: inset 0 0 1px 0 rgba(0, 0, 0, 0.25);

  & .ant-switch {
    // background-color: ${(p) => p.theme.background.main}80  ;
  }

  & .ant-switch-handle::before {
    //background-color: #b7bbe1 !important;
    //background-color: ${(p) => p.theme.background.main}90  !important;
  }

  & .ant-switch-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-inline-end: 1rem !important;
    padding-inline-start: 1rem !important;

    ${respondTo.down('md')} {
      padding-inline-end: 1.5rem !important;
      padding-inline-start: 1.5rem !important;
    }

    & .ant-switch-inner-checked {
      color: #faa627;
    }

    & .ant-switch-inner-unchecked {
      color: black;
    }

    & .ant-switch-inner-checked,
    & .ant-switch-inner-unchecked {
      width: 1.6rem;
      height: 1.6rem;
      margin-top: 0.8rem;
      font-size: 1.4rem;
      ${respondTo.down('md')} {
        margin-top: 1.2rem;
        font-size: 1.6rem;
      }
    }
  }
`;

export const ThemeSwitch = (props: ThemeSwitchProps) => {
  const { children, ...rest } = props;
  const { config, updateConfig } = useConfig();

  const handleOnChange = (val, event) => {
    updateConfig({
      ...config,
      themeId: config.themeId === ThemeID.DARK ? ThemeID.LIGHT : ThemeID.DARK,
    });

    if (props.onChange) {
      props.onChange(val, event);
    }
  };

  return (
    <ThemeSwitchWrapper
      {...rest}
      checkedChildren={<i className={'icon-sun-fill'} />}
      unCheckedChildren={<i className={'icon-moon-fill'} />}
      defaultChecked={config.themeId !== ThemeID.DARK}
      onChange={handleOnChange}
    />
  );
};
