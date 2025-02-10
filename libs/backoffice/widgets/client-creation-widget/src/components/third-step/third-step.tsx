import { Button } from '@oxygen/ui-kit';
import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { Plugins } from '@oxygen/reusable-components';

import { useGetMainCardQuery } from '../../services';
import { useAppDispatch, useAppState } from '../../context';

import * as S from './third-step.style';

type ThirdStepProps = PageProps & {
  setCurrentStep: any;
};

export const ThirdStep: React.FC<ThirdStepProps> = (props) => {
  const { setCurrentStep } = props;
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  const { data, isFetching } = useGetMainCardQuery();
  const handleReturn = () => {
    setCurrentStep((perv) => perv - 1);
  };

  const handleSubmit = () => {
    console.log('form submited');
  };
  const clientName = state.clientName!;
  return (
    <S.ThirdStepContainer>
      <Plugins clientName={clientName} dispatch={dispatch} />
      <S.Footer>
        <Button variant={'outlined'} onClick={handleReturn}>
          {t('return')}
        </Button>
        <Button htmlType={'submit'} onClick={handleSubmit} loading={isFetching}>
          {t('submit_info')}
          <i className={'icon-arrow-left'}></i>
        </Button>
      </S.Footer>
    </S.ThirdStepContainer>
  );
};
