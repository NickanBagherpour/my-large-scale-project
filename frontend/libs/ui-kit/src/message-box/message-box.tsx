import React, { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';

// import { Cancel, CheckCircle, ChevronLeft, Close, Info } from '@mui/icons-material';
import { IconButton, Link } from '@mui/material';

import { uuid } from '@oxygen-portal/utils';

import { useAppTheme } from '@oxygen-portal/hooks';
import { BasicComponentProps } from '@oxygen-portal/types';
import Box from '../box/box';
import Text from '../text/text';
import { StyledContainer } from './message-box.style';

type LinkTargetType = '_self' | '_blank';
type MessageKindType = 'success' | 'error' | 'info' | 'warning' | undefined;

export type MessageBoxProps = BasicComponentProps & {
  message?: string;
  kind?: MessageKindType;
  dismissible?: boolean;
  linkTitle?: string;
  linkUrl?: string;
  linkTarget?: LinkTargetType;
  linkIcon?: ReactNode;
  shouldScroll?: boolean;
  once?: boolean;
  margin?: CSSProperties['margin'];
  onDismiss?: () => void;
};

export type $MessageBoxProps = MessageBoxProps;

const MessageBox: React.FC<$MessageBoxProps> = (props) => {
  const {
    message = null,
    kind = 'info',
    dismissible = true,
    linkTitle = null,
    linkUrl = null,
    linkTarget = '_self',
    linkIcon = undefined,
    shouldScroll = false,
    margin = '0',
    once = false,
  } = props;

  const theme = useAppTheme();

  const [visible, setVisible] = useState<boolean>(true);
  const mainRef = useRef<HTMLDivElement>(null);
  const [result, setResult] = useState<string | null>(null);

  const bgColor: any = {
    error: theme.base.errorBackground,
    success: theme.base.successBackground,
    info: theme.base.infoBackground,
  };

  const iconColor: any = {
    error: theme.base.error,
    success: theme.base.success,
    info: theme.base.info,
  };

  useEffect(() => {
    setResult(message);

    if (shouldScroll && message) {
      setTimeout(() => {
        mainRef?.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
        // window.scroll(0,mainRef.current.offsetTop);
      }, 100);
    }
  }, [message, shouldScroll]);

  const handleCloseClick = (event: React.MouseEvent<any>) => {
    setVisible(false);
    setResult(null);
    if (props.onDismiss) props.onDismiss();
  };

  const handleLinkClick = (event: React.MouseEvent<any>) => {
    event.preventDefault();
    // window.location.replace(messageLinkUrl);
    window.open(linkUrl || '', linkTarget);
  };

  if (once && !visible) {
    return null;
  }

  if (!result || result.toString().trim().length === 0) {
    return null;
  }

  return (
    <div ref={mainRef} style={{ margin: margin }} id={`message-box-${uuid()}`}>
      <StyledContainer style={{ backgroundColor: bgColor[kind] }}>
        <Box className='message-box-container__top-row'>
          <Box fontSize='2.4rem' color={iconColor[kind]}>
            {kind === 'error' ? (
                <i className='ri-close-circle-fill' />
              ) : // <Cancel style={{ color: iconColor[kind], height: '2rem' }} />
              kind === 'success' ? (
                // <CheckCircle style={{ color: iconColor[kind], height: '2rem' }} />
                <i className='ri-checkbox-circle-fill' />
              ) : (
                // <Info style={{ color: iconColor[kind], height: '2rem' }} />
                <i className='ri-information-fill' />
              )}
          </Box>

          <span>
            {result.split('\n').map((line: string, index: number) => (
              <Text
                key={uuid(index)}
                className='message-box-container__top-row__title'
                fontSize='1.4rem'
                fontWeight={500}
                lineHeight={1.5}
              >
                {line ?? ''}
              </Text>
            ))}
          </span>

          {dismissible && (
            <IconButton onClick={handleCloseClick} className='message-box-container__clickable-item'>
              <i className='ri-close-fill' />
            </IconButton>
          )}
        </Box>

        {linkUrl && (
          <Link
            href='#'
            onClick={handleLinkClick}
            className='message-box-container__link-container'
            style={{ color: theme.base.primary }}
          >
            {linkTitle ?? ''}

            <span>{linkIcon || <i className='ri-arrow-drop-left-line' />}</span>
          </Link>
        )}

        {props.children}
      </StyledContainer>
    </div>
  );
};

export default MessageBox;
