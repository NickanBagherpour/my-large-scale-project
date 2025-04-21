import { Flex } from 'antd';
import React, { useState } from 'react';

import { useAppTheme } from '@oxygen/hooks';
import { getCurrentMonthAndYear, getValueOrDash } from '@oxygen/utils';
import { PageProps } from '@oxygen/types';
import { CallRateChart } from '@oxygen/reusable-components';
import { useTr } from '@oxygen/translation';

import { useGetServiceChartDataQuery } from '../../services';
import ReportCard from '../reports/report-card';
import TopMetricsCard from '../top-metrics/top-metrics-card';
import FeeStatus from '../status-cards/fee-status';
import RequestStatus from '../status-cards/request-status';
import { useGetReportCardsDataQuery } from '../../services/get-report-cards.api';
import { useGetAggregatorQuery } from '../../services/get-aggregator.api';
import { useGetFeeDistributionsQuery } from '../../services/get-fee-distributions.api';
import { useGetRequestStatusQuery } from '../../services/get-request-status.api';

import * as S from './app.style';
import { requestData } from 'libs/mockify/src/data/request-data.data';

type AppProps = PageProps & {
  //
  role?: string;
};

const App: React.FC<AppProps> = (props) => {
  const [timeSelection, setTimeSelection] = useState(4);
  const {
    data: chartData,
    refetch: refetchChartData,
    isFetching: isChartFetching,
    isPending: isChartPending,
    isLoading: isChartLoading,
  } = useGetServiceChartDataQuery(timeSelection);
  const { data: aggrigatorData, isPending: isAggregatorDataPending } = useGetAggregatorQuery();
  const { data: feeData, isPending: isFeeDataPending } = useGetFeeDistributionsQuery();
  const { data: requestData, isPending: isRequestDataPending } = useGetRequestStatusQuery();

  const { data: reportData, isPending: isReportPending } = useGetReportCardsDataQuery();
  const handleChangeTimeSelection = (value: number) => setTimeSelection(value);
  const [t] = useTr();
  const theme = useAppTheme();
  let formattedData: any;
  if (chartData) {
    const formattedChartData = chartData?.data?.map((item) => ({
      time: item.time,
      failureCount: item.detail.failureCount,
      successCount: item.detail.successCount,
    }));
    formattedData = { ...chartData, data: formattedChartData };
  }
  const res = reportData?.response;
  const topMertricItems = [
    {
      icon: 'icon-crown-2',
      title: t('customer_with_most_transactions'),
      name: getValueOrDash(res?.mostFinancialConsumer?.persianName),
      value: (
        <Flex gap={2}>
          <span>IRR</span>
          <span>{getValueOrDash(res?.mostFinancialConsumer?.amount)}</span>
        </Flex>
      ),
      color: theme.dashboard.emerald._600,
      backgroundColor: theme.dashboard.emerald._100,
    },
    {
      icon: 'icon-trend-up',
      title: t('customer_with_most_service_call'),
      name: getValueOrDash(res?.mostValuedConsumer.persianName),
      value: getValueOrDash(res?.mostValuedConsumer?.count) + ' ' + t('service_call'),
      color: theme.dashboard.pink._600,
      backgroundColor: theme.dashboard.pink._100,
    },
    {
      icon: 'icon-trend-up',
      title: t('most_called_service'),
      name: getValueOrDash(res?.mostValuedService?.persianName),
      value: getValueOrDash(res?.mostValuedService?.count) + ' ' + t('service_call'),
      color: theme.info._500,
      backgroundColor: theme.dashboard.blue._50,
    },
    {
      icon: 'icon-cup',
      title: t('bank_most_valuable_client'),
      name: getValueOrDash(res?.mostValuableConsumer.persianName),
      value: getValueOrDash(res?.mostValuableConsumer.amount) + ' ' + t('service_call'),
      timeRange: 30,
      color: theme.dashboard.violet._600,
      backgroundColor: theme.dashboard.violet._100,
    },
    {
      icon: 'icon-award',
      title: t('most_valuable_aggrigator'),
      name: getValueOrDash(aggrigatorData?.aggregatorName),
      value: getValueOrDash(aggrigatorData?.sum) + ' ' + t('service_call'),
      timeRange: 30,
      color: theme.warning.main,
      backgroundColor: theme.warning._50,
    },
  ];
  const pieColors = [theme.secondary._400, theme.error._500, theme.primary._500];
  const pieTitles = [t('final_confirmation'), t('waiting_to_confirm'), t('rejected')];
  const pieData = requestData?.map((r, index) => ({
    name: r?.submissionStatus?.title,
    value: r?.statusDistribution?.percentage,
    fill: pieColors[index],
    title: pieTitles[index],
  }));
  const pieTotal = requestData
    ?.map((r) => r.statusDistribution.count)
    ?.reduce((acc, currentVal) => {
      return acc + currentVal;
    });
  return (
    <>
      <S.PageTitle>{t('common.dashboard')}</S.PageTitle>
      <CallRateChart
        isLoading={isChartFetching || isChartPending || isChartLoading}
        data={formattedData}
        timeSelection={timeSelection}
        onChangeTimeSelection={handleChangeTimeSelection}
        refetchData={refetchChartData}
      />
      <S.CardsWrapper>
        <ReportCard data={reportData} loading={isReportPending} />
        <TopMetricsCard topMetricItems={topMertricItems} loading={isReportPending || isAggregatorDataPending} />
        <S.StackedCards>
          <FeeStatus
            date={getCurrentMonthAndYear()}
            loading={isFeeDataPending}
            rightBarData={{
              legendText: t('sadad_share'),
              color: 'orange',
              percent: feeData?.operationShare.feePercentage,
              value: feeData?.operationShare.feeAmount,
            }}
            leftBarData={{
              legendText: t('bank_share'),
              color: 'blue',
              percent: feeData?.bankingShare?.feePercentage,
              value: feeData?.bankingShare?.feeAmount,
            }}
            title={t('fee_status')}
          />
          <RequestStatus
            title={t('request_status')}
            total={pieTotal}
            pieData={pieData}
            loading={isRequestDataPending}
          />
        </S.StackedCards>
      </S.CardsWrapper>
    </>
  );
};

export default App;
