import { ReactNode } from 'react';
import { useTr } from '@oxygen/translation';
import { Container } from '@oxygen/ui-kit';
import { GlobalMessageContainer } from '@oxygen/reusable-components';
import GeneralInfo from '../general-info/general-info';
import { resetMessageAction, useAppDispatch, useAppState } from '../../context';
import { Step } from '../../context/types';
import Scope from '../scope/scope';
import * as S from './app.style';
import Route from '../route/route';
import Upstream from '../upstream/upstream';
import ConfirmData from '../confirm-data/confirm-data';

const steps: Record<Step, ReactNode> = {
  0: <GeneralInfo />,
  1: <Scope />,
  2: <Upstream />,
  3: <Route />,
  4: <ConfirmData />,
};

const App = () => {
  const [t] = useTr();
  const { step, message } = useAppState();
  const dispatch = useAppDispatch();

  return (
    <Container title={t('create_new_service')}>
      <GlobalMessageContainer message={message} onClose={() => resetMessageAction(dispatch)} />
      <S.Steps
        current={step}
        items={[
          { title: t('general_info') },
          { title: t('scope') },
          { title: t('upstream') },
          { title: t('route') },
          { title: t('confirm_data') },
        ]}
      />
      {steps[step]}
    </Container>
  );
};

export default App;
