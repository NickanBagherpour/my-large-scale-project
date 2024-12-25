import { useTr } from '@oxygen/translation';
import { Container } from '@oxygen/ui-kit';
import { GlobalMessageContainer } from '@oxygen/reusable-components';
import GeneralInfo from '../general-info/general-info';
import { resetMessageAction, useAppDispatch, useAppState } from '../../context';
import Scope from '../scope/scope';
import * as S from './app.style';
import Route from '../route/route';
import Upstream from '../upstream/upstream';
import ConfirmData from '../confirm-data/confirm-data';
import { useUrlState } from '../../utils/use-url-state';

export const steps = [
  { name: 'generalInfo', title: 'general_info', component: <GeneralInfo /> },
  { name: 'route', title: 'route', component: <Route /> },
  { name: 'scope', title: 'scope', component: <Scope /> },
  { name: 'upstream', title: 'upstream', component: <Upstream /> },
  { name: 'confirmData', title: 'confirm_data', component: <ConfirmData /> },
] as const;

const App = () => {
  const [t] = useTr();
  const { message, stepStatuses } = useAppState();
  const dispatch = useAppDispatch();
  // using the step from url here, this could cause race condition
  const step = useUrlState();

  return (
    <Container title={t('create_new_service')}>
      <GlobalMessageContainer message={message} onClose={() => resetMessageAction(dispatch)} />
      <S.Steps
        current={step}
        items={steps.map(({ title }, idx) => ({
          title: t(title),
          status: stepStatuses[idx].status,
        }))}
      />
      {steps[step].component}
    </Container>
  );
};

export default App;
