import * as S from './third-step.style';
import { useTr } from '@oxygen/translation';
import Header from './header/header';
import MainCard from './main-card/main-card';
import { useGetMainCardQuery } from '../../services';
import { Loading } from '@oxygen/ui-kit';
import { PageProps } from '@oxygen/types';
type ThirdStepProps = PageProps & {
  //
};

export const ThirdStep: React.FC<ThirdStepProps> = (props) => {
  const { data, isFetching } = useGetMainCardQuery();

  return (
    <S.ThirdStepContainer>
      <Header />
      <Loading spinning={isFetching} />
      {data?.map((item) => (
        <MainCard key={item.idx} {...item} />
      ))}
    </S.ThirdStepContainer>
  );
};
