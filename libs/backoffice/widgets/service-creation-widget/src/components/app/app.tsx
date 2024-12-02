import { ReactNode } from 'react';

import { useTr } from '@oxygen/translation';
import { Container } from '@oxygen/ui-kit';
import { GlobalMessageContainer } from '@oxygen/reusable-components';

import GeneralInfo from '../general-info/general-info';
import { resetMessageAction, useAppDispatch, useAppState } from '../../context';
import { Step } from '../../context/types';
import Scope from '../scope/scope';
import UploadDocs from '../upload-docs/upload-docs';

import * as S from './app.style';

const steps: Record<Step, ReactNode> = {
  0: <GeneralInfo />,
  1: <Scope />,
  2: <UploadDocs />,
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
        items={[{ title: t('general_info') }, { title: t('scope') }, { title: t('upload_docs') }]}
      />
      {steps[step]}
    </Container>
  );
};

export default App;
