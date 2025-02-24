import React, { useEffect, useRef, useState } from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';

// import { useAppDispatch, useAppState } from '../../context';

import styled, { useTheme } from 'styled-components';
import { Loading } from '@oxygen/ui-kit';

type AppProps = PageProps & {
  //
};

const StyledIframe = styled.iframe`
  width: 100%;
  min-height: 1400px;
  border: none;
`;

const App: React.FC<AppProps> = (props) => {
  const [t] = useTr();
  const [loading, setLoading] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const reportUrl = props.parentProps?.reportUrl as string; //getReportUrl(1, theme.id === 'light' ? 'light' : 'night');

  console.log('reportUrl', reportUrl);

  return (
    <>
      {loading && <Loading containerProps={{ display: 'flex', height: '100%' }} />}
      <StyledIframe
        ref={iframeRef}
        src={reportUrl}
        onLoad={() => {
          // console.log('loaded');
          setLoading(false);
        }}
        style={{ display: loading ? 'none' : 'block' }}
      />
    </>
  );
};

export default App;
