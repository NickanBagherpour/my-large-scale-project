import * as React from 'react';

import { MessageType, Nullable } from '@oxygen/types';

import { ClientId, FormFieldsType } from '../types';

export type FiltersType = FormFieldsType;

export type PaginationType = {
  page: number;
  rowsPerPage: number;
};

export type WidgetStateType = {
  table: {
    filters: FiltersType;
    pagination: PaginationType;
    submit: FiltersType;
  };
  message: Nullable<MessageType>;
  clientId: ClientId;
};

export type WidgetActionType =
  | {
      type: 'UPDATE_GLOBAL_MESSAGE';
      payload: Nullable<MessageType>;
    }
  | {
      type: 'UPDATE_FILTERS';
      payload: Partial<FiltersType>;
    }
  | {
      type: 'UPDATE_SUBMIT';
      payload: Partial<FiltersType>;
    }
  | {
      type: 'UPDATE_PAGINATION';
      payload: PaginationType;
    }
  | {
      type: 'UPDATE_CLIENT_ID';
      payload: ClientId;
    };

export type WidgetDispatchType = React.Dispatch<WidgetActionType>;
