import React from 'react';
import { Box, BoxProps, MessageBox } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { ErrorMessageType, Nullable } from '@oxygen/types';

interface GlobalErrorContainerProps {
  onClose?: () => void;
  errorMessage?: Nullable<ErrorMessageType>;
  containerProps?: BoxProps;
}

const GlobalErrorContainer: React.FC<GlobalErrorContainerProps> = ({ onClose, errorMessage, containerProps = {} }) => {
  const [t] = useTr();
  if (!errorMessage) return null;

  return (
    <Box {...containerProps}>
      <MessageBox
        type={'error'}
        shouldScroll={true}
        description={errorMessage?.shouldTranslate ? t(errorMessage?.description) : errorMessage?.description}
        onClose={onClose}
        message={errorMessage?.shouldTranslate ? t(errorMessage?.title || '') : errorMessage?.title}
      />
    </Box>
  );
};

export default GlobalErrorContainer;
