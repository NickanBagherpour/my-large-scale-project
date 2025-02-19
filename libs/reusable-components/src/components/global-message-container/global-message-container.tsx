'use client';

import React, { useEffect } from 'react';
import { App } from 'antd';
import { Box, BoxProps, MessageBox } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { MessageType, Nullable } from '@oxygen/types';
import { useApp } from '@oxygen/hooks';

interface GlobalMessageContainerProps {
  message?: Nullable<MessageType>;
  containerProps?: BoxProps;
  isAlert?: boolean;
  onClose?: () => void;
}

const GlobalMessageContainer: React.FC<GlobalMessageContainerProps> = ({
  onClose,
  message,
  containerProps = {},
  isAlert = false,
}) => {
  const [t] = useTr();

  const { notification } = useApp();

  useEffect(() => {
    if (message && !isAlert) {
      notification.open({
        message: message.shouldTranslate ? t(message.title || '') : message.title,
        description: message.shouldTranslate ? t(message.description) : message.description,
        type: message.type || 'error',
        duration: message.fields ? 10 : 5,
        onClose: onClose,
      });
    }
  }, [JSON.stringify(message)]);

  if (!message) return null;

  return isAlert ? (
    <App>
      <Box {...containerProps}>
        <MessageBox
          type={message.type || 'error'}
          shouldScroll={true}
          description={message.shouldTranslate ? t(message.description) : message.description}
          onClose={onClose}
          closable={!!onClose}
          message={message.shouldTranslate ? t(message.title || '') : message.title}
        />
      </Box>
    </App>
  ) : null;
};

export default GlobalMessageContainer;
