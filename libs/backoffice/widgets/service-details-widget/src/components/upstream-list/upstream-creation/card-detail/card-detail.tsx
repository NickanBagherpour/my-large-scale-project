import { Initial } from '../../initial/initial';
import { useUpstreamCardDetailsQuery } from '../../../../services/upstream-tab/upstream-card-detail';

import * as S from './card-detail.style';

export const CardDetail = () => {
  const params = {};
  const { data, isFetching } = useUpstreamCardDetailsQuery(params);

  return (
    <S.DetailContainer>
      <Initial data={data} loading={isFetching} />
    </S.DetailContainer>
  );
};
