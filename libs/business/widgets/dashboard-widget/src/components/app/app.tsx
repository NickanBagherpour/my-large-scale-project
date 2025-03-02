import React, { useState } from 'react';

import { PageProps } from '@oxygen/types';
import { Container } from '@oxygen/ui-kit';
import { CallRateChart } from '@oxygen/reusable-components';

import InfoCards from '../cards/info-cards';
import { useGetServiceChartDataQuery } from '../../services';

type AppProps = PageProps & {
  //
  role?: string;
};

const App: React.FC<AppProps> = (props) => {
  const [timeSelection, setTimeSelection] = useState(4);
  const { data, refetch, isFetching, isPending, isLoading } = useGetServiceChartDataQuery(timeSelection);
  const handleChangeTimeSelection = (value: number) => setTimeSelection(value);
  return (
    <>
      <Container fillContainer={false}>
        <InfoCards />
      </Container>
      <Container fillContainer={true}>
        <CallRateChart
          isLoading={isFetching || isPending || isLoading}
          data={data}
          timeSelection={timeSelection}
          onChangeTimeSelection={handleChangeTimeSelection}
          refetchData={refetch}
        />
      </Container>
    </>
  );
};

export default App;
