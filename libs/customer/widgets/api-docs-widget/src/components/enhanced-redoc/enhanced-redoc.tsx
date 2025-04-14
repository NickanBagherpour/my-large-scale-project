'use client';

import { useEffect, useState } from 'react';
import { RedocStandalone, SideNavStyleEnum } from 'redoc';
import { cssVar } from '@oxygen/utils';
import { useAppTheme } from '@oxygen/hooks';
import { RedocWrapper } from '../redoc-wrapper/redoc-wrapper';
import { useRtlRedoc } from '../../hooks/use-rtl-redoc';
import { useTr } from '@oxygen/translation';

interface EnhancedRedocProps {
  specUrl?: string;
  specObject?: any;
}

export function EnhancedRedoc({ specUrl, specObject }: EnhancedRedocProps) {
  const [spec, setSpec] = useState<any>(specObject);
  const theme = useAppTheme();
  const [t] = useTr();

  useEffect(() => {
    if (specObject) {
      setSpec(specObject);
      return;
    }

    if (specUrl) {
      fetch(specUrl)
        .then((response) => response.json())
        .then((data) => {
          setSpec(data);
        })
        .catch((error) => {
          console.error('Error loading OpenAPI spec:', error);
        });
    }
  }, [specUrl, specObject]);

  if (!spec) {
    return <div>Loading API documentation...</div>;
  }

  return (
    <RedocWrapper>
      <RedocStandalone
        spec={spec}
        options={{
          nativeScrollbars: true,
          hideDownloadButton: true,
          disableSearch: true,
          hideLoading: true,
          sideNavStyle: SideNavStyleEnum.SummaryOnly,
          sortRequiredPropsFirst: true,
          labels: {
            example: t('example'),
            examples: t('examples'),
            noResultsFound: t('no_results_found'),
            download: t('download'),
            responses: t('responses'),
            requestSamples: t('request_samples'),
            responseSamples: t('response_samples'),
          },
          theme: {
            colors: {
              primary: {
                main: theme.primary.main,
              },
              text: {
                primary: theme.text.primary,
                secondary: theme.text.secondary,
              },
            },
            typography: {
              fontSize: '14px',
              headings: {
                fontFamily: `var(${cssVar.iransansFont}), system-ui, sans-serif`,
              },
              fontFamily: `var(${cssVar.iransansFont}), system-ui, sans-serif`,
              optimizeSpeed: true,
              smoothing: 'antialiased',
            },
            sidebar: {
              width: '300px',
            },
            rightPanel: {
              // backgroundColor: "#f6f8fa",
            },
          },
        }}
      />
    </RedocWrapper>
  );
}
