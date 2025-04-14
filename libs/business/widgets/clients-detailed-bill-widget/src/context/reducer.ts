import { WidgetActionType, WidgetStateType } from './types';

export const initialStateValue: WidgetStateType = {
  sort: 'newest',
  clientType: 'all',
  searchTerm: '',
  message: null,
};

export const reducer = (state: WidgetStateType, action: WidgetActionType): WidgetStateType | undefined => {
  switch (action.type) {
    case 'UPDATE_GLOBAL_MESSAGE': {
      state.message = action.payload;
      return;
    }

    case 'UPDATE_SORT':
      return void (state.sort = action.payload);

    case 'UPDATE_CLIENT_TYPE':
      return void (state.clientType = action.payload);

    case 'UPDATE_SEARCH_TERM':
      return void (state.searchTerm = action.payload);

    default:
      throw new Error(`this action type is not supported => ${action['type']}`);
  }
};
