import { steps } from '../components/app/app';
import { StepIndex, WidgetActionType, WidgetStateType } from './types';

export const initialStateValue: WidgetStateType = {
  step: 3,
  stepStatuses: [
    { name: 'generalInfo', status: 'finish' },
    { name: 'route', status: 'finish' },
    { name: 'scope', status: 'finish' },
    { name: 'upstream', status: 'process' },
    { name: 'confirmData', status: 'wait' },
  ],
  generalInfo: {
    tag: null,
    owner: '',
    version: '',
    access: null,
    category: null,
    englishName: '',
    persianName: '',
    throughout: null,
  },
  scope: {
    scopeName: '',
    persianScopeName: '',
  },
  route: {
    protocole: '',
    host: '',
    path: '',
    actionOrMethod: '',
  },
  message: null,
};

export const reducer = (state: WidgetStateType, action: WidgetActionType): WidgetStateType | undefined => {
  switch (action.type) {
    case 'NEXT_STEP': {
      if (state.step < steps.length - 1) {
        state.stepStatuses[state.step].status = 'finish';

        const maybeNextStepIndex = state.stepStatuses.findIndex(
          (item) => item.status === 'wait' || item.status === 'error'
        );
        const nextStepIndex = (maybeNextStepIndex !== -1 ? maybeNextStepIndex : steps.length - 1) as StepIndex;

        state.step = nextStepIndex;
        const nextStepStatus = state.stepStatuses[nextStepIndex].status;

        if (nextStepStatus === 'wait') {
          state.stepStatuses[maybeNextStepIndex].status = 'process';
        }
      }
      return undefined;
    }

    case 'PREVIOUS_STEP':
      return state.step > 0 ? void state.step-- : undefined;

    case 'UPDATE_GLOBAL_MESSAGE':
      return void (state.message = action.payload);

    case 'UPDATE_GENERAL_INFO_STEP':
      return void (state.generalInfo = action.payload);

    case 'UPDATE_SCOPE_STEP':
      return void (state.scope = action.payload);

    case 'UPDATE_ROUTE_STEP':
      return void (state.route = action.payload);

    default:
      throw new Error(`this action type is not supported => ${action['type']}`);
  }
};
