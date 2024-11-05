import * as React from 'react';

import { ErrorMessageType, Nullable } from '@oxygen/types';

import { FormFieldsType } from '../types';

export type FiltersType = FormFieldsType;

export type WidgetStateType = {
  searchTerm: string;
  page: number;
  errorMessage: Nullable<ErrorMessageType>;
};

export type WidgetActionType =
  | {
      type: 'UPDATE_GLOBAL_ERROR_MESSAGE';
      payload: Nullable<ErrorMessageType>;
    }
  | {
      type: 'UPDATE_SEARCH_TERM';
      payload: WidgetStateType['searchTerm'];
    }
  | {
      type: 'UPDATE_PAGINATION';
    };

export type WidgetDispatchType = React.Dispatch<WidgetActionType>;
