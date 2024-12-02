import { ReactNode } from 'react';

import { useTr } from '@oxygen/translation';
import { Container } from '@oxygen/ui-kit';
import { GlobalMessageContainer } from '@oxygen/reusable-components';

import GeneralInfo from '../general-info/general-info';
import { resetMessageAction, useAppDispatch, useAppState } from '../../context';
import { Step } from '../../context/types';
import AddScope from '../add-scope/add-scope';
import UploadDocs from '../upload-docs/upload-docs';

import * as S from './app.style';

const steps: Record<Step, ReactNode> = {
  0: <GeneralInfo />,
  1: <AddScope />,
  2: <UploadDocs />,
};

const App = () => {
  const [t] = useTr();
  const { step, message } = useAppState();
  const dispatch = useAppDispatch();

  return (
    <Container title={t('enter_service')}>
      <GlobalMessageContainer message={message} onClose={() => resetMessageAction(dispatch)} />
      <S.Steps
        current={step}
        items={[{ title: t('get_info') }, { title: t('add_scope') }, { title: t('upload_docs') }]}
      />
      {steps[step]}
    </Container>
  );
};

export default App;
