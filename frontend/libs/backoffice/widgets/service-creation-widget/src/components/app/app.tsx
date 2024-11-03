import * as S from './app.style';
import { useTr } from '@oxygen/translation';
import GetInfo from '../get-info/get-info';
import { useAppState } from '../../context';
import { Step } from '../../context/types';
import { ReactNode } from 'react';

const steps: Record<Step, ReactNode> = {
  0: <GetInfo />,
  1: <div>Adding Scope</div>,
  2: <div>Load Docs</div>,
};

const App = () => {
  const [t] = useTr();
  const { step } = useAppState();

  return (
    <S.AppContainer title={t('enter_service')}>
      <S.Steps
        current={step}
        items={[{ title: t('get_info') }, { title: t('add_scope') }, { title: t('upload_docs') }]}
      />
      {steps[step]}
    </S.AppContainer>
  );
};

export default App;
