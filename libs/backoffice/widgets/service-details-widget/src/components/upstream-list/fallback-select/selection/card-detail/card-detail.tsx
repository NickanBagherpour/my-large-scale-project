import { UpstreamDetails } from '../../../upstream-details/upstream-details';
import { useUpstreamCardDetailsQuery } from '../../../../../services/upstream-tab/get-upstream-card-details';

import * as S from './card-detail.style';
export type CardDetailPropsType = {
  id: string | number;
};
export const CardDetail = (props: CardDetailPropsType) => {
  const { id } = props;

  const queryParams = id;

  const { data, isFetching } = useUpstreamCardDetailsQuery(queryParams);

  const tableData = data?.targets;
  const infoBoxData = { englishName: data?.name, persianName: data?.description };

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
