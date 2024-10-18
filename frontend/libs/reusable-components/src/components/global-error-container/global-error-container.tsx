import React from 'react';
import { Alert, Box, BoxProps } from '@oxygen/ui-kit';
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
      <Alert
        severity={'error'}
        shouldScroll={true}
        description={errorMessage.shouldTranslate ? t(errorMessage.description) : errorMessage.description}
        onClose={onClose}
      />
    </Box>
  );
};

export default GlobalErrorContainer;
