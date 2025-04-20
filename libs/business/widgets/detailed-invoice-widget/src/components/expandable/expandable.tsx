import type { TabsProps } from 'antd';
import { useTr } from '@oxygen/translation';
import { useGetFinancialReportQuery, useGetNonFinancialReportQuery } from '../../services';
import { InfoData } from '../../types';
import { getDesktopColumns, getMobileColumns } from '../../utils/expandable-table';
import { useState } from 'react';
import * as S from './expandable.style';
import { TabKey } from '../../types/tabs.type';

type Props = {
  record: InfoData['clientDataList'][number];
  year: number;
  month: number;
};

export default function Expandable(props: Props) {
  const { record, year, month } = props;
  const [t] = useTr();
  const [activeTab, setActiveTab] = useState<TabKey>('financial');

  const onChange = (key: string) => {
    setActiveTab(key as TabKey);
  };

  const { data: finincialData } = useGetFinancialReportQuery({
    params: {
      year,
      month,
      'client-gateway-id': record.gatewayId,
    },
    enabled: activeTab === 'financial',
  });

  const { data: nonfinancialData } = useGetNonFinancialReportQuery({
    params: {
      year,
      month,
      // 'client-gateway-id': '3d44bf7e-c850-4c83-b815-5fdb936ebe9e',
      'client-gateway-id': record.gatewayId,
    },
    enabled: activeTab === 'non_financial',
  });

  const activeData = activeTab === 'financial' ? finincialData : nonfinancialData;

  const desktopColumns = getDesktopColumns({ t, activeTab });
  const mobileColumns = getMobileColumns({ t });

  const table = (
    <>
      <S.Table
        loading={false}
        dataSource={activeData?.slice(0, 10)} // TODO: REMOVE THIS AND ADD PAGINATION
        columns={desktopColumns}
        mobileColumns={mobileColumns}
        rowKey={(row) => JSON.stringify(row)} // TODO: get a unique key from backend, now id is always null
        pagination={false}
      />
      <S.Sum>5,456,789,212,000</S.Sum>
    </>
  );

  const items: TabsProps['items'] = [
    {
      key: 'non_financial',
      label: t('non_financial_services_invoice'),
      children: table,
    },
    {
      key: 'financial',
      label: t('financial_services_invoice'),
      children: table,
    },
  ];

  return <S.Tabs size='small' items={items} onChange={onChange} activeKey={activeTab} />;
}
