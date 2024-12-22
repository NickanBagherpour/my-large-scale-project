import { ActiveSelect } from '../../../active-select/active-select';
import { useUpstreamCardDetailsQuery } from '../../../../../services/upstream-tab/upstream-card-details';

import * as S from './card-detail.style';
import { Table } from '@oxygen/ui-kit';

export const CardDetail = () => {
  const params = {};
  const { data, isFetching } = useUpstreamCardDetailsQuery(params);

  const tableData = [];
  const tableDesctopColumns = [];
  const tableMobileColumns = [];
  return (
    <S.DetailContainer>
      <ActiveSelect data={data} loading={isFetching} />
      <Table dataSource={tableData} mobileColumns={tableDesctopColumns} columns={tableMobileColumns}></Table>
    </S.DetailContainer>
  );
};
