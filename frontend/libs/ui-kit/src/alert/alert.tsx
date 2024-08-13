import { css } from '@emotion/react';
import { AlertTitle, Alert as MuiAlert, AlertProps as MuiAlertProps } from '@mui/material';
import React, { useEffect, useRef } from 'react';

import { Box } from '../index';

import styled from '@emotion/styled';

export type AlertProps = MuiAlertProps & {
  bordered?: boolean;
  shouldScroll?: boolean;
  width?: string;
  description?: string;
};

const StyledAlert = styled(MuiAlert)<any>`
  ${(props) => {
    if (props.color === 'info')
      return css`
        background-color: ${props.theme.base.infoBackgroundLight};
      `;

    css``;
  }}

  ${({ theme, severity, bordered }) =>
    bordered &&
    css`
      border: 1px solid ${theme.palette[severity]?.main || theme.palette.primary.main};
    `}
  ${({ width }) =>
    width &&
    css`
      width: ${width};
    `}
  & .MuiAlert-message {
    padding-bottom: 0;
    overflow: hidden;
  }

  & .MuiAlertTitle-root {
    font-size: 1.4rem;
  }

  /* & .MuiBox-root {
    margin-top: 0;
  } */

  margin: 0.5rem 0.5rem 0 0.5rem;
`;

const Alert: React.FC<AlertProps> = (props) => {
  const { children, iconMapping, bordered = false, shouldScroll = false, title, description, ...rest } = props;

  const alertRef = useRef<HTMLDivElement>(null);

  const scrollToAlert = () => {
    if (alertRef.current) {
      alertRef?.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (shouldScroll) {
      scrollToAlert();
    }
  }, [shouldScroll]);

  useEffect(() => {
    if (shouldScroll /*&& props.message*/) {
      setTimeout(() => {
        scrollToAlert();
      }, 100);
    }
  }, [/*props.message,*/ shouldScroll]);

  return (
    <StyledAlert
      ref={alertRef}
      bordered={bordered}
      iconMapping={{
        // success: <i className="icon-receipt-text"/>,
        // warning: <i className="icon-danger"/>,
        // error: <i className="icon-receipt-text"/>,
        // info: <i className="icon-receipt-text"/>,
        ...iconMapping,
      }}
      {...rest}
    >
      {title && <AlertTitle>{title}</AlertTitle>}
      {description && <div>{description}</div>}
      {children && <Box marginTop={'4px'}>{children}</Box>}
    </StyledAlert>
  );
};

export default Alert;
