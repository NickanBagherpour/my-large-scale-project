import { ActiveSelect } from '../../../active-select/active-select';
import { useUpstreamCardDetailsQuery } from '../../../../../services/upstream-tab/upstream-card-details';

import * as S from './card-detail.style';

export const CardDetail = () => {
  const params = {};
  const { data, isFetching } = useUpstreamCardDetailsQuery(params);

  return (
    <S.DetailContainer>
      <ActiveSelect data={data} loading={isFetching} />
    </S.DetailContainer>
  );
};
