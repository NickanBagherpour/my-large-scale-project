import { useTr } from '@oxygen/translation';

import * as S from './fourth-step.style';
import { Button } from '@oxygen/ui-kit';
import { useRouter } from 'next/navigation';

export default function FourthStep(props) {
  const { setCurrentStep } = props;
  const [t] = useTr();
  const router = useRouter();

  const handleReturn = () => {
    setCurrentStep((perv) => perv - 1);
  };

  const handleSubmit = () => {
    router.push('/client-list');
  };

  return (
    <>
      <S.FourthStepContainer>
        <S.Header>{`${t('step_four.client_tariff')}`}</S.Header>
        <div>
          <S.Para>{`${t('step_four.tariff')}`}</S.Para>
          <S.StyleInput />
        </div>
      </S.FourthStepContainer>
      <S.Footer>
        <Button variant={'outlined'} onClick={handleReturn}>
          {t('return')}
        </Button>
        <Button htmlType={'submit'} onClick={handleSubmit}>
          {t('step_four.final_client_registration')}
        </Button>
      </S.Footer>
    </>
  );
}
