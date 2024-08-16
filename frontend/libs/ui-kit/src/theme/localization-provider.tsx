import { LocalizationProvider as MuiLocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali';
import { faIR } from '@mui/x-date-pickers/locales';

import { Locale } from '@oxygen-portal/types';

export const LocalizationProvider = ({ children, locale }) => {

  let dateAdapter;
  let localeText;
  let dateFormats;

  switch (locale) {
    case Locale.EN_US: // Gregorian
      dateAdapter = AdapterDateFns;
      localeText = undefined; // Use default locale text for English
      dateFormats = {};
      break;
    default: // Fallback to Jalali
      dateAdapter = AdapterDateFnsJalali;
      localeText = faIR.components.MuiLocalizationProvider.defaultProps.localeText;
      dateFormats = {
        monthShort: 'MMMM',
      };
  }

  return (
    <MuiLocalizationProvider
      dateAdapter={dateAdapter}
      localeText={localeText}
      dateFormats={dateFormats}
    >
      {children}
    </MuiLocalizationProvider>
  );
};

export default LocalizationProvider;
