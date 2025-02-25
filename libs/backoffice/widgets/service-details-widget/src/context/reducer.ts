import { initialActiveSelectType } from './types';
import { WidgetActionType, WidgetStateType } from './types';

const initialActiveSelect: initialActiveSelectType = {
  cardId: '',
};

export const initialStateValue: WidgetStateType = {
  serviceName: undefined,
  upstreamTab: {
    activeSelect: initialActiveSelect,
  },
  message: null,
};

export const reducer = (state: WidgetStateType, action: WidgetActionType): WidgetStateType | undefined => {
  //console.log(action.type, state, action);
  switch (action.type) {
    case 'UPDATE_SERVICE_NAME': {
      state.serviceName = action.payload;
      return;
    }

    case 'UPDATE_UPSTREAM': {
      state.upstreamTab.activeSelect = { ...state.upstreamTab.activeSelect, ...action.payload };
      return;
    }

    case 'UPDATE_GLOBAL_MESSAGE': {
      return void (state.message = action.payload);
    }

    default:
      throw new Error(`this action type is not supported => ${action['type']}`);
  }
};
