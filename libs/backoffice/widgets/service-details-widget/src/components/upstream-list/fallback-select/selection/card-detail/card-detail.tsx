import { UpstreamDetails } from '../../../upstream-details/upstream-details';
import { useUpstreamCardDetailsQuery } from '../../../../../services/upstream-tab/upstream-card-details';

import * as S from './card-detail.style';

export const CardDetail = () => {
  const params = {};
  const { data, isFetching } = useUpstreamCardDetailsQuery(params);
  const tableData = data?.content;
  const infoBoxData = data?.content;
  return (
    <S.DetailContainer>
      <UpstreamDetails
        tableLoading={isFetching}
        tableData={tableData}
        infoBoxData={infoBoxData}
        infoBoxLoading={isFetching}
      />
    </S.DetailContainer>
  );
};
