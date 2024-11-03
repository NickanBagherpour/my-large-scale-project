import * as S from './app.style';
import { useTr } from '@oxygen/translation';
import GetInfo from '../get-info/get-info';
import { useAppState } from '../../context';
import { Step } from '../../context/types';
import { ReactNode } from 'react';
import AddScope from '../add-scope/add-scope';
import UploadDocs from '../upload-docs/upload-docs';

const steps: Record<Step, ReactNode> = {
  0: <GetInfo />,
  1: <AddScope />,
  2: <UploadDocs />,
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
