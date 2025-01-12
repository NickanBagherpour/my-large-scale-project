import React, { useEffect, useRef, useState } from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';

import { useAppDispatch, useAppState } from '../../context';
//import { useGetReportDataQuery } from '../../services';

import styled, { useTheme } from 'styled-components';
import { Loading } from '@oxygen/ui-kit';
import { reportUrlList } from '../../utils/consts';

type AppProps = PageProps & {
  //
};
const Container = styled.section`
  width: 100%;
  height: 100%;
  position: relative;
`;

const StyledIframe = styled.iframe`
  width: 100%;
  min-height: 1400px;
  border: none;
`;
const App: React.FC<AppProps> = (props) => {
  // const id = Number(props?.parentProps?.params?.['id']) as keyof typeof reportUrlList;
  // const reportUrl = getReportUrl(id);

  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();
  const [loading, setLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const theme = useTheme();
  console.log('theme', theme);
  const reportUrl = getReportUrl(1, theme.id === 'light' ? 'light' : 'night');

  // useEffect(() => {
  //   if (!loading) changeIframeElementStyle(iframeRef.current, 'iframe footer', 'display:none');
  // }, [loading]);

  useEffect(() => {
    setLoading(true);
  }, [theme.id]);

  function getReportUrl(id: keyof typeof reportUrlList, theme = 'light') {
    const urlPostfix = `#theme=${theme}&bordered=false&titled=false`;

    switch (id) {
      case 1:
        return `${reportUrlList[id]}${urlPostfix}`;
      case 2:
        return `${reportUrlList[id]}${urlPostfix}`;
      default: {
        const _exhaustiveCheck: never = id;
        return _exhaustiveCheck;
      }
    }
  }

  return (
    <>
      {loading && <Loading containerProps={{ display: 'flex', height: '100%' }} />}
      <StyledIframe
        ref={iframeRef}
        src={reportUrl}
        onLoad={() => {
          console.log('loaded');
          setLoading(false);
        }}
        style={{ display: loading ? 'none' : 'block' }}
      />
    </>
  );
};

export default App;
