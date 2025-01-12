import React, { useState } from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';

import { useAppDispatch, useAppState } from '../../context';
//import { useGetReportDataQuery } from '../../services';

import styled from 'styled-components';
import { Loading } from '@oxygen/ui-kit';
import { reportUrlList } from '../../utils/consts';

import * as S from './app.style';
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
  height: 100%;
  border: none;
`;
const App: React.FC<AppProps> = (props) => {
  // const [reportUrl,setReportUrl]  = useState();
  const id = Number(props?.parentProps?.params?.['id']) as keyof typeof reportUrlList;
  const reportUrl = getReportUrl(id);

  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();
  const [loading, setLoading] = useState(true);
  /* Sample Query Usage
  const { data, isFetching, isError } = useGetReportDataQuery(prepareParams());

  function prepareParams() {
     const { filters,submit,pagination,...rest } = state;
     const params = {
       form: submit,
       pagination: pagination,
     };

     return params;
   }
 */
  console.log('reportUrl', props);

  function getReportUrl(id: keyof typeof reportUrlList) {
    const theme = 'light';
    const urlPostfix = `#theme=${theme}&bordered=false&titled=false`;

    switch (id) {
      case 1:
        return `${reportUrlList[1]}${urlPostfix}`;
      case 2:
        return `${reportUrlList[2]}${urlPostfix}`;
      default: {
        const _exhaustiveCheck: never = id;
        return _exhaustiveCheck;
      }
    }
  }

  return (
    <>
      {loading && <Loading containerProps={{ display: 'flex', height: '100%' }} />}
      <StyledIframe src={reportUrl} onLoad={() => setLoading(false)} style={{ display: loading ? 'none' : 'block' }} />
    </>
  );
};

export default App;
