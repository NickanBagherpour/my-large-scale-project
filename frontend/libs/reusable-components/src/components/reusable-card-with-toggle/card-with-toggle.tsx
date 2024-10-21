import React from 'react';

import { Switch } from '@oxygen/ui-kit';
import { CardProps } from 'antd';

import * as S from './card-with-toggle.style';

export type CardWithToggleProps = CardProps & {
  title: string;
  subtitle?: string;
  icon?: string;
  handleIconClick?: (e: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
  defaultChecked?: boolean;
  customStyle?: React.CSSProperties;
};

const CardWithToggle = (props: CardWithToggleProps) => {
  const { title, subtitle, icon, handleIconClick, disabled = false, defaultChecked = false, customStyle } = props;

  const iconClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    console.log('Icon clicked!', event);
    if (handleIconClick) {
      handleIconClick(event);
    }
  };

  return (
    <S.StyledCard size={'default'} disabled={disabled} style={customStyle}>
      <S.ContentContainer>
        <S.TitleContainer>
          <S.Title>{title}</S.Title>
          <Switch disabled={disabled} defaultChecked={defaultChecked} />
        </S.TitleContainer>

        {subtitle ? <S.Title>{subtitle}</S.Title> : <></>}

        {icon ? <i className={icon} onClick={iconClickHandler} /> : <></>}
      </S.ContentContainer>
    </S.StyledCard>
  );
};

export default CardWithToggle;
