import { useTheme } from '@mui/material';

import { ITheme } from '@oxygen-portal/types';

const useAppTheme = (): ITheme => {
  const theme = useTheme();
  return theme as any /*ITheme*/;
};

export default useAppTheme;
