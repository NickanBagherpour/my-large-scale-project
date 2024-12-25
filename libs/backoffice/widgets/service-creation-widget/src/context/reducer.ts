import { steps } from '../components/app/app';
import { StepIndex, WidgetActionType, WidgetStateType } from './types';

export const initialStateValue: WidgetStateType = {
  step: 0,
  serviceName: '',
  stepStatuses: [
    { name: 'generalInfo', status: 'process' },
    { name: 'route', status: 'wait' },
    { name: 'scope', status: 'wait' },
    { name: 'upstream', status: 'wait' },
    { name: 'confirmData', status: 'wait' },
  ],
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

    case 'SYNC_WITH_URL': {
      const {
        payload: { step, serviceName },
      } = action;
      state.serviceName = serviceName;
      state.step = step;
      state.stepStatuses = state.stepStatuses.map((status, idx) => {
        if (idx < step) {
          return { ...status, status: 'finish' };
        } else if (idx === step) {
          return { ...status, status: 'process' };
        } else {
          return { ...status, status: 'wait' };
        }
      });
      return;
    }

    case 'UPDATE_GLOBAL_MESSAGE':
      return void (state.message = action.payload);

    default:
      throw new Error(`this action type is not supported => ${action['type']}`);
  }
};
