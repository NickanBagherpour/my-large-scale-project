import { Select as MuiSelect, InputLabel as MuiInputLabel, styled } from '@mui/material';

export const Select = styled(MuiSelect)<any>`
  .select-open {
    animation: rotate180steps 0.3s ease-in-out;
    transform: rotate(180deg);
  }

  @keyframes rotate180steps {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(180deg);
    }
  }
`;

export const InputLabel = styled(MuiInputLabel)<any>`
  background-color: ${(p) => p.theme.base.surface};
  padding: 0 5px;
`;
