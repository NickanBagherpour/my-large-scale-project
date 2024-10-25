'use client';

import React, { ReactNode, useEffect, useRef, useState } from 'react';

import { BasicComponentProps, Direction } from '@oxygen/types';
import { useAppTheme } from '@oxygen/hooks';
import { uuid } from '@oxygen/utils';

import { StyledContainer } from './message-box.style';
import Link from 'next/link';
import { AlertProps } from '../alert/alert';
import { useRouter } from 'next/navigation';

type LinkTargetType = '_self' | '_blank';

export type MessageBoxProps = BasicComponentProps &
  AlertProps & {
    // message?: string;
    // kind?: MessageKindType;
    // dismissible?: boolean;
    linkProps?: {
      title: string;
      url: string;
      target?: LinkTargetType;
      icon?: ReactNode;
      samePath?: boolean;
    };
    shouldScroll?: boolean;
    once?: boolean;
    margin?: string /*import('csstype').Property.Margin<string | number> | undefined*/;
    onClose?: React.MouseEventHandler<HTMLButtonElement>;
  };

export type I$MessageBoxProps = MessageBoxProps;

export const MessageBox: React.FC<I$MessageBoxProps> = (props) => {
  const {
    linkProps,
    shouldScroll = false,
    margin = '0',
    once = false,
    showIcon = true,
    children,
    description,
    onClose,
    ...rest
  } = props;

  const theme = useAppTheme();

  const router = useRouter();

  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldScroll && props.message) {
      setTimeout(() => {
        mainRef?.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
        // window.scroll(0,mainRef.current.offsetTop);
      }, 200);
    }
  }, [props.message, shouldScroll]);

  if (!props.message || props.message.toString().trim().length === 0) {
    return null;
  }

  function generateLink() {
    if (!linkProps) return null;

    const { title = '', url = '#', target = '_self', icon, samePath = false } = linkProps;

    const handleLinkClick = (e) => {
      // Check if the clicked URL is the same as the current URL
      if (samePath) {
        router.refresh();
      }
    };

    const _icon =
      icon ??
      (theme.direction === Direction.LTR ? (
        <i className={'ri-arrow-right-s-line'} />
      ) : (
        <i className={'ri-arrow-left-s-line'} />
      ));
    return (
      <Link
        className='message-box__link'
        href={url}
        target={target}
        onClick={handleLinkClick}
        style={{ color: theme.primary.main }}
      >
        {title}

        <span>{_icon}</span>
      </Link>
    );
  }

  function generateDescription() {
    return (
      <>
        {description}
        {children}
        {generateLink()}
      </>
    );
  }

  function handleDismiss(e) {
    // setVisible(false);
    if (onClose) {
      onClose(e);
    }
  }

  return (
    <div ref={mainRef} style={{ margin: margin }} id={`message-box-${uuid()}`}>
      <StyledContainer showIcon={showIcon} description={generateDescription()} onClose={handleDismiss} {...rest} />
    </div>
  );
};
