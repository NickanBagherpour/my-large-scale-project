import React, { useState } from 'react';

import { PageProps } from '@oxygen/types';
import { CallRateChart } from '@oxygen/reusable-components';
import { useTr } from '@oxygen/translation';

import { useGetServiceChartDataQuery } from '../../services';
import ReportCard from '../reports/report-card';
import TopMetricsCard from '../top-metrics/top-metrics-card';
import FeeStatus from '../status-cards/fee-status';
import RequestStatus from '../status-cards/request-status';

import * as S from './app.style';
import { Skeleton } from 'antd';

type AppProps = PageProps & {
  //
  role?: string;
};

const App: React.FC<AppProps> = (props) => {
  const [timeSelection, setTimeSelection] = useState(4);
  const { data, refetch, isFetching, isPending, isLoading } = useGetServiceChartDataQuery(timeSelection);
  const handleChangeTimeSelection = (value: number) => setTimeSelection(value);
  const [t] = useTr();
  return (
    <>
      <S.PageTitle>{t('common.dashboard')}</S.PageTitle>
      <CallRateChart
        isLoading={isFetching || isPending || isLoading}
        data={data}
        timeSelection={timeSelection}
        onChangeTimeSelection={handleChangeTimeSelection}
        refetchData={refetch}
      />
      <S.CardsWrapper>
        <ReportCard />
        <TopMetricsCard />
        <S.StackedCards>
          <FeeStatus />
          <RequestStatus />
        </S.StackedCards>
      </S.CardsWrapper>
    </>
  );
};

export default App;
