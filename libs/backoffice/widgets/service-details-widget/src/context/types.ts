import * as React from 'react';
// import { FormFieldsType } from '../types';
import { MessageType, Nullable } from '@oxygen/types';

export type FiltersType = FormFieldsType;

export type FormFieldsType = {
  name: Nullable<MessageType>;
};

export type PaginationType = {
  page: number;
  rowsPerPage: number;
};
export type UpstreamData = {
  isInitialized: boolean;
  id: Nullable<number | string>;
  cardId: Nullable<number | string>;
};
export type WidgetStateType = {
  upstreamTab: UpstreamData;
  table: {
    filters: FiltersType;
    pagination: PaginationType;
    submit: FiltersType;
  };
  message: Nullable<MessageType>;
};

export type WidgetActionType =
  | {
      type: 'UPDATE_GLOBAL_MESSAGE';
      payload: Nullable<MessageType>;
    }
  | {
      type: 'UPDATE_UPSTREAM_TAB_CREATION';
    }
  | {
      type: 'UPDATE_UPSTREAM';
      payload: UpstreamData;
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
      payload: Partial<PaginationType>;
    };

export type WidgetDispatchType = React.Dispatch<WidgetActionType>;
