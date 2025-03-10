'use client';

import { useEffect, useState } from 'react';
import { RedocStandalone, SideNavStyleEnum } from 'redoc';
import { cssVar } from '@oxygen/utils';
import { useAppTheme } from '@oxygen/hooks';

import * as S from './style';

export default function ApiDocs() {
  const [spec, setSpec] = useState(null);
  const theme = useAppTheme();

  useEffect(() => {
    // Import the JSON file directly
    import('./swagger.json')
      .then((module) => {
        setSpec(module.default);
      })
      .catch((error) => {
        console.error('Error loading OpenAPI spec:', error);
      });
  }, []);

  return (
    <S.DocsContainer>
      {spec ? (
        <RedocStandalone
          i18nIsDynamicList={false}
          spec={spec}
          options={{
            nativeScrollbars: true,
            hideDownloadButton: true,
            disableSearch: true,
            sideNavStyle: SideNavStyleEnum.SummaryOnly,
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
                width: '260px',
              },
              rightPanel: {
                // backgroundColor: "#f6f8fa",
              },
            },
          }}
        />
      ) : (
        <p>Loading API documentation...</p>
      )}
    </S.DocsContainer>
  );
}

