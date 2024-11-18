import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { Button, Loading } from '@oxygen/ui-kit';

import Header from './header/header';
import MainCard from './main-card/main-card';
import { useGetMainCardQuery } from '../../services';

import * as S from './third-step.style';

type ThirdStepProps = PageProps & {
  setCurrentStep: any;
};

export const ThirdStep: React.FC<ThirdStepProps> = (props) => {
  const { setCurrentStep } = props;
  const [t] = useTr();
  const { data, isFetching } = useGetMainCardQuery();
  const handleReturn = () => {
    setCurrentStep((perv) => perv - 1);
  };

  const handleSubmit = () => {
    setCurrentStep((perv) => perv + 1);
  };

  return (
    <>
      <S.ThirdStepContainer>
        <Header />
        <Loading spinning={isFetching} />
        {data?.map((item) => (
          <MainCard key={item.idx} {...item} />
        ))}
      </S.ThirdStepContainer>
      <S.Footer>
        <Button variant={'outlined'} onClick={handleReturn}>
          {t('return')}
        </Button>
        <Button htmlType={'submit'} onClick={handleSubmit}>
          {t('submit_info')}
          <i className={'icon-arrow-left'}></i>
        </Button>
      </S.Footer>
    </>
  );
};
