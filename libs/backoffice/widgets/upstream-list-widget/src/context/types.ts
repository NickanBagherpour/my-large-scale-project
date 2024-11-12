import * as React from 'react';
import { FormFieldsType } from '../types';
import { MessageType, Nullable } from '@oxygen/types';

export type FiltersType = FormFieldsType;

export type WidgetStateType = {
  searchTerm: string;
  page: number;
  message: Nullable<MessageType>;
};

export type WidgetActionType =
  | {
      type: 'UPDATE_GLOBAL_MESSAGE';
      payload: Nullable<MessageType>;
    }
  | {
      type: 'UPDATE_SEARCH_TERM';
      payload: WidgetStateType['searchTerm'];
    }
  | {
      type: 'UPDATE_PAGINATION';
    };

export type WidgetDispatchType = React.Dispatch<WidgetActionType>;
