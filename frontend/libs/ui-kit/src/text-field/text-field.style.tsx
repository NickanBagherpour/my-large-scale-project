import { TextField as MuiTextField, css, styled } from '@mui/material';

import { respondTo } from '@oxygen-portal/utils';

export const StyledTextField = styled(MuiTextField)<any>`
  & .MuiInputBase-input {
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
  }

  & textarea.MuiInputBase-input {
    padding-top: 0;
    padding-bottom: 0;
  }

  & .MuiInputLabel-root {
    line-height: 1.7rem;
  }
  ${respondTo.down('md')} {
    & .MuiInputLabel-root {
      line-height: 1.2rem;
      overflow: visible;
    }
  }

  & .MuiInputBase-inputSizeSmall {
    padding-top: 0.85rem;
    padding-bottom: 0.85rem;
  }

  & .MuiInputBase-sizeSmall {
    line-height: 3.1rem;
  }

  & > div.MuiInputBase-root.Mui-focused > button {
    color: ${(p) => p.theme.base.primary};
  }

  & > div.MuiInputBase-root > button {
    padding: 0;
  }
`;
