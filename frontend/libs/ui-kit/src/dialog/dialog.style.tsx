import { Dialog as MuiDialog } from '@mui/material';

import styled from '@emotion/styled';

export const Dialog = styled(MuiDialog)<any>`
  margin-top: 10rem;

  & .MuiDialog-paperWidthSm,
  .MuiDialog-paperFullWidth {
    border-radius: 2.5rem;
  }

  & .dialog__header {
    display: flex;
    align-items: center;
    padding: 4rem 4rem 1rem 4rem;

    & .dialog__header--title {
      font-size: 1.6rem;
      font-weight: 500;
      color: ${(p) => p.theme.base.textPrimary};

      flex-grow: 1;
    }

    & .dialog__header--close-button {
      button {
        color: inherit;
      }
    }
  }

  & .dialog__content {
    padding: 1rem 4rem 4rem 4rem;
  }

  & .MuiDialogActions-root {
    padding: 2.4rem;
  }
`;
