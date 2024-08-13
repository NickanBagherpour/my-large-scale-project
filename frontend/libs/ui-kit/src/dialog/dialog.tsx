import { DialogActions, DialogContent, IconButton, DialogProps as MuiDialogProps } from '@mui/material';
import React, { ReactNode } from 'react';

import * as S from './dialog.style';

export type DialogProps = MuiDialogProps & {
  buttons?: ReactNode[];
};

const Dialog: React.FC<DialogProps> = (props) => {
  const { open, onClose, title = '', maxWidth = 'sm', fullWidth = true, children, ...rest } = props;

  if (!open) return <></>;

  function handleCloseClick(event, reason) {
    if (onClose) {
      onClose(event, reason);
    }
  }

  return (
    <S.Dialog
      open={open}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      onClose={handleCloseClick}
      {...rest}
      className='dialog__container'
    >
      {title && (
        <div className='dialog__header'>
          <span className={'dialog__header--title'}>{title}</span>
          <span className={'dialog__header--close-button'}>
            <IconButton aria-label='close' onClick={(e) => handleCloseClick(e, {})}>
              <i className='icon-close' />
            </IconButton>
          </span>
        </div>
      )}

      <DialogContent className='dialog__content'>{children}</DialogContent>

      {props?.buttons && (
        <DialogActions>
          {props?.buttons?.map((btn) => {
            return btn;
          })}
        </DialogActions>
      )}
    </S.Dialog>
  );
};
export default Dialog;
