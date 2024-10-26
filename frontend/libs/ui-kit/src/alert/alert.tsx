'use client';

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Alert as AntAlert, AlertProps as AntAlertProps } from 'antd';

export type AlertProps = AntAlertProps & {
  // children?: React.ReactNode;
  shouldScroll?: boolean;
};

const StyledAlert = styled(AntAlert)``;

export const Alert = (props: AlertProps) => {
  const { shouldScroll = false, ...rest } = props;

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

  return <StyledAlert {...rest} />;
};
