import React, { useEffect, useState } from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps, UserRole } from '@oxygen/types';

//import { useGetReportDataQuery } from '../../services';

import styled, { useTheme } from 'styled-components';
import { Loading } from '@oxygen/ui-kit';
import { reportUrlList } from '../../utils/consts';

import * as S from './app.style';

type AppProps = PageProps & {
  //
  role?: string;
};

const StyledIframe = styled.iframe`
  width: 100%;
  min-height: 2100px;
  border: none;
`;

const App: React.FC<AppProps> = (props) => {
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const userRole = props.parentProps?.role as UserRole;
  const reportUrl = getReportUrl(userRole, theme.id === 'light' ? 'light' : 'night');

  useEffect(() => {
    setLoading(true);
  }, [theme.id]);

  function getReportUrl(userRole: UserRole, theme = 'light') {
    const urlPostfix = `#theme=${theme}&bordered=false&titled=false`;
    return `${reportUrlList[userRole]}${urlPostfix}`;
  }

  return (
    <>
      {loading && <Loading containerProps={{ display: 'flex', height: '100%' }} />}
      <StyledIframe src={reportUrl} onLoad={() => setLoading(false)} style={{ display: loading ? 'none' : 'block' }} />
    </>
  );
};

export default App;
